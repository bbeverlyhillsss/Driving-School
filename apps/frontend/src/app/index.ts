import { createApp } from 'vue'
import App from './App.vue'
import { pinia, setupSession } from './providers'
import { router } from './router'
import { setupAuthGuard } from './router/guard'
import '@/app/styles/main.css'

const app = createApp(App)

app.use(pinia)
setupSession(router)
setupAuthGuard(router)
app.use(router)

export { app }
