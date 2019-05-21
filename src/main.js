// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/index'
import vueResource from 'vue-resource'


// axios.defaults.baseURL = "http://192.168.31.119:8003/interface.php/V1/"
axios.defaults.headers.post['Content-Type'] = "application/json"
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
Vue.use(vueResource)



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})




/* eslint-disable no-new */
