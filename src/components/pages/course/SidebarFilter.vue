<script setup>
import { computed, ref } from 'vue'
import { useCourseStore } from '@/store/course.js'

const courseStore = useCourseStore()
const activeFilters = ref({
  category: [],
  instructor: [],
  price: []
})
const filters = computed(() => {
  return [
    { title: 'Course category', items: courseStore.categories }, {
      title: 'Instructor',
      items: courseStore.courseInstructors
    }, {
      title: 'Price',
      items: ['Paid', 'Free']
    }
  ]
})

// Methods
function updateFilter(title, item, event) {
  if (title.includes('category')) {
    title = 'category'
  }
  title = title.toLowerCase()
  item = item.toLowerCase()
  const isChecked = event.target.checked
  if (isChecked) {
    activeFilters.value[title].push(item)
  } else {
    const index = activeFilters.value[title].indexOf(item)
    if (index > -1) {
      activeFilters.value[title].splice(index, 1)
    }
  }
  courseStore.setFilters(activeFilters.value)
}

</script>
<template>
  <div class="filter">
    <div v-for="(filter,index) in filters" :key="index">
      <h4>{{ filter.title }}</h4>
      <div v-for="(item, idx) in filter.items" :key="idx" class="input-container">
        <input :id="`input-id-${item}`" :name="`input-id-${item}`"
               :value="item"
               type="checkbox" @change="updateFilter(filter.title, item, $event)" />
        <label :for="`input-id-${item}`">{{ item }}</label>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.filter {
  max-width: toRem(240);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: toRem(10);

  h4 {
    font-size: toRem(22);
    font-weight: 500;
    margin-bottom: toRem(8);
  }

  .input-container {
    display: flex;
    align-items: center;
    gap: toRem(4);


    &:hover label {
      color: var(--color-primary);
    }
  }
}
</style>
