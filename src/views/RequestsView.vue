<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/store/auth.js'
import TheLoading from '@/components/global/TheLoading.vue'

// States
const loading = ref(false)
const teacherLoading = ref(false)
const requests = ref([])
const teacherList = ref([])
const authStore = useAuthStore()
const baseUrl = import.meta.env.VITE_BASE_URL
const token = authStore.token
const errorMsg = ref('')

onMounted(() => {
  getRequests()
  getTeachers()
})

// Methods
async function getRequests() {
  try {
    loading.value = true
    const res = await fetch(baseUrl + '/requests.json?auth=' + token)
    const data = await res.json()
    if (res.ok) {
      let requestList = []
      for (const key in data) {
        requestList.push({ ...data[key] })
      }
      requests.value = [...requestList]
    }
  } catch (error) {
    console.log('error in fetchData', error)
  } finally {
    loading.value = false
  }
}

async function getTeachers() {
  try {
    teacherLoading.value = true
    const res = await fetch(baseUrl + '/teachers.json', {
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
    teacherLoading.value = false
  }
}

function receiverEmail(id) {
  const requestId = String(id)
  const selected = teacherList.value.find(item => String(item.id) === requestId)
  if (selected) {
    return selected.email
  }
}
</script>

<template>
  <main class="requests max-content">
    <TheLoading v-if="loading || teacherLoading" class="mx-auto" />
    <div v-else-if="!loading && !teacherLoading && requests.length" class="requests__container">
      <div v-for="(request, index) in requests" :key="index" class="requests__card">
        <div>
          <span>Sender: </span>
          <a :href="`mailto:${request.email}`">{{ request.email }}</a>
        </div>
        <div>
          <span>Receiver: </span>
          <a
            :href="`mailto:${request.email}`">{{ receiverEmail(request.teacherId) }}
          </a>

        </div>
        <p>{{ request.message }}</p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.requests {
  margin-top: toRem(70);
  @include mq(md) {
    margin-top: 0;
  }

  &__container {
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

  &__card {
    padding: toRem(20);
    width: 100%;
    border-radius: toRem(24);
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
}
</style>
