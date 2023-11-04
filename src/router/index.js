import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact',
	routes,
})

export default router
