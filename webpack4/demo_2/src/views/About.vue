<template>
   <div class="about">this is about page
       <br/>
       {{ date }}
       <my-dialog />
    </div>
</template>
<script type='text/ecmascript-6'>
import moment from 'moment';
import dialog from '@/components/Dialog.vue'
import about from '@/utils/about.js'
import { cube } from '@/utils/common.js'
cube(2)
console.log(about);
   export default {
       name: 'About',
       components: {
           [dialog.name]: dialog
       },
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