// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Home from './components/home/index';
import router from './router';
import axios from "axios";
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import filters from "@/filters";
import shop from '@/components/demo/shop'

Vue.prototype.$ajax = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(MintUI);

for(var key in filters){
	Vue.filter(key,filters[key]);
}

axios.interceptors.request.use((config)=>{
    config.url="http://127.0.0.1"+config.url;
    return config;
})
axios.interceptors.response.use(({data})=>{
    return data;
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
