<script setup>
import TitleCard from '@/components/global/TitleCard.vue'
import CategoryList from '@/components/pages/home/CategoryList.vue'
import CourseList from '@/components/pages/home/CourseList.vue'
import BaseBanner from '@/components/pages/home/BaseBanner.vue'
import { computed } from 'vue'
import StaticList from '@/components/pages/home/StaticList.vue'
import GrowSkillCard from '@/components/pages/home/GrowSkillCard.vue'
import CenterContentBanner from '@/components/pages/home/CenterContentBanner.vue'
import HeaderBanner from '@/components/global/HeaderBanner.vue'

// Computed Properties
const bannerContent = computed(() => {
  return {
    title: 'LearnPress Add-Ons',
    moreTxt: 'GET MORE POWER FROM',
    desc: 'The next level of LearnPress - LMS WordPress Plugin. More Powerful, Flexible and Magical Inside.',
    btnTxt: 'Explorer course',
    btnUrl: '/'
  }
})
const centerBannerContent = computed(() => {
  return {
    title: 'education wordpress theme',
    moreTxt: 'PROVIDING AMAZING',
    desc: 'The next level of LMS WordPress Theme. Learn anytime and anywhere.',
    btnTxt: 'Explorer course',
    btnUrl: '/'
  }
})
</script>

<template>
  <section class="home">
    <HeaderBanner />
    <main class="home-content max-content">
      <TitleCard desc="Explore our Popular Categories"
                 title="Top Categories" />
      <CategoryList />
      <TitleCard btn-txt="All courses"
                 desc="Explore our Popular Courses" title="Featured courses" />
      <CourseList />
      <BaseBanner :item="bannerContent" class="base-banner" />
      <StaticList />
      <GrowSkillCard />
      <CenterContentBanner :item="centerBannerContent" />
    </main>
  </section>
</template>

<style lang="scss" scoped>
.home-content {
  margin-top: toRem(90);
  width: 100%;
}

.category-list, .course-list, .base-banner, .static-list, .grow-skill {
  margin-bottom: toRem(90);
}
</style>
