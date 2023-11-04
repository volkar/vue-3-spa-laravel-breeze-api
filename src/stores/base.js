import { defineStore } from "pinia"

export const useBaseStore = defineStore("base", {
	state: () => ({
		baseInitialized: false,
		baseLastRequestTime: false,
	}),
	getters: {
		initialized: (state) => state.baseInitialized,
		lastrequesttime: (state) => state.baseLastRequestTime,
	},
	actions: {
		setInitialization() {
			this.baseInitialized = true
		},
		updateLastRequestTime() {
			this.baseLastRequestTime = Date.now()
		},
	},
})
