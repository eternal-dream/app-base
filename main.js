import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import interceptors from '@/utils/interceptors.js'
import {uRequest,requestOptions} from '@/utils/request.js'

Vue.use(uView);

Vue.config.productionTip = false

Vue.prototype.$request = uRequest
Vue.prototype.$requestOptions = requestOptions


App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
