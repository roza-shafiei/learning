import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import courseList from '@/utils/courseList.js'

export const useCourseStore = defineStore('course', () => {
  const courses = ref([])
  const loading = ref(false)

  // Getters
  const categories = computed(() =>
    [...new Set(courses.value.map(course => course.category))]
  )

  const categoryCountStats = computed(() =>
    categories.value.map(category => ({
      title: category,
      courseCount: courses.value.filter(course => course.category === category).length
    }))
  )

  const bestCourses = computed(() => {
    console.log('course value: ', courses)
    return courses.value.filter(item => item.students > 300)
  })

// Actions
  function getCourses() { //here getting course list from api is simulated
    try {
      loading.value = true
      setTimeout(() => {
        courses.value = courseList
      }, 500)
    } catch (err) {
      console.log('error in course store', err)
    } finally {
      loading.value = false
    }
  }

  function getCoursesByCategory(category) {
    return category
      ? courses.value.filter(course => course.category === category)
      : courses.value
  }

  function addCourse(course) {
    if (!course.id) {
      const maxId = Math.max(...courses.value.map(c => c.id))
      course.id = maxId + 1
    }
    courses.value.push(course)
  }

  function searchCourses(searchTerm) {
    const term = searchTerm.toLowerCase()
    return courses.value.filter(course =>
      course.title.toLowerCase().includes(term) ||
      course.teacher.toLowerCase().includes(term)
    )
  }

  return {
    courses,
    bestCourses,
    getCoursesByCategory,
    getCourses,
    searchCourses,
    addCourse,
    categoryCountStats
  }
})
