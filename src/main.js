import { createApp } from 'vue';
import App from './App.vue';
import index from './router';
import store from './store';
import Maska from 'maska';
import Uploader from './components/elements/Uploader';

const app = createApp(App);
			app.use(index);
			app.use(store);
			app.use(Maska);
			app.component("Uploader", Uploader);
			app.mount('#app-engineer-account');
