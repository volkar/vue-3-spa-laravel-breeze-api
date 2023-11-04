import Index from "@/pages/Index.vue"

const routes = [
	{
		path: "/",
		name: "Index",
		component: Index,
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("@/pages/Login.vue"),
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("@/pages/Register.vue"),
	},
	{
		path: "/forgot-password",
		name: "ForgotPassword",
		component: () => import("@/pages/ForgotPassword.vue"),
	},
	{
		path: "/password-reset/:token",
		name: "ResetPassword",
		component: () => import("@/pages/ResetPassword.vue"),
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import("@/pages/Dashboard.vue"),
	},
]

export default routes