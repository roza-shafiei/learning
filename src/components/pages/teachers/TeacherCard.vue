<script setup>
import { computed } from 'vue'
import BaseBtn from '@/components/global/BaseBtn.vue'
import ContactTeacherForm from '@/components/pages/courses/ContactTeacherForm.vue'

// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isFormVisible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['contactClick', 'formSubmit'])


// Computed Properties
const fullName = computed(() => `${props.item?.name}  ${props.item?.lastname}`)
const hourlyRate = computed(() => `${props.item.hourlyRate}$/hr`)

// Methods
function clickingContactBtn() {
  emit('contactClick')
}

function handleFormSubmit() {
  emit('formSubmit')
}

</script>

<template>
  <article class="teacher-card">
    <div class="teacher-card__content">
      <h3 class="teacher-card__name">{{ fullName }}</h3>
      <div class="teacher-card__area">
        <span v-for="(skill, index) in item.areas" :key="index">{{ skill }}</span>
      </div>
      <p class="teacher-card__desc">{{ item.desc }}</p>
      <h3 class="teacher-card__rate">{{ hourlyRate }}</h3>
      <BaseBtn v-if="!isFormVisible"
               class="teacher-card__btn" text="Contact"
               @click="clickingContactBtn"
      />
      <Transition mode="out-in" name="fade">
        <ContactTeacherForm v-if="isFormVisible"
                            :id="item.id"
                            @submit-form="handleFormSubmit" />
      </Transition>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.teacher-card {
  width: 100%;
  border-radius: toRem(24);
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 6px 6px 8px 0 var(--color-white-300), 6px 6px 8px 0 var(--color-white-300);
  }

  &__content {
    padding: toRem(20);
    display: flex;
    flex-direction: column;
    gap: toRem(12);
  }

  &__name {
    text-transform: capitalize;
    font-size: toRem(30);
    font-weight: 600;
  }

  &__desc {
    font-size: toRem(18);
    color: var(--color-black-600);

  }

  &__rate {
    color: var(--color-black-200);
    font-size: toRem(16);
    transition: all 0.3s ease-in-out;
  }

  &__area {
    display: flex;
    align-items: center;
    gap: toRem(12);
    color: var(--color-black-200);

    span {
      font-size: toRem(18);
      font-weight: 600;
      text-transform: capitalize;
    }
  }

  &__btn {
    align-self: start;
  }

  &__action {
    color: var(--color-black-200);
    display: flex;
    align-items: center;
    width: 100%;
    gap: toRem(12);
  }
}

</style>
