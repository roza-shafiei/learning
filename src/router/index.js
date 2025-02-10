import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import { useCourseStore } from '@/store/course.js'
import { useAuthStore } from '@/store/auth.js'

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
    meta: { title: 'Registration', requireAuth: true },
    name: 'teacherRegistration'
  },
  {
    path: `/teachers`,
    component: () => import('@/views/teacher/TeacherListView.vue'),
    meta: { title: 'Teacher List' },
    name: 'teacherList'
  },
  {
    path: `/auth`,
    component: () => import('@/views/AuthView.vue'),
    meta: { title: 'Login/Sign in', requireUnAuth: true },
    name: 'auth'
  },
  {
    path: `/requests`,
    component: () => import('@/views/RequestsView.vue'),
    meta: { title: 'Requests', requireAuth: true },
    name: 'requests'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
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
  const authStore = useAuthStore()
  if (!courseStore.courses.length) {
    await courseStore.getCourses()
  }

  // Handle course details page
  if (to.name === 'courseDetails') {
    const selectedCourse = courseStore.courses.find(
      (item) => item.id === parseInt(to.params.id)
    )
    if (selectedCourse) {
      to.meta.title = selectedCourse.title
    }
  }
  // Handle authentication for some pages
  if (to.meta.requireAuth && !authStore.isAuthenticated) {
    return '/auth'
  } else if (to.meta.requireUnAuth && authStore.isAuthenticated) {
    return '/'
  }
  return true
})
export default router
