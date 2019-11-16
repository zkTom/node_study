<template>
   <div class="home">
       <p class="title"><i class="iconfont icon-yulan"></i>{{ txt }}</p>
       <p class="date">{{ date }}</p>
       <img class="img" :src="require('@/assets/img/logo.png')" />
   </div>
</template>
<script type='text/ecmascript-6'>
import _ from 'lodash';
import moment from 'moment';
import '@/utils/qwebchannel.js'
   export default {
       name: 'Home',
       data() {
           return {
               date: moment().format('YYYY-MM-DD hh:mm:ss'),
               txt: _.join(['这是', 'home',"组件"])
           }
        },
       mounted() {},
       methods: {}
   }
</script>
<style lang='scss' scoped>
.home {
    border: 1px dashed #000;
    .title {
        font-size: 32px;
        color: bisque;
    }
    .img {
        border-radius: 50%;
        width: 100px;
        height: 100px;
        transform: translate(50px, 0);
    }
}
</style>