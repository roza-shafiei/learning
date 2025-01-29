<script setup>
import { computed } from 'vue'
import IconTextCard from '@/components/global/IconTextCard.vue'

const catList = computed(() => {
  return [{ id: 1, icon: '/assets/icons/development.png', title: 'Development', courses: 38 },
    { id: 2, icon: '/assets/icons/finance.png', title: 'Finance', courses: 10 },
    { id: 3, icon: '/assets/icons/marketing.png', title: 'Marketing', courses: 5 }, {
      id: 4,
      icon: '/assets/icons/photography.png',
      title: 'Photography',
      courses: 5
    }, { id: 5, icon: '/assets/icons/science.png', title: 'Science', courses: 5 }]
})
</script>

<template>
  <section class="category-list">
    <IconTextCard v-for="category in catList" :key="category.id" :item="category" />
  </section>
</template>

<style lang="scss" scoped>
.category-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  margin-top: toRem(50);
}
</style>
