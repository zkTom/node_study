<template lang="html">
   <div class="app" @click="onClick">
       <span :class="$style.txt">I am root App </span>
       <img :src="require('./assets/img/logo.png')" />
   </div>
</template>
<script type='text/ecmascript-6'>
import bgImg from "./assets/img/logo.png";
export default {
    name: "",
    data() {
        return {};
    },
    mounted() {},
    methods: {
        onClick() {
            console.log('I was clicked');
        }
    }
};
</script>
<style lang="scss" scoped>
.app {
    font-size: 22px;
    color: blue;
    img {
        transform: rotate(45deg);
    }
}
</style>
<!-- 只有带module的才会进行模块化处理 -->
<style module>
:local(.txt) {
font-size: 26px;
  background: red;
}
</style>