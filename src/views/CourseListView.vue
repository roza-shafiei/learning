<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useCourseStore } from '@/store/course.js'
import CourseCard from '@/components/global/CourseCard.vue'
import SidebarFilter from '@/components/pages/courses/SidebarFilter.vue'
import useWindowResize from '@/composables/useResizeMethod.js'
import TheLoading from '@/components/global/TheLoading.vue'

// States
const route = useRoute()
const filter = ref('')
const searchQuery = ref('')
const loading = ref(false)
const courseStore = useCourseStore()
filter.value = route.query.cat
const { isSmDown } = useWindowResize()

watchEffect(() => {
  searchQuery.value = route.query.cat || ''
})

// Fetch Courses
onMounted(async () => {
  try {
    await courseStore.getCourses()
  } catch (error) {
    console.error('Failed to fetch courses:', error)
  } finally {
    loading.value = false
  }
})

// Methods
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

// Empty state handling
const hasNoCourses = computed(() =>
  !loading.value && filteredCourses.value.length === 0
)
</script>

<template>
  <div class="courses max-content">
    <!--    Header section in mobile-->
    <header v-if="isSmDown" class="courses__header">
      <h2>All Courses</h2>
      <div aria-label="search courses" class="search">
        <img
          alt="search"
          class="search__icon"
          src="/assets/icons/search.png"
        />
        <input
          v-model="searchQuery"
          placeholder="Search"
          type="search"
        />
      </div>
    </header>
    <section class="courses--wrapper">
      <!--    Header section in Desktop-->

      <header v-if="!isSmDown" class="courses__header">
        <h2>All Courses</h2>
        <div aria-label="search courses" class="search">
          <img
            alt="search"
            class="search__icon"
            src="/assets/icons/search.png"
          />
          <input
            v-model="searchQuery"
            placeholder="Search"
            type="search"
          />
        </div>
      </header>
      <!-- Loading State -->
      <TheLoading v-if="loading" />

      <!-- Empty State -->
      <div v-else-if="hasNoCourses" class="courses__empty">
        No courses found matching your search or filter.
      </div>

      <!-- Courses Grid -->
      <section
        v-else
        class="courses-container"
      >
        <CourseCard
          v-for="course in filteredCourses"
          :key="course.id"
          :item="course"
        />
      </section>
    </section>

    <SidebarFilter />
  </div>
</template>

<style lang="scss" scoped>
.courses {
  margin-top: toRem(70);
  display: flex;
  flex-direction: column-reverse;
  gap: toRem(24);

  @include mq(md) {
    margin-top: toRem(30);
  }

  @include mq(sm) {
    flex-direction: row;
  }

  &--wrapper {
    width: 100%;
  }

  &__header {
    width: 100%;
    gap: toRem(16);
    display: flex;
    order: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @include mq(md) {
      flex-direction: row;
    }

    .search {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;

      @include mq(md) {
        width: 50%;
      }

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

  &__loading,
  &__empty {
    text-align: center;
    padding: toRem(50);
    color: var(--color-text-secondary);
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
