<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <RouterLink aria-label="Go to homepage" class="logo" to="/"
  >
    <div class="img-container">
      <img alt="EduPress" class="img-container__img" src="/assets/images/logo.png" />
    </div>
    <p v-if="props.text">
      {{ props.text }}
    </p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  gap: toRem(6);

  p {
    font-weight: bold;
    font-size: toRem(20);
    @include mq(md) {
      font-size: toRem(26);
    }
  }

  .img-container {
    display: flex;
    height: fit-content;

    &__img {
      height: 24px;
      width: auto;
      @include mq(md) {
        height: 40px;
      }
    }
  }
}
</style>
