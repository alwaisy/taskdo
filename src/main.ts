import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { VueFire, VueFireAuth } from 'vuefire'
import Notifications from 'notiwind'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import './assets/main.scss'
import { withFirebase } from './service'

const app = createApp(App)
const head = createHead()
const firebaseApp = withFirebase()
const pinia = createPinia()

app.use(pinia)
pinia.use(piniaPluginPersistedState)
app.use(router)
app.use(head)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})
app.use(Notifications)

app.mount('#app')
