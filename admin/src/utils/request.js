/**基于axios封装请求模块 */
import axios from 'axios'

//非组件模块可以这样加载使用element的message提示组件
import {
    Message
} from 'element-ui'
/**引入大数字包转换处理数据*/
import JSONbig from 'json-bigint'
//创建axios实例
const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    //定制后端返回的原始数据的处理
    //参数data是后端返回的原始数据（未经处理的JSON格式字符串）
    transformResponse: [function(data) {
        // 做任何你想转换数据的事情
        // console.log(data)

        //后端返回的数据可能不是JSON格式字符串
        //如果不是，则用JSONbig.parse调用就会报错
        //所以使用try-catch来捕获异常，处理异常的发生
        try {
            //转换成功了，则将结果返回
            return JSONbig.parse(data)
        } catch (err) {
            //如果失败了，则在这直接将数据原封不动的
            //返回给请求使用
            return data
        }

    }],
})

//请求拦截器
request.interceptors.request.use(
    // 任何所有请求会经过这里
    //config 是当前请求相关的配置信息对象
    //config 是可以修改的
    function(config) {
        //然后可以在允许请求出去之前定制统一业务功能处理
        //例如：统一的设置 token
        const user =
            JSON.parse(window.localStorage.getItem('user'))
            //如果有登录，则统一设置token
        if (user) {
            config.headers.Authorization =
                `Bearer ${user.token}`
        }
        //当在这里 return config 之后请求才会真正的发送出去
        return config
    },
    // 请求失败，会经过这里
    function(error) {
        return Promise.reject(error)
    })

//响应拦截器
request.interceptors.response.use(function(response) {
    // 响应成功进入这里

    //response是响应数据
    //注意一定要把响应码return，否则真正发请求的地方拿不到数据
    return response
}, function(error) {
    // 对超出2xx的响应码错误都会进入这里

    const {
        status
    } = error.response
    if (status === 401) {
        //清除本地的用户登录信息
        //跳转会登录页面
        window.localStorage.removeItem('user')
        router.push('/login')
        Message.error('登录状态无效，请重新登录')
    } else if (status === 403) {
        //token未携带或过期
        Message({
            type: 'warning',
            message: '没有操作权限'
        })
    } else if (status === 400) {
        //客户端参数错误
        Message.error('参数错误，请检查请求参数')
    } else if (status >= 500) {
        Message.error('服务器端内部异常，请稍后重试')
    }
    return Promise.reject(error)
})


//导出
export default request