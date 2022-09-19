import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import withUUID from 'vue-uuid';

import './assets/main.css';

const pinia = createPinia();
const app = withUUID(createApp(App));

app.use(pinia).use(router);

app.mount('#app');
