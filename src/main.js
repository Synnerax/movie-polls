import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import vSelect from 'vue-select'
//import "vue-select/dist/vue-select.css";


createApp(App).use(router).component('v-select', vSelect).mount("#app");
