// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 导入自己封装的路由模块
import router from './router'

// 导入 ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入CSS样式
import '@/assets/css/index.css'

// 导入 axios
import axios from 'axios'
// 配置接口的公共地址：
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 将axios添加到Vue原型中
Vue.prototype.$http = axios

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 因为每个请求都会执行该拦截器，所以，就可以在请求拦截器中，统一添加 Authorization 这个请求头
  // 而不需要分别在每个请求中，单独添加
  // console.log('request', config)
  config.headers.Authorization = localStorage.getItem('token')

  // 注意：一定要返回config
  return config
}, (error) => {
  // 错误处理
  return Promise.reject(error)
})

// 响应拦截器
// axios.interceptors.response.use((response) => {
//   // 所有请求完成后都要执行的操作
//   console.log('response')
//   return response
// }, (error) => {
//   // 错误处理
//   return Promise.reject(error)
// })

Vue.use(ElementUI)

Vue.config.productionTip = false

// 作用：告诉 ESlint 不要校验下一行代码的 no-new 规则，注释不能去掉
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 3 将路由实例与Vue实例关联到一起
  router
})
