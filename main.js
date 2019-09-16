import Vue from 'vue'
import App from './App'

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'

import store from './store'
// 引入插件
import request from '@/common/request.js'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)


App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// 全局配置
request.setConfig({
  baseUrl: 'http://dangjianapi.wbaole.com', // 此为测试地址，需加入到域名白名单，或者更改为您自己的线上地址即可
  dataType: 'json', // 可删除，默认为json
  responseType: 'text', // 可删除，默认为text
  // 设置请求头，支持所有请求头设置，也可不设置，去掉header就行
  header: {
    'content-type': 'application/json' 
  }
})
// // 挂载到全局vue实例上，在页面中可以使用this.$request调用request实例下相应方法
Vue.prototype.$request = request;
app.$mount()
