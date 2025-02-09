<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseStore } from '@/store/course.js'
import CourseCard from '@/components/global/CourseCard.vue'
import SidebarFilter from '@/components/pages/courses/SidebarFilter.vue'

// States
const route = useRoute()
const filter = ref('')
const searchQuery = ref('')
const courseStore = useCourseStore()
filter.value = route.query.cat

onMounted(async () => {
  await courseStore.getCourses()
  initializeFilters()
})

// Methods
const initializeFilters = () => {

  if (route.query.cat) {
    searchQuery.value = route.query.cat
  }
}

const filteredCourses = computed(() => {
  let results = courseStore.activeFilter
    ? courseStore.searchCourses(courseStore.activeFilter)
    : courseStore.courses

  // Apply search filter if query exists
  if (searchQuery.value) {
    const query = searchQuery.value
    results = results.filter(course =>
      course.title.toLowerCase().includes(query) || course.category.toLowerCase().includes(query)
    )
  }
  return results
})

</script>

<template>
  <div class="courses max-content">
    <section class="courses--wrapper">
      <header class="courses__header">
        <h2>All Courses</h2>
        <div aria-label="search courses" class="search">
          <img alt="search" class="search__icon" src="/assets/icons/search.png" />
          <input v-model="searchQuery" placeholder="Search" type="search" />
        </div>
      </header>
      <section class="courses-container ">
        <CourseCard v-for="course in filteredCourses" :key="course.id" :item="course" />
      </section>
    </section>
    <SidebarFilter />
  </div>
</template>

<style lang="scss" scoped>
.courses {
  margin-top: toRem(50);
  display: flex;
  gap: toRem(32);

  &--wrapper {
    width: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      width: 50%;
    }

    .search {
      position: relative;
      width: 50%;
      display: flex;
      align-items: center;

      &__icon {
        position: absolute;
        right: 0;
        width: toRem(18);
        height: toRem(18);
      }

      input {
        width: 100%;
        padding: 5px;
        border-width: 0 0 1px 0;
        transition: all 0.3s;

        &:focus, &:focus-visible {
          border: none;
          outline: none;
          border-bottom: 1px solid var(--color-primary);
        }
      }
    }


  }
}

.courses-container {
  display: grid;
  column-gap: toRem(16);
  row-gap: toRem(20);
  margin-top: toRem(50);
  place-items: center;
  grid-template-columns: 1fr;

  @include mq(md) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mq(lg) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  }
}
</style>
