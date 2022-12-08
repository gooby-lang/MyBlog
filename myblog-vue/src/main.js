import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "element-ui/lib/theme-chalk/index.css"

createApp(App).use(store).use(store).use(router).use(router).mount('#app')
