<script setup>
import BaseBtn from '@/components/global/BaseBtn.vue'
import { computed } from 'vue'

const emits = defineEmits(['clickOnBtn'])
const listItem = computed(() => {
  return ['Lorem', 'Lorem IpSum', 'Certification', 'Certification', 'Certification']
})

function emitClick() {
  emits('clickOnBtn')
}
</script>

<template>
  <section class="grow-skill">
    <div class="img-container">
      <img alt="Grow us your skill
with LearnPress LMS" src="/assets/images/home/grow-skill.png">
    </div>
    <div class="content">
      <h3 class="content__title">Grow us your skill
        with LearnPress LMS</h3>
      <p class="content__desc">We denounce with righteous indignation and dislike men who are so
        beguiled and demoralized
        that cannot trouble.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus dicta dolore dolorum
        sint! Blanditiis dolorum fugiat, ipsam iure quidem tempore.</p>
      <ul>
        <li v-for="(item,index) in listItem" :key="index">
          <img alt="" src="/assets/icons/check-green.png">
          <span>{{ item }}</span>
        </li>
      </ul>
      <BaseBtn text="Explorer course" @click="emitClick" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.grow-skill {
  width: 100%;
  display: flex;
  gap: toRem(16);
  flex-direction: column;
  justify-content: space-between;

  @include mq(lg) {
    flex-direction: row;
  }

  .img-container {
    width: 100%;
    @include mq(lg) {
      width: 50%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    width: 100%;
    @include mq(lg) {
      width: 44%;
    }

    &__title {
      font-size: toRem(32);
      font-weight: bold;
    }

    &__desc {
      font-size: toRem(16);
      color: var(--color-black-600);

    }
  }

  ul {
    margin: toRem(10) 0;
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: toRem(4);

    li {
      font-size: toRem(15);
      display: flex;
      align-items: center;
      color: var(--color-black-600);

    }
  }
}
</style>
