import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import router from '@/router/index.js'

const AUTH_STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'userId',
  EXPIRATION: 'expirationDate'
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref(null)
  const userId = ref(null)
  const expirationTimer = ref(null)

  // Getters
  const isAuthenticated = computed(() => Boolean(token.value))
  const isSessionExpired = computed(() => {
    const expirationDate = localStorage.getItem(AUTH_STORAGE_KEYS.EXPIRATION)
    if (!expirationDate) return true
    return new Date().getTime() > parseInt(expirationDate)
  })

  // Actions
  function setUser(payload) {
    token.value = payload.idToken
    userId.value = payload.localId

    const expirationDate = new Date().getTime() + Number(payload.expiresIn) * 1000

    if (payload.setInStorage) {
      persistAuthData(expirationDate)
    }

    scheduleLogout(expirationDate)
  }

  function persistAuthData(expirationDate) {
    if (!token.value || !userId.value) return

    localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, token.value)
    localStorage.setItem(AUTH_STORAGE_KEYS.USER_ID, userId.value)
    localStorage.setItem(AUTH_STORAGE_KEYS.EXPIRATION, expirationDate.toString())
  }

  function scheduleLogout(expirationDate) {
    const timeUntilExpiration = expirationDate - new Date().getTime()

    // Clear any existing timer
    if (expirationTimer.value) {
      clearTimeout(expirationTimer.value)
    }

    // Set new timer
    expirationTimer.value = setTimeout(() => {
      logout()
    }, timeUntilExpiration)
  }

  function autoLogin() {
    if (isSessionExpired.value) {
      logout()
      return false
    }

    const storedToken = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN)
    const storedUserId = localStorage.getItem(AUTH_STORAGE_KEYS.USER_ID)
    const storedExpiration = localStorage.getItem(AUTH_STORAGE_KEYS.EXPIRATION)

    if (!storedToken || !storedUserId || !storedExpiration) {
      return false
    }

    const expiresIn = (parseInt(storedExpiration) - new Date().getTime()) / 1000

    setUser({
      idToken: storedToken,
      localId: storedUserId,
      expiresIn,
      setInStorage: false
    })

    return true
  }

  function logout() {
    token.value = null
    userId.value = null

    if (expirationTimer.value) {
      clearTimeout(expirationTimer.value)
      expirationTimer.value = null
    }

    Object.values(AUTH_STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
    router.replace('/')
  }

  return {
    // State
    token,
    userId,

    // Getters
    isAuthenticated,
    isSessionExpired,

    // Actions
    setUser,
    autoLogin,
    logout
  }
})
