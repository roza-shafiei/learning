<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseStore } from '@/store/course.js'
import CourseCard from '@/components/global/CourseCard.vue'

const route = useRoute()
const filter = ref('')
const allCourses = ref([])
const courseStore = useCourseStore()

onMounted(() => {
  filter.value = route.query.cat
  allCourses.value = courseStore.getCoursesByCategory(filter.value)
})
</script>

<template>
  <div class="courses max-content">
    {{ courseStore.catCoursesCount }}
    <section class="courses-container ">
      <CourseCard v-for="course in allCourses" :key="course.id" :item="course" />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.courses-container {
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
  @include mq(lg) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  }
}
</style>
