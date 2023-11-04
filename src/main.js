import { createApp, markRaw } from 'vue'
import { createPinia } from "pinia"
import { useBaseStore } from "@/stores/base"
import router from '@/router'
import axios from 'axios'
import '@/style.css'
import App from '@/App.vue'

// App
const app = createApp(App)

// Pinia
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})
app.use(pinia)

// Store
const baseStore = useBaseStore()

// Router
app.use(router)

// Axios
axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8000"
axios.interceptors.response.use(
	(response) => {
		baseStore.updateLastRequestTime()
		return response
	},
    (error) => {
		baseStore.updateLastRequestTime()
		return Promise.reject(error)
	}
)

// Mount
app.mount('#app')
