<script setup>

import CourseCard from '@/components/global/CourseCard.vue'
import { useCourseStore } from '@/store/course.js'

const courseStore = useCourseStore()
</script>

<template>
  <section class="course-list">
    <CourseCard v-for="course in courseStore.bestCourses" :key="course.id" :item="course" />
  </section>
</template>

<style lang="scss" scoped>
.course-list {
  margin-top: toRem(50);
  display: grid;
  column-gap: toRem(16);
  row-gap: toRem(20);
  place-items: center;
  grid-template-columns: 1fr;

  @include mq(sm) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 3fr;
  }
  @include mq(lg) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  }
}
</style>
