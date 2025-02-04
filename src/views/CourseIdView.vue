<script setup>
import { useCourseStore } from '@/store/course.js'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseBadge from '@/components/global/BaseBadge.vue'
import ContactTeacherForm from '@/components/pages/course/ContactTeacherForm.vue'
import FaqList from '@/components/pages/course/FaqList.vue'

// States
const courseStore = useCourseStore()
const courseId = ref('')
const course = ref({})
const route = useRoute()
const tabs = ['overview', 'instructor', 'faqs']
const activeTab = ref(tabs[0])
const loading = ref(false)

// Lifecycle Hook
onMounted(() => {
  courseId.value = route.params.id
  course.value = courseStore.courses.find((course) => course.id === parseInt(courseId.value))
})

// Computed Properties
const courseDetails = computed(() => {
  return [{
    id: 1,
    title: 'duration',
    text: course.value.duration,
    icon: '/assets/icons/clock-orange.png'
  }, {
    id: 2,
    title: 'students',
    text: course.value.students + ' Students',
    icon: '/assets/icons/college-orange.png'
  }, {
    id: 3,
    title: 'level',
    text: course.value.level,
    icon: '/assets/icons/level-orange.png'

  }]
})

const teacher = computed(() => {
  return `by ${course.value.teacher}`
})

// Methods
function submitRequest(msg) {
  try {
    loading.value = true
    const payload = {
      ...msg,
      teacherId: course.value.teacherId
    }
    const res = fetch(`https://edupress-701b9-default-rtdb.firebaseio.com/requests/${payload.teacherId}.json`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(res)
  } catch (e) {
    console.log('error in course id view is: ', e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="course-id">
    <!--    course header-->
    <header class="course-id__header">
      <div class="header--wrapper max-content">
        <div class="course-id__header--top">
          <BaseBadge :text="course.category" class="badge" />
          <span>{{ teacher }}</span>
        </div>
        <h2>{{ course.title }}</h2>
        <div class="course-id__header--bottom">
          <div v-for="item in courseDetails" :key="item.id" class="icon-container">
            <img :src="item.icon" alt="icon" />
            <span>
          {{ item.text }}
        </span>
          </div>

        </div>
        <div :style="{backgroundImage: `url(${course.img})`}"
             class="img-box">
        </div>
      </div>
    </header>

    <!--    course body-->
    <section class="max-content">
      <div class="tabs">
        <div class="tabs__items">
          <span v-for="(tab, index) in tabs" :key="index" :class="activeTab===tab ?'active-bg':''"
                class="tabs__items--item"
                @click="activeTab=tab">{{ tab }}</span>
        </div>
        <div class="tabs__content">
          <Transition mode="out-in">
            <div v-if="activeTab===tabs[0]">
              <p class="tabs__content--desc">{{ course.desc }}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, totam,
                voluptatibus.
                Architecto dignissimos ducimus eligendi esse impedit, iste magni omnis, quidem quos
                soluta temporibus ut voluptatibus. Ex molestiae praesentium temporibus?. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Alias aliquid
                asperiores ea ex inventore labore maxime! Corporis excepturi placeat porro?</p>
            </div>
            <div v-else-if="activeTab===tabs[1]">
              <span class="tabs__content--teacher">{{ course.teacher + ';' }}</span>
              <p>Excellence in Every Detail: Welcome to a space where over a million learners thrive
                under the guidance of Ing. Tomas Moravek and his team.

                Experience the thrill of success through vibrant testimonials, showcasing students
                who have transformed their dreams into reality. My team and I are committed to
                providing unparalleled support because we believe in empowering every learne</p>
              <ContactTeacherForm @submit-form="submitRequest" />
            </div>
            <FaqList v-else />
          </Transition>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.course-id {
  //header style
  &__header {
    background: var(--color-black-900);

    .header--wrapper {
      display: flex;
      flex-direction: column-reverse;
      gap: toRem(24);
      padding: toRem(32) toRem(16);

      @include mq(lg) {
        position: relative;
        flex-direction: column;
      }
    }

    &--top {
      display: flex;
      align-items: center;
      gap: toRem(8);

      .badge {
        background: var(--color-white-600);
        color: var(--color-white-100);
        opacity: 100%;
        width: fit-content;
      }

      span {
        font-weight: bold;
        color: var(--color-white-100);
      }
    }

    h2 {
      max-width: 75%;
      color: var(--color-white-100);
    }

    &--bottom {
      display: flex;
      align-items: center;
      gap: toRem(16);
      color: var(--color-white-700);

      .icon-container {
        display: flex;
        align-items: center;
        gap: toRem(4);
      }
    }

    .img-box {
      max-width: 100%;

      margin: 0 auto;
      width: 100%;
      height: toRem(250);
      background-position: center;
      background-size: cover;
      border-radius: toRem(24);
      @include mq(sm) {
        max-width: 80%;
      }
      @include mq(lg) {
        max-width: 100%;
        width: toRem(290);
        position: absolute;
        top: 50%;
        right: 2%;
      }

      img {
        width: 100%;
        object-fit: cover;
        max-height: toRem(250);
        height: 100%;

        @include mq(lg) {
          max-height: toRem(190);

        }
      }
    }
  }

  //tabs style
  .tabs {
    padding: 0;
    width: 100%;
    margin-top: toRem(16);
    @include mq(lg) {
      width: 70%;
    }

    &__items {
      display: flex;
      width: 100%;
      align-items: center;
      cursor: pointer;
      border-radius: toRem(8);

      &--item:first-child {
        border-radius: toRem(8) 0 0 0;
        border-left: 1px solid var(--color-white-300);
      }

      &--item:last-child {
        border-radius: 0 toRem(8) 0 0;
      }

      &--item {
        padding: toRem(8) toRem(32);
        border-width: 1px 1px 0 0;
        border-color: var(--color-white-400);
        border-style: solid;
        text-transform: capitalize;

      }
    }

    &__content {
      border-radius: 0 toRem(8);
      width: 100%;
      background: var(--color-white-200);
      padding: toRem(16);

      &--desc {
        font-weight: bold;
        text-transform: capitalize;
      }

      &--teacher {
        font-weight: bold;
        font-size: toRem(20);
        text-transform: capitalize;
        text-decoration: underline;
      }
    }
  }

}

.green-text {
  color: var(--color-success) !important;
}

.active-bg {
  background: var(--color-white-200);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
