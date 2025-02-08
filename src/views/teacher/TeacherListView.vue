<script setup>
import { onMounted, ref } from 'vue'
import TheLoading from '@/components/global/TheLoading.vue'
import TeacherCard from '@/components/pages/teachers/TeacherCard.vue'

// States
const loading = ref(false)
const baseURL = import.meta.env.VITE_BASE_URL
const teacherList = ref([])

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
    teacherList.value = await res.json()
  } catch (error) {
    console.log('get teacher list error', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="teachers-page max-content">
    <TheLoading v-if="loading" class="mx-auto" />
    <section v-else class="teachers">
      <TeacherCard v-for="teacher in teacherList" :key="teacher.id" :item="teacher" />
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
}
</style>
