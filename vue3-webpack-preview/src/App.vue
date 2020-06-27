<template>
    <div class="container">
        <div class="cell">
            <input type="text" class="cell-input" v-model="value" @keyup.enter="addToList" placeholder="输入代办事项">
        </div>
        <ul class="list">
            <li class="item" :class="{ 'wait': item.status === 'wait', 'finish': item.status === 'finish' }" v-for="(item, index) in filterList" :key="`1_${index}`">
                <p class="value">{{ item.value }}</p> 
                <button @click="onFinish(item)">完成</button>
                <button @click="onDel(item)">删除</button>
            </li>
        </ul>
        <div class="footer">
            <ul class="filters">
                <li><a href="#/all" :class="{ selected: status === 'all' }">All</a></li>
                <li><a href="#/wait" :class="{ selected: status === 'wait' }">Wait</a></li>
                <li><a href="#/finish" :class="{ selected: status === 'finish' }">Finish</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, reactive, computed, watchEffect, toRefs, onMounted, onUnmounted } from 'vue'
const mockItem = {
    id: 1, // 防止内容一样，无法区分
    value: 'test',
    state: 'wait' // wait, finish
}
let uid = 0;
export default {
  setup() {
    const state = reactive({
        list: [],
        value: '',
        status: '',
        // 展示列表
        filterList: computed(() => {
            if (state.status === 'all') {
                return state.list;
            } else if(state.status === 'wait' || state.status === 'finish') {
                return state.list.filter(item => item.status === state.status);
            } else {
                return state.list;   
            }
        })
    })

    onMounted(() => {
      window.addEventListener('hashchange', onHashChange)
      onHashChange()
    })

    onUnmounted(() => {
      window.removeEventListener('hashchange', onHashChange)
    })

    function onHashChange () {
      const status = window.location.hash.replace(/#\/?/, '')
      if (['all', 'wait', 'finish'].indexOf(status) > -1) {
        state.status = status
      } else {
        window.location.hash = ''
        state.status = 'all'
      }
    }
    const addToList = () => {
        state.list.push({
            id: ++uid,
            value: state.value,
            status: 'wait'
        })
        state.value = '';
    }
    const onFinish = (item) => {
        item.status = 'finish';
    }
    const onDel = (item) => {
        const idx = state.list.findIndex(_item => item === _item);
        idx > -1 && state.list.splice(idx, 1);
    }

    
    return {
        /** 当想要从一个组合逻辑函数中返回响应式对象时，用 toRefs 是很有效的，
            该 API 让消费组件可以 解构 / 扩展（使用 ... 操作符）返回的对象，并不会丢失响应性：
        */
        ...toRefs(state),
        addToList,
        onFinish,
        onDel
    }
  }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    width: 300px;
    margin: 50px auto;
    border: 1px solid #ccc;
    padding: 20px;
}
.cell {
    width: 100%;
    display: flex;
}
.cell-input {
    flex: 1;
    line-height: 40px;
    height: 40px;
    border: 1px solid #683939;
    outline: none;
    margin-right: 10px;
}
.cell-btn {
    padding: 0 20px;
    border: 1px solid #ccc;
    background-color: blue;
    color: #fff;
}
.list {
    background-color: #f5f5f5;
    border: 1px solid #f5f5f5;
}
.item {
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
}
.item.wait {
    background: #683939;
}
.item.finish {
    background: turquoise;
}
.item:last-child {
    border-bottom: none;
}
.item .value {
    flex: 1;
    margin-right: 10px;
}
.item .state {
    color:  #fff;
    background: #683939;

}
.footer {
    padding: 10px 15px;
    height: 20px;
    text-align: center;
    font-size: 15px;
    border-top: 1px solid #e6e6e6;
}
.filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
}
.filters li {
    display: inline;
}
.filters li a.selected {
    border-color: rgba(175, 47, 47, 0.2);
}
.filters li a {
    color: inherit;
    margin: 3px;
    padding: 3px 7px;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 3px;
}
</style>
