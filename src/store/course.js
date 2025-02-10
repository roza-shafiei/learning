import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import courseList from '@/utils/courseList.js'

export const useCourseStore = defineStore('course', () => {
  const courses = ref([])
  const loading = ref(false)
  const activeFilter = ref(null)

  // Getters
  const categories = computed(() =>
    [...new Set(courses.value.map(course => course.category))]
  )
  const courseInstructors = computed(() => {
    return [...new Set(courses.value.map((course) => course.teacher))]
  })
  const instructorId = computed(() => {
    return [...new Set(courses.value.map((course) => course.teacherId))]
  })
  const categoryCountStats = computed(() =>
    categories.value.map(category => ({
      title: category,
      courseCount: courses.value.filter(course => course.category === category).length
    }))
  )

  const bestCourses = computed(() => {
    return courses.value.filter(item => item.students > 300)
  })

// Actions
  async function getCourses() {
    if (courses.value.length > 0) return
    loading.value = true
    try {
      // Simulated API call
      const response = await new Promise((resolve) => {
        setTimeout(() => resolve(courseList), 200)
      })
      courses.value = response
    } catch (err) {
      console.error('Error fetching courses:', err)
    } finally {
      loading.value = false
    }
  }

  function setFilters(payload) {
    activeFilter.value = payload
  }


  function searchCourses(filters) {
    let filteredCourses = courses.value
    console.log('payload', filters)

    if (filters.category && filters.category.length > 0) {
      filteredCourses = filteredCourses.filter(course =>
        filters.category.includes(course.category)
      )
    }

    if (filters.instructor && filters.instructor.length > 0) {
      console.log('mmm mmm m mmm', filters.instructor)
      filteredCourses = filteredCourses.filter(course =>
        filters.instructor.includes(course.teacher)
      )
    }

    return filteredCourses
  }


  return {
    courses,
    bestCourses,
    activeFilter,
    getCourses,
    courseInstructors,
    categories,
    searchCourses,
    setFilters,
    instructorId,
    categoryCountStats
  }
})
