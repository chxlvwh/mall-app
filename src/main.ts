import Vue from 'vue';
import App from './App.vue';
import './uni.promisify.adaptor';
// @ts-ignore
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$store = store;

const app = new (typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App)))();
app.$mount();
