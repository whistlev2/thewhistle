import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import { VNode } from 'vue';

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h): VNode => h(App)
}).$mount('#app');
