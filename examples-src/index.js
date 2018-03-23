import Vue from 'vue';
import App from './App.vue';

Vue.config.devtools = true;
Vue.config.debug = true;
Vue.config.silent = false;
Vue.config.productionTip = true;

const app = new Vue({
    el    : '#app',
    render: h => h(App),
});
