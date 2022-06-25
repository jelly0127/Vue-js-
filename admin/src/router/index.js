import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
import Article from '@/views/article/index.vue'
import Material from '@/views/material/index.vue'
import Publish from '@/views/publish/index.vue'
import Setting from '@/views/setting/index.vue'
import Fans from '@/views/fans/index.vue'
Vue.use(VueRouter)

//路由配置表
const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/',
        //有默认子路由，则父路由不需设置name
        component: Layout,
        children: [{
                path: '', //path为空。会默认为子路由
                name: 'home',
                component: Home
            },
            {
                path: '/article',
                name: 'article',
                component: Article
            },
            {
                path: '/material',
                name: 'material',
                component: Material
            },
            {
                path: '/publish',
                name: 'publish',
                component: Publish
            },
            {
                path: '/setting',
                name: 'setting',
                component: Setting
            },
            {
                path: '/fans',
                name: 'fans',
                component: Fans
            }
        ]
    },

]

const router = new VueRouter({
    routes
})


//前置路由导航守卫：所有页面的导航都会经过这里
//守卫页面导航

router.beforeEach((to, from, next) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
        //校验是否登录，已登录则放行
    if (to.path !== '/login') {
        if (user) {
            //已登录，允许通过
            next()
        } else {
            //没有登录，回到登录页
            next('/login')
        }
    } else {
        next()
    }

})

export default router