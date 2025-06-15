import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router';
import axios from 'axios';
import 'vue3-toastify/dist/index.css';
import Vue3Toastify from 'vue3-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/css/main.css';



const app = createApp(App)
axios.defaults.baseURL = import.meta.env.VITE_API_HOST;
app.use(createPinia())
app.use(router);

app.use(Vue3Toastify, {
  autoClose: 300,
  position: "top-center",
  theme: "light",
  
});
app.mount('#app')
