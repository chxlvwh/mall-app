import Vue from 'vue';
import App from './App.vue';
import './uni.promisify.adaptor';
// @ts-ignore
import store from './store';
const prePage = () => {
	// eslint-disable-next-line no-undef
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	// eslint-disable-next-line no-unreachable
	return prePage.$vm;
};

Vue.config.productionTip = false;
Vue.prototype.$store = store;

Vue.config.productionTip = false;
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = { prePage };

const app = new (typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App)))();
app.$mount();
