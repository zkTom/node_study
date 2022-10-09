const fs = require("fs")
const babel = require('@babel/core')
const parser = require('@babel/parser');// 文件代码转为AST树
const path = require("path");
const traverse = require('@babel/traverse').default// 便利AST树

/**
 * @param file 模块的路径
 * 
 * @returns file 模块的路径
 * @returns deps 该模块的依赖
 * @returns code 该模块转化成es5的代码
 */
const getModuleInfo = (file) => {
  // 读取入口文件内容
  const body = fs.readFileSync(file, 'utf-8');
  // 文件转化成ast语法树
  // ast.program.body是具体转化的内容
  // ast.program.body[0] 
  // {"type":"ImportDeclaration","start":0,"end":26,"loc":{"start":{"line":1,"column":0,"index":0},"end":{"line":1,"column":26,"index":26}},"specifiers":[{"type":"ImportDefaultSpecifier","start":7,"end":10,"loc":{"start":{"line":1,"column":7,"index":7},"end":{"line":1,"column":10,"index":10}},"local":{"type":"Identifier","start":7,"end":10,"loc":{"start":{"line":1,"column":7,"index":7},"end":{"line":1,"column":10,"index":10},"identifierName":"add"},"name":"add"}}],"source":{"type":"StringLiteral","start":16,"end":26,"loc":{"start":{"line":1,"column":16,"index":16},"end":{"line":1,"column":26,"index":26}},"extra":{"rawValue":"./add.js","raw":"\"./add.js\""},"value":"./add.js"}}
  const ast = parser.parse(body, { sourceType: 'module' })
  const deps = {}
  traverse(ast, {
    // 对节点type:ImportDeclaration的处理
    ImportDeclaration({node}) {
      const dirname = path.dirname(file);// 模块的文件夹路径[./src]
      const abspath = './' + path.join(dirname,node.source.value);
      deps[node.source.value] = abspath;
    }
  })
  // es6=>es5
  const {code} = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  })
  return {
    file, deps, code
  }
}

// https://juejin.cn/post/6854573217336541192
// 递归获取依赖
const parseModules = (file) => {
  const entry = getModuleInfo(file)
  const temp = [entry];
  const depsGraph = {}// 依赖图，存储当前模块代码和依赖的模块
  for (let index = 0; index < temp.length; index++) {
    const deps = temp[index].deps;
    if (deps){
        for (const key in deps){
            if (deps.hasOwnProperty(key)){
                temp.push(getModuleInfo(deps[key]))
            }
        }
    }
  }
  temp.forEach(moduleInfo=>{
    depsGraph[moduleInfo.file] = {
      deps:moduleInfo.deps,
      code:moduleInfo.code
    }
  })
  return depsGraph
}
/**
 * 进行打包，把所有依赖打到同一个文件里面，虽然代码进行es6>es5转化，但是export和require浏览器还是不认识
 * 接下来需要
 * 1. 定义一个require函数和exports对象
 *  1.1作用：可以让转化后的代码识别require,export
 *  1.2思路：require函数中加入eval(code)，执行当前模块代码，exports保存模块引用
 *  1.3注意：require的时候会有相对和绝对路径，需要处理(absRequire函数)
 * 2. 主动执行一次require函数，引入入口模块
 *  2.1作用：给一个初始化入口
 *  2.2循环：eval(入口模块code)，会引用其他模块的函数(add/minus)，继续执行定义的require，然后eval(该模块code),重复这个过程，就完成依赖加载执行
 * 
 * @param {string} file 依赖入口文件
 * @returns 
 */
const bundle = file => {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function(graph){
    function require(file) {
      var exports = {}
      function absRequire(relPath) {
        return require(graph[file].deps[relPath])
      }

      (function(require, exports, code) { 
        eval(code)
       })(absRequire, exports, graph[file].code)

       return exports
    }

    require('${file}')
  })(${depsGraph})`
}
const content = bundle('./src/index.js');
fs.rmSync('./dist', { recursive: true, force: true })
fs.mkdirSync('./dist');
fs.writeFileSync('./dist/bundle.js',content)
