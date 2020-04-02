const fs = require("fs");
const lineReader = require('line-reader');
const Order = require("./Order");

var bid;
var all_products_id;
var min_sup=3;//设置最小支持度
var all_order=[];//整个事务的类集

//格式化数据源的输出
function formatData() {
	console.log("-------------------------------------")
  lineReader.eachLine('data.txt', function (line, last) {
  	console.log(line);
    var tid = line.substring(line.indexOf("T"), line.indexOf(" ")); //获取事务ID
    var productArr = line.substring(line.indexOf("{") + 1, line.indexOf("}")).split(","); //获取一个事务的所有商品
    all_order.push(new Order(tid,productArr));
    if (last) {
		console.log("以上是数据源，您可以在data.txt里面修改数据源");
    	console.log("----------------------------------------------")
    	var Ck1=freq1Gen(all_order);
    	while(Ck1.length!==0){
      	Ck=Ck1;
      	Ck1=freqKGen(Ck);
    	}
    	console.log("最终的结果");
    	console.log(Ck);
    }
  })
}
//1.计算候选集C1
function freq1Gen(data){
  var buffer=[];//空的频繁1项集
  var isShow=false;//判断是否已经存在于生成的1项集中
  for (var i = data.length - 1; i >= 0; i--) {
    for (var j=0;j<data[i].productArr.length;j++) {
      isShow=false;
        for (var k = buffer.length - 1; k >= 0; k--) {
        if (buffer[k].name==data[i].productArr[j]) {
          buffer[k].count++;
          isShow=true;
          break;
        }
      }
      if (isShow==false) {
        buffer.push({
          name:data[i].productArr[j],
          count:1
        });
      }
    }
  }
  var ret=[];
  for (var i = buffer.length - 1; i >= 0; i--) {
    if (buffer[i].count>=min_sup) {
      ret.push([buffer[i].name]);
    }
  }
  /*频繁1项集副本
  console.log(buffer.filter(function(item,index,array){
	return (buffer[index].count>=min_sup) ;
  }));
  */
  return ret;
}
//2.计算候选集C(k+1)
function freqKGen(data){
  var candi=[];
  for(var i=0;i<data.length;i++){
    for(var j=i+1;j<data.length;j++){
    	//全组合  
    	//var temp=data[i].push.apply(data[i],data[j]);??合并数组有错
    	var temp=unique(data[i].concat(data[j]));
      candi.push(temp);
    }
  }
  candi=unique(candi);
  var buffer=[];
  for (var i = candi.length - 1; i >= 0; i--) {
    buffer.push({arr:candi[i],count:0});//初始化当前集合的支持度
  }
   //计算支持度
  for (var i = buffer.length - 1; i >= 0; i--) {
    for (var j = all_order.length - 1; j >= 0; j--) {
      if(isContain(all_order[j].productArr,buffer[i].arr)){
        buffer[i].count++;
      }
    }
  }
  //减枝
  var ret=[];
  for (var i = buffer.length - 1; i >= 0; i--) {
    if(buffer[i].count>=min_sup){
      ret.push(buffer[i].arr);
    }
  }
  return ret;
}
//判断arr1是否包含arr2
function isContain(arr1,arr2){
  for (var i = arr2.length - 1; i >= 0; i--) {
    if(!arr1.includes(arr2[i])){
      return false;
    }
  }
  return true;
}

//出去重复数组
function unique(arr){
  var toDel=[];
  for(var i=0;i<arr.length;i++){
    for(var j=i+1;j<arr.length;j++){
      if (arr[i].length==arr[j].length) {
        var flag=true;
        for(var k=0;k<arr[j].length;k++){
          if (!arr[i].includes(arr[j][k])) {
            flag=false;
            break;
          }
        }
        if (flag) {
          toDel.push(i);
          break;
        }
      }

    }
  }
  for (var i = toDel.length - 1; i >= 0; i--) {
    arr.splice(toDel[i],1);
  }
  return arr;
}

formatData();

