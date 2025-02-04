<script setup>
import TheLogo from '@/components/global/TheLogo.vue'
import useWindowResize from '@/composables/useResizeMethod.js'

const { isSmDown } = useWindowResize()
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
      </ul>
      <!--        Login section-->
      <div class="navbar__login">
        <img v-if="isSmDown" alt="profile-icon" src="/assets/icons/profile.png" />
        <RouterLink v-else class="base-btn" to="/teacher/registration">
          Register as a Teacher
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.base-btn {
  @include base-btn;
}

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
  }

  &__links {
    padding: 0;
    display: flex;
    height: 100%;

    a {
      font-size: toRem(16);
      text-transform: capitalize;
      padding: toRem(15) toRem(14);
    }
  }
}


.navbar__links .router-link-exact-active {
  color: var(--color-primary);
  transition: all 0.2s;
}
</style>
