<script setup>

import CourseCard from '@/components/global/CourseCard.vue'
import { computed } from 'vue'

const courseList = computed(() => {
  return [{
    id: 1,
    img: '/assets/images/home/photographer.jpg',
    title: 'Create an LMS Website with LearnPress',
    teacher: 'Determined-Poitras',
    duration: '2 Weeks',
    students: 120,
    price: 165
  },
    {
      id: 2,
      img: '/assets/images/home/learning1.png',
      title: 'Create an LMS Website with LearnPress',
      teacher: 'Determined-Poitras',
      duration: '120 min',
      students: 2,
      price: 0
    },
    {
      id: 3,
      img: '/assets/images/home/learning2.png',
      title: 'Create an LMS Website with LearnPress',
      teacher: 'Roza Shafiei',
      duration: '1 Week',
      students: 300,
      price: 120
    },
    {
      id: 4,
      img: '/assets/images/home/student.jpg',
      title: 'Create an LMS Website with LearnPress',
      teacher: 'Determined-Poitras',
      duration: '2 Days',
      students: 1230,
      price: 0
    },
    {
      id: 5,
      img: '/assets/images/home/learning3.png',
      title: 'Create an LMS Website with LearnPress',
      teacher: 'Roza Shafiei',
      duration: '2 Weeks',
      students: 5,
      price: 200
    },
    {
      id: 6,
      img: '/assets/images/home/finance.jpg',
      title: 'Create an LMS Website with LearnPress',
      teacher: 'Roza Shafiei',
      duration: '2 Weeks',
      students: 5,
      price: 200
    }]
})
</script>

<template>
  <section class="course-list">
    <CourseCard v-for="course in courseList" :key="course.id" :item="course" />
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
