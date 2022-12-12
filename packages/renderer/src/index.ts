import { createApp } from 'vue'
import App from '/@/App.vue'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

createApp(App)
  .use(ElementPlus)
  .use(createPinia())
  .mount('#app')
