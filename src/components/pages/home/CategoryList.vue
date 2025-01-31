<script setup>
import IconTextCard from '@/components/global/IconTextCard.vue'
import { useRouter } from 'vue-router'
import { useCourseStore } from '@/store/course.js'

// States
const router = useRouter()
const courseStore = useCourseStore()
const catList = courseStore.categoryCountStats.map((cat) => {
  return {
    ...cat,
    icon: `/assets/icons/${cat.title}.png`
  }
})

// Methods
function goToCoursesPage(payload) {
  router.push(`/courses?cat=${payload.cat}`)
}
</script>

<template>
  <section class="category-list">
    <IconTextCard v-for="category in catList" :key="category.id" :item="category"
                  @card-click="goToCoursesPage" />
  </section>
</template>

<style lang="scss" scoped>
.category-list {
  display: grid;
  column-gap: toRem(16);
  row-gap: toRem(20);
  margin-top: toRem(50);
  place-items: center;
  grid-template-columns: 1fr;

  @include mq(sm) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 3fr;
  }
  @include mq(md) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 3fr;
  }
}
</style>
