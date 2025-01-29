<script setup>
import TitleCard from '@/components/global/TitleCard.vue'
import CategoryList from '@/components/pages/home/CategoryList.vue'
import CourseList from '@/components/pages/home/CourseList.vue'
</script>

<template>
  <main class="home max-content">
    <TitleCard desc="Explore our Popular Categories"
               title="Top Categories" />
    <CategoryList />
    <TitleCard btn-txt="All courses"
               desc="Explore our Popular Courses" title="Featured courses" />
    <CourseList />
  </main>
</template>

<style lang="scss" scoped>
.home {
  margin-top: toRem(90);
  width: 100%;
}

.category-list, .course-list {
  margin-bottom: toRem(90);
}
</style>
