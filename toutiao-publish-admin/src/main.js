/**项目的启动入口 */

import Vue from 'vue'
import App from './App.vue'
import router from './router'


// 加载 element 组件库
import ElementUI from 'element-ui'

// 加载 element 组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.less'
//全局注册element ui
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
    // 在vue的原型链上挂载一个bus属性用来做兄弟组件传值
    /**配置根实例 */
new Vue({
    router,

    render: h => h(App)
}).$mount('#app')