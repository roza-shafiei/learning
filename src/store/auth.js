import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore
  = defineStore('auth', () => {
  const tokenExpiration = ref(null)
  const token = ref(null)
  const userId = ref(null)

  function setUser(payload) {
    tokenExpiration.value = payload.expiresIn
    token.value = payload.idToken
    userId.value = payload.localId
    if (payload.setInStorage) {
      localStorage.setItem('token', token.value)
      localStorage.setItem('userId', userId.value)
    }
  }

  const isAuthenticated = computed(() => {
    return !!token.value
  })

  function autoLogin() {
    const idToken = localStorage.getItem('token')
    const localId = localStorage.getItem('userId')
    if (idToken && localId) {
      const payload = { idToken, localId, setInStorage: false }
      setUser(payload)
    }
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    tokenExpiration.value = null
    token.value = null
    userId.value = null
  }

  return { autoLogin, setUser, token, isAuthenticated, logout }
})
