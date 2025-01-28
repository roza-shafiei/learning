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
      <div>
        <!--        Login section-->
        <RouterLink v-if="!isSmDown" to="/auth">
          Login / Register
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;


  &--wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: toRem(10);
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
  background-color: var(--color-white-200);
  color: var(--color-primary);
  transition: all 0.2s;
}
</style>
