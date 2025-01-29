<script setup>
import { computed } from 'vue'
import StaticCard from '@/components/pages/home/StaticCard.vue'

const staticList = computed(() => {
  return [{
    id: 1,
    title: '25K+',
    desc: 'Active Students'
  },
    {
      id: 2,
      title: '899',
      desc: 'Total Courses'
    },
    {
      id: 3,
      title: '158',
      desc: 'Instructor'

    },
    {
      id: 4,
      title: '100%',
      desc: 'Satisfaction rate'

    }
  ]
})
</script>

<template>
  <section class="static-list">
    <StaticCard v-for="item in staticList" :key="item.id" :item="item" />
  </section>
</template>

<style lang="scss" scoped>
.static-list {
  margin-top: toRem(50);
  display: grid;
  column-gap: toRem(16);
  row-gap: toRem(20);
  place-items: center;
  grid-template-columns: 1fr;

  @include mq(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include mq(lg) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
  }
}
</style>
