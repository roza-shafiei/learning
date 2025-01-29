<script setup>
const props = defineProps({
  item: Object
})
</script>

<template>
  <div class="static-card">
    <p class="static-card__title">{{ props.item.title }}</p>
    <p class="static-card__desc">{{ props.item.desc }}</p>
  </div>
</template>

<style lang="scss" scoped>
.static-card {
  width: 100%;
  height: toRem(180);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: toRem(24);
  overflow: hidden;
  background-color: var(--color-white-200);

  &__title {
    font-size: toRem(32);
    font-weight: bold;
    color: var(--color-primary);
  }

  &__desc {
    font-size: toRem(18);
    font-weight: 500;
  }
}
</style>
