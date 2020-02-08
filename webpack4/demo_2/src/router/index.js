import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
            path: '/home',
			component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
			// component: resolve => require(['@/views/Home.vue'], resolve)
		},
		{
            path: '/about',
			component: () => import(/*webpackChunkName: "about" */ '@/views/About.vue')
			// component: resolve => require(['@/views/About.vue'], resolve)
		}
	] // (缩写) 相当于 routes: routes
})