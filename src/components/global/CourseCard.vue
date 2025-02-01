<script setup>
import { computed } from 'vue'
import BaseBadge from '@/components/global/BaseBadge.vue'

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (value) => {
      return ['teacher', 'title', 'duration', 'students', 'img'].every(key => key in value)
    }
  }
})

// Computed Properties
const teacher = computed(() => `By ${props.item.teacher}`)
const students = computed(() => `${props.item.students} Students`)
const price = computed(() => {
  if (!props.item.price) {
    return 'Free'
  }
  return `${(props.item.price).toFixed(2)}$`
})
const backgroundStyle = computed(() => ({
  backgroundImage: props.item.img ? `url(${props.item.img})` : 'none'
}))
</script>

<template>
  <article class="course-card">
    <RouterLink
      :aria-label="`${props.item.title} course image`"
      :style="backgroundStyle"
      :to="`/courses/${props.item.id}`"
      class="course-card__img"
    />
    <div class="course-card__content">
      <p class="course-card__teacher">{{ teacher }}</p>
      <h3 class="course-card__title">{{ props.item.title }}</h3>
      <div class="course-card__stats">
        <div class="course-card__stat-item">
          <img
            alt="Duration icon"
            src="/assets/icons/clock-orange.png"
          >
          <span>{{ props.item.duration }}</span>
        </div>
        <div class="course-card__stat-item">
          <img
            alt="Students icon"
            src="/assets/icons/college-orange.png"
          >
          <span>{{ students }}</span>
        </div>
      </div>
      <hr class="course-card__divider">
      <div class="course-card__action">
        <p :class="props.item.price ? '':'green-text'">{{ price }}</p>
        <button>View More</button>
      </div>
    </div>
    <BaseBadge :text="props.item.category" class="course-card__badge" />
  </article>
</template>

<style lang="scss" scoped>
.course-card {
  max-width: toRem(410);
  width: 100%;
  border-radius: toRem(24);
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 6px 6px 8px 0 var(--color-white-300), 6px 6px 8px 0 var(--color-white-300);

    .course-card__title {
      color: var(--color-primary);
    }
  }

  &__badge {
    position: absolute;
    z-index: 3;
    top: 2%;
    left: 2%;
  }

  &__img {
    width: 100%;
    height: toRem(250);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  &__content {
    padding: toRem(20);
    display: flex;
    flex-direction: column;
    gap: toRem(12);
  }

  &__teacher {
    color: var(--color-black-200);
    font-size: toRem(14);
  }

  &__title {
    font-size: toRem(18);
    font-weight: 600;
    transition: all 0.3s ease-in-out;
  }

  &__stats {
    display: flex;
    gap: toRem(20);
  }

  &__stat-item {
    display: flex;
    align-items: center;
    gap: toRem(8);

    img {
      width: toRem(14);
      height: toRem(14);
      object-fit: contain;
    }

    span {
      font-size: toRem(14);
      color: var(--color-black-300);
    }
  }

  &__divider {
    border: none;
    border-top: 1px solid #eee;
    margin: 0;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;


    button {
      border: none;
      outline: none;
      background: none;
      font-weight: 600;
      font-family: inherit;
      font-size: toRem(15);
    }

    p {
      font-weight: 500;
      color: var(--color-black-200);

    }
  }
}

.green-text {
  color: var(--color-success) !important;
}
</style>
