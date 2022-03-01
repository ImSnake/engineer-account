import { createApp } from 'vue';
import App from './App.vue';
import index from './router';
import store from './store';

createApp(App)
	.use(index)
	.use(store)
	.mount('#app-engineer-account');
