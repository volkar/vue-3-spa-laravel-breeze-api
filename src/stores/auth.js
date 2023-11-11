import { defineStore } from "pinia"
import axios from "axios"

export const useAuthStore = defineStore("auth", {
	state: () => ({
		// User
		authUser: null,
		// Login
		authLoginFieldsErrors: [],
		authLoginStatusError: null,
		// Register
		authRegisterFieldsErrors: [],
		authRegisterStatusError: null,
		// Forgot password
		authForgotPasswordFieldsErrors: [],
		authForgotPasswordStatusError: null,
		authForgotPasswordStatusSuccess: null,
		// Reset password
		authResetPasswordFieldsErrors: [],
		authResetPasswordStatusError: null,
		authResetPasswordStatusSuccess: null,
	}),
	getters: {
		// User
		user: (state) => state.authUser,
		// Login
		loginfields: (state) => state.authLoginFieldsErrors,
		loginerror: (state) => state.authLoginStatusError,
		// Register
		registerfields: (state) => state.authRegisterFieldsErrors,
		registererror: (state) => state.authRegisterStatusError,
		// Forgot password
		forgotpasswordfields: (state) => state.authForgotPasswordFieldsErrors,
		forgotpassworderror: (state) => state.authForgotPasswordStatusError,
		forgotpasswordsuccess: (state) => state.authForgotPasswordStatusSuccess,
		// Reset password
		resetpasswordfields: (state) => state.authResetPasswordFieldsErrors,
		resetpassworderror: (state) => state.authResetPasswordStatusError,
		resetpasswordsuccess: (state) => state.authResetPasswordStatusSuccess,
	},
	actions: {
		async getCSRFToken() {
			// Get CSRF (cross-site request forgery) cookie
			await axios.get("/sanctum/csrf-cookie")
		},
		async isAuthenticated() {
			// Check if user authenticated on the backend
			let userIsAuthenticated = false
			try {
				const response = await axios.get("/api/user")
				if (response.status === 200 && response.data.id) {
					// Data valid, user authenticated
					userIsAuthenticated = true
				}
			} catch (error) {
				// It's better to write custom endpoint with yes/no 200 response
				// without fetching user data every time
			}
			return userIsAuthenticated
		},
		async getUserData() {
			// Get authenticated user data from backend
			let userData = false
			try {
				const response = await axios.get("/api/user")
				if (response.status === 200 && response.data.id) {
					// Data valid
					userData = response.data
				}
			} catch (error) {
				// It's better to write custom /api/user replacement with 200 OK
				// instead of 401 Unauthorized to avoid browser's console error
			}
			return userData
        },
        getErrorMessage(error) {
            // Extract error message from response
            let errorMessage = 'Service error, please try again'
            if (error.response.data.error) {
                errorMessage = error.response.data.error
            } else if (error.response.data.message) {
                errorMessage = error.response.data.message
            } else if (error.response.data) {
                errorMessage = error.response.data
            }
            return errorMessage
        },
		async handleLogin(loginData) {
			// Handle login procedure

			// Try to logout (prevent "The route dashboard could not be found.")
			await this.handleLogout()

			// Get CSRF token
			await this.getCSRFToken()

			try {
				await axios.post("/login", {
					email: loginData.email,
					password: loginData.password,
				})
				// Get user data
				const user = await this.getUserData()
				if (user) {
					// Set user
					this.setUser(user)
					// Redirect to dashboard
					this.redirectToAuthenticatedEndpoint()
				}
			} catch (error) {
				if (error.response.status === 422) {
					// Incorrect input. Fill fields error data
					this.authLoginFieldsErrors = error.response.data.errors
				} else {
					// Other errors
					this.authLoginStatusError = this.getErrorMessage(error)
				}
			}
		},
		async handleRegister(registerData) {
			// Handle register form submission

			// Try to logout (prevent "The route dashboard could not be found.")
			await this.handleLogout()

			// Get CSRF token
			await this.getCSRFToken()

			try {
				await axios.post("/register", {
					email: registerData.email,
					name: registerData.name,
					password: registerData.password,
					password_confirmation: registerData.password_confirmation,
				})
				// Get user data
				const user = await this.getUserData()
				if (user) {
					// Set user
					this.setUser(user)
					// Redirect to dashboard
					this.redirectToAuthenticatedEndpoint()
				}
			} catch (error) {
				if (error.response.status === 422) {
					// Incorrect input. Fill fields error data
					this.authRegisterFieldsErrors = error.response.data.errors
				} else {
					// Other errors
					this.authRegisterStatusError = this.getErrorMessage(error)
				}
			}
		},
		async handleForgotPassword(email) {
			// Handle forgot password form submission

			// Try to logout (prevent "The route dashboard could not be found.")
			await this.handleLogout()

			// Get CSRF token
			await this.getCSRFToken()

			try {
				const response = await axios.post("/forgot-password", {
					email,
				})
				// Set status message to display to the user
				this.authForgotPasswordStatusSuccess = response.data.status
			} catch (error) {
				if (error.response.status === 422) {
					// Incorrect input. Fill fields error data
					this.authForgotPasswordFieldsErrors = error.response.data.errors
				} else {
					// Other errors
					this.authForgotPasswordStatusError = this.getErrorMessage(error)
				}
			}
		},
		async handleResetPassword(resetPasswordData) {
			// Handle reset password form submission

			// Try to logout (prevent "The route dashboard could not be found.")
			await this.handleLogout()

			// Get CSRF token
			await this.getCSRFToken()

			try {
				const response = await axios.post("/reset-password", resetPasswordData)
				// Set status message to display to the user
				this.authResetPasswordStatusSuccess = response.data.status
			} catch (error) {
				if (error.response.status === 422) {
					// Incorrect input. Fill fields error data
					this.authResetPasswordFieldsErrors = error.response.data.errors
				} else {
					// Other errors
					this.authResetPasswordStatusError = this.getErrorMessage(error)
				}
			}
		},
		async handleLogout() {
            // Handle logout procedure
            const isAuthenticated = await this.isAuthenticated()
            if (isAuthenticated) {
                // Clear user session on backend
                try {
					await axios.post("/logout")
				} catch (error) {
					// Do nothing for now
				}
            }
            // Clear user data on frontend
			this.clearUser()
		},
		setUser(userData) {
			// Set user data to store
			this.authUser = userData
		},
		clearUser() {
			// Clear user data from store
			this.authUser = null
		},
		clearLoginForm() {
			// Clear login form errors & status
			this.authLoginFieldsErrors = []
			this.authLoginStatusError = null
		},
		clearRegisterForm() {
			// Clear register user form errors & status
			this.authRegisterFieldsErrors = []
			this.authResetPasswordStatusError = null
		},
		clearForgotPasswordForm() {
			// Clear forgot password form errors & status
			this.authForgotPasswordFieldsErrors = []
			this.authForgotPasswordStatusError = null
			this.authForgotPasswordStatusSuccess = null
		},
		clearResetPasswordForm() {
			// Clear reset password form errors & status
			this.authResetPasswordFieldsErrors = []
			this.authResetPasswordStatusError = null
			this.authResetPasswordStatusSuccess = null
		},
		redirectIfGuest() {
			// Redirect to guest endpoint (login) if requires authentication
			if (!this.authUser) {
				this.redirectToGuestEndpoint()
				return true
			}
			return false
		},
		redirectIfAuthenticated() {
			// Redirect to authenticated endpoint (dashboard) if requires guest
			if (this.authUser) {
				this.redirectToAuthenticatedEndpoint()
				return true
			}
			return false
		},
		redirectToGuestEndpoint() {
			// Default guest endpoint
			this.router.push({ name: "Login" })
		},
		redirectToAuthenticatedEndpoint() {
			// Default authenticated endpoint
			this.router.push({ name: "Dashboard" })
		},
		redirectToIndexEndpoint() {
			// Index page endpoint
			this.router.push({ name: "Index" })
		},
	},
})
