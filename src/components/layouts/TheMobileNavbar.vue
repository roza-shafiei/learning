<script setup>
import TheLogo from '@/components/global/TheLogo.vue'
import { useAuthStore } from '@/store/auth.js'
import BaseBtn from '@/components/global/BaseBtn.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const isMenuOpen = ref(false)
const isProfileMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function toggleProfileMenu() {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

function closeMenus() {
  isMenuOpen.value = false
  isProfileMenuOpen.value = false
}

function userLogout() {
  authStore.logout()
  closeMenus()
}

function goToAuthPage() {
  router.push('/auth')
  closeMenus()
}
</script>

<template>
  <nav class="mobile-navbar">
    <div class="mobile-navbar__wrapper max-content">
      <!-- Logo section -->
      <TheLogo text="EduPress" />

      <!-- Hamburger menu button -->
      <button class="hamburger" @click="toggleMenu">
        <i v-if="!isMenuOpen" class="icons-navigation-menu" />
        <i v-else class="icons-close" />
      </button>

      <!-- Mobile menu -->
      <div :class="['mobile-menu', { 'active': isMenuOpen }]">
        <!-- Main links -->
        <ul class="mobile-menu__links">
          <li>
            <RouterLink to="/" @click="closeMenus">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/courses" @click="closeMenus">Courses</RouterLink>
          </li>
          <li>
            <RouterLink to="/teachers" @click="closeMenus">Teachers</RouterLink>
          </li>
          <li v-if="authStore.isAuthenticated">
            <RouterLink to="/requests" @click="closeMenus">Requests</RouterLink>
          </li>
        </ul>

        <!-- Login/Profile section -->
        <div class="mobile-menu__auth">
          <div v-if="authStore.isAuthenticated" class="profile">
            <div class="profile__header" @click="toggleProfileMenu">
              Profile
            </div>
            <ul :class="['profile__menu', { 'active': isProfileMenuOpen }]">
              <li>
                <RouterLink to="/teacher/registration" @click="closeMenus">
                  Register as a Teacher
                </RouterLink>
              </li>
              <li @click="userLogout">Logout</li>
            </ul>
          </div>
          <BaseBtn
            v-else
            class="login-btn"
            text="Login"
            @click="goToAuthPage"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.mobile-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--color-white-100);
  z-index: 200;
  padding: toRem(12) 0;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
  }
}

.hamburger {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 201;

  i {
    font-size: toRem(24);
  }
}

.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--color-white-200);
  padding-top: 4rem;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;

  &.active {
    transform: translateX(0);
  }

  &__links {
    list-style: none;
    padding: 0;
    margin: 0;

    li:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    a {
      display: block;
      padding: 1rem;
      font-size: toRem(16);
      text-transform: capitalize;
      color: var(--color-black);
      text-decoration: none;

      &.router-link-exact-active {
        color: var(--color-primary);
      }
    }
  }

  &__auth {
    padding: 1rem;
  }
}

.profile {
  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: bold;
  }

  &__menu {
    display: none;
    list-style: none;
    padding: 0;
    margin: 0;
    background: rgba(0, 0, 0, 0.05);
    border-radius: toRem(4);

    &.active {
      display: block;
    }

    li {
      display: block;
      padding: 0.75rem 1rem;
      font-size: toRem(14);
      cursor: pointer;
      font-weight: normal;

      a {
        font-weight: normal;
      }

      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

.login-btn {
  width: 100%;
}
</style>
