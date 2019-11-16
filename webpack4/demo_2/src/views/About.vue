<template>
   <div class="about">this is about page
       <br/>
       {{ date }}</div>
</template>
<script type='text/ecmascript-6'>
import moment from 'moment';
import '@/utils/qwebchannel.js'
   export default {
       name: 'About',
       data() {
           return {
               date: moment().format('YYYY-MM-DD')
           }
        },
       mounted() {},
       methods: {}
   }
</script>
<style lang='scss' scoped>
.about {
    font-size: 28px;
    color: olivedrab;
}
</style>