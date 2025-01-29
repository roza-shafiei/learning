<script setup>
import TitleCard from '@/components/global/TitleCard.vue'
import CategoryList from '@/components/pages/home/CategoryList.vue'
</script>

<template>
  <main class="home max-content">
    <TitleCard desc="Explore our Popular Categories"
               title="Top Categories" />
    <CategoryList />
  </main>
</template>

<style lang="scss" scoped>
.home {
  margin-top: toRem(90);
}
</style>
