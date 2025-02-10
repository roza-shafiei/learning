<script setup>
import TheLogo from '@/components/global/TheLogo.vue'
import { useAuthStore } from '@/store/auth.js'
import BaseBtn from '@/components/global/BaseBtn.vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Methods
function userLogout() {
  authStore.logout()
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar--wrapper max-content">
      <!--      Logo section-->
      <TheLogo text="EduPress" />
      <!--      Main links-->
      <ul class="navbar__links">
        <RouterLink to="/">home</RouterLink>
        <RouterLink to="/courses">courses</RouterLink>
        <RouterLink to="/teachers">teachers</RouterLink>
        <RouterLink v-if="authStore.isAuthenticated" to="/requests">requests</RouterLink>
      </ul>
      <!--        Login section-->
      <div class="navbar__login">
        <div v-if="authStore.isAuthenticated" class="profile">
          <i class="profile__icon icons-profile" />
          <ul class="profile__menu">
            <RouterLink to="/teacher/registration">Register as a Teacher</RouterLink>
            <li @click="userLogout">Logout</li>
          </ul>
        </div>
        <BaseBtn v-else text="Login" @click="router.push('/auth')" />
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;


  &--wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: toRem(10);
  }

  &__login {
    display: flex;
    align-items: center;
    justify-content: center;

    .profile {
      position: relative;
      cursor: pointer;

      &__icon {
        font-size: toRem(22);
      }

      &__menu {
        list-style: none;
        background: var(--color-white-200);
        cursor: pointer;
        display: none;
        position: absolute;
        top: 80%;
        right: 0;
        min-width: toRem(200);
        padding: 0.5rem 0;
        z-index: 9;
        border-radius: toRem(4);
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        li, a {
          font-size: toRem(14);
          padding: 0.5rem 1rem;
          display: block;
          font-weight: normal;

          &:hover {
            background: rgba(0, 0, 0, 0.05);
          }
        }
      }

      &:hover .profile__menu {
        display: block;
      }
    }
  }

  &__links {
    padding: 0;
    display: flex;
    height: 100%;

    a {
      font-size: toRem(16);
      text-transform: capitalize;
      padding: toRem(15) toRem(14);

      &:hover {
        color: var(--color-primary)
      }
    }
  }
}


.navbar__links .router-link-exact-active {
  color: var(--color-primary);
  transition: all 0.2s;
}
</style>
