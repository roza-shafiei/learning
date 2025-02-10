<script setup>
import { onMounted, ref } from 'vue'
import TheLoading from '@/components/global/TheLoading.vue'
import TeacherCard from '@/components/pages/teachers/TeacherCard.vue'

// States
const loading = ref(false)
const baseURL = import.meta.env.VITE_BASE_URL
const teacherList = ref([])
const activeTeacherId = ref(null)
const errorMsg = ref('')

// Lifecycle hook
onMounted(() => {
  getTeacherList()
})

// Methods
async function getTeacherList() {
  try {
    loading.value = true
    const res = await fetch(baseURL + '/teachers.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const resData = await res.json()
    for (const key in resData) {
      const teacherObj = { ...resData[key] }
      teacherList.value.push(teacherObj)
    }
  } catch (error) {
    if (error.message.includes('fetch')) {
      errorMsg.value = 'Please check your connection or VPN, then try again.'
    } else {
      errorMsg.value = 'Sorry, something went wrong!'
    }
  } finally {
    loading.value = false
  }
}

function handleContactClick(teacherId) {
  activeTeacherId.value = teacherId
}

function handleFormSubmit() {
  activeTeacherId.value = null
}
</script>

<template>
  <main class="teachers-page max-content">
    <TheLoading v-if="loading" class="mx-auto" />
    <section v-else class="teachers">
      <template v-if="teacherList.length > 0">
        <TeacherCard
          v-for="teacher in teacherList"
          :key="teacher.id"
          :is-form-visible="activeTeacherId === teacher.id"
          :item="teacher"
          @contact-click="handleContactClick(teacher.id)"
          @form-submit="handleFormSubmit"
        />
      </template>
      <p v-else class="error-msg">{{ errorMsg }}</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.teachers-page {
  margin-top: toRem(50);


  .teachers {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    gap: toRem(24);
    @include mq(lg) {
      max-width: 70%;
    }
  }

  .error-msg {
    text-align: center;
    font-size: toRem(14);
  }
}
</style>
