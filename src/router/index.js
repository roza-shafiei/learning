import { createRouter, createWebHistory } from 'vue-router'
import { useCourseStore } from '@/store/course.js'

const routes = [
  {
    path: '',
    component: () => import('@/views/HomeView.vue'),
    alias: ['/', '/home'],
    meta: { title: 'Home' }
  },
  {
    path: '/courses',
    component: () => import('@/views/CourseListView.vue'),
    meta: { title: 'Courses' }
  },
  {
    path: `/courses/:id`,
    component: () => import('@/views/CourseIdView.vue'),
    meta: { title: 'Courses' },
    name: 'courseDetails'
  },
  {
    path: `/teacher/registration`,
    component: () => import('@/views/teacher/TeacherRegisterView.vue'),
    meta: { title: 'Registration' },
    name: 'teacherRegistration'
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
