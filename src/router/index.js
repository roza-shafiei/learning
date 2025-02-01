import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CourseListView from '@/views/CourseListView.vue'
import CourseIdView from '@/views/CourseIdView.vue'
import { useCourseStore } from '@/store/course.js'

const routes = [
  {
    path: '', component: HomeView, alias: ['/', '/home'], meta: { title: 'Home' }
  },
  { path: '/courses', component: CourseListView, meta: { title: 'Courses' } },
  {
    path: `/courses/:id`,
    component: CourseIdView,
    meta: { title: 'Courses' },
    name: 'course details'
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return { top: 0 }
    }
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title}`
  } else {
    document.title = import.meta.env.VITE_APP_NAME
  }
})

router.beforeEach(async (to) => {
  const courseStore = useCourseStore()
  if (!courseStore.courses.length) {
    await courseStore.getCourses()
  }
  // Handle course details page
  if (to.name === 'course details') {
    const selectedCourse = courseStore.courses.find(
      (item) => item.id === parseInt(to.params.id)
    )
    if (selectedCourse) {
      to.meta.title = selectedCourse.title
    }
  }
})
export default router
