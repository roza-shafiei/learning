<script setup>
import { computed } from 'vue'
import BaseBtn from '@/components/global/BaseBtn.vue'

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

// Computed Properties
const fullName = computed(() => `${props.item?.name}  ${props.item?.lastname}`)
const hourlyRate = computed(() => `${props.item.hourlyRate} $/hr`)


</script>

<template>
  <article class="teacher-card">
    <div class="teacher-card__content">
      <h3 class="teacher-card__name">{{ fullName }}</h3>
      <div class="teacher-card__area">
        <span v-for="(skill, index) in item.areas" :key="index">{{ skill }}</span>
      </div>
      <h3 class="teacher-card__rate">{{ hourlyRate }}</h3>
      <div class="teacher-card__action">
        <BaseBtn text="Contact" />
        <RouterLink to="/">View More</RouterLink>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.teacher-card {
  width: 100%;
  border-radius: toRem(24);
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 6px 6px 8px 0 var(--color-white-300), 6px 6px 8px 0 var(--color-white-300);
  }

  &__content {
    padding: toRem(20);
    display: flex;
    flex-direction: column;
    gap: toRem(12);
  }

  &__name {
    text-transform: capitalize;
    font-size: toRem(30);
    font-weight: 600;
  }

  &__rate {
    color: var(--color-black-200);
    font-size: toRem(16);
    transition: all 0.3s ease-in-out;
  }

  &__area {
    display: flex;
    align-items: center;
    gap: toRem(12);
    color: var(--color-black-200);

    span {
      font-size: toRem(18);
      font-weight: 600;
      text-transform: capitalize;
    }

  }

  &__action {
    color: var(--color-black-200);
    display: flex;
    align-items: center;
    width: 100%;
    gap: toRem(12);
  }
}

</style>
