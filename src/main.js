import './assets/main.css'
import 'vue3-carousel/carousel.css'
import './assets/animate.min.css'

import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

const options = {
    // You can set your default options here
};

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, options);

app.mount('#app')
