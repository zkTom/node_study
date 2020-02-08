<template>
   <div class="home">
       <p class="title"><i class="iconfont icon-yulan"></i>{{ txt }}</p>
       <p class="date">{{ date }}</p>
       <img class="img" :src="require('@/assets/img/countrypath.jpg')" />
       <my-dialog />
   </div>
</template>
<script type='text/ecmascript-6'>
// import _ from 'lodash';
import moment from 'moment';
import dialog from '@/components/Dialog.vue'
import home from '@/utils/home.js'
import { cube } from '@/utils/common.js'
cube(2)
console.log(home);
   export default {
       name: 'Home',
        components: {
           [dialog.name]: dialog
       },
       data() {
           return {
               date: moment().format('YYYY-MM-DD hh:mm:ss'),
            //    txt: _.join(['这是', 'home',"组件"])
            date: '1991-02-02',
            txt: '211zujian'
           }
        },
       mounted() {
           console.error('home error')
       },
       methods: {}
   }
</script>
<style lang='scss' scoped>
.home {
    border: 1px dashed #000;
    background: url('~@/assets/img/logo.png');
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