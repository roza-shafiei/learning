<script setup>
const props = defineProps({
  title: String,
  desc: String,
  btnTxt: String,
  btnUrl: String
})
</script>

<template>
  <div class="title-card">
    <div class="content">
      <h2>{{ props.title }}</h2>
      <p>{{ props.desc }}</p>
    </div>
    <RouterLink v-if="props.btnTxt" :to="props.btnUrl" class="title-card__btn">{{ props.btnTxt }}
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.title-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .content {
    display: flex;
    flex-direction: column;
    gap: toRem(8);

    p {
      color: var(--color-black-400);
    }
  }

  &__btn {
    border: 1px solid var(--color-white-300);
    padding: toRem(8) toRem(24);
    outline: none;
    border-radius: toRem(24);
    transition: all 0.3s;

    &:hover {
      box-shadow: inset 0 0 0 2em var(--color-white-300);
    }
  }
}
</style>
