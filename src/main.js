import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElPagination } from 'element-plus';
const app = createApp(App)


app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
app.use(ElPagination)
app.component('Calendar', Calendar)
app.component('User', User)
app.component('Document', Document)
app.component('Notebook', Notebook)
app.component('Refresh', Refresh)
app.use(router)
app.use(store)
app.mount('#app')