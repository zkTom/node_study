<template>
   <div class="app">
       <span :class="$style.txt" @click="onClick">I am root App </span>
       <el-button type="primary">el button</el-button>
       <router-view></router-view>
   </div>
</template>
<script type='text/ecmascript-6'>
export default {
    name: "App",
    components: {},
    data() {
        return {
            flag: true
        };
    },
    mounted() {},
    methods: {
        onClick() {
            console.log("I was clicked");
            this.flag = !this.flag;
            throw 'I am app';
        }
    }
};
</script>
<style lang="scss" scoped>
.app {
    font-size: 22px;
    color: blue;
}
</style>
<!-- 只有带module的才会进行模块化处理 -->
<style module>
:local(.txt) {
    font-size: 26px;
    color: red;
}
:global(.txt) {
    font-size: 32px;
    color: orange;
}
</style>