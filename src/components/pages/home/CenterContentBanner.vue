<script setup>
import BaseBtn from '@/components/global/BaseBtn.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="center-banner">
    <div class="center-banner__content">
      <p class="center-banner__content--more">{{ props.item.moreTxt }}</p>
      <h3 class="center-banner__content--title">{{ props.item.title }}</h3>
      <p class="center-banner__content--desc">{{ props.item.desc }}</p>
      <BaseBtn :text="props.item.btnTxt" />
    </div>
    <img alt="wordpress theme images" class="images images--yellow"
         src="/assets/images/home/banner1.png">
    <img alt="wordpress theme images" class="images images--blue"
         src="/assets/images/home/banner2.png">
  </section>
</template>

<style lang="scss" scoped>
.center-banner {
  width: 100%;
  height: 40vh;
  padding: toRem(32);
  max-height: toRem(350);
  border-radius: toRem(24);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  background: linear-gradient(to right, #FEB6B6 10%, #B7E1FF);
  overflow: hidden;


  &__content {
    position: relative;
    z-index: 3;
    gap: toRem(8);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 80%;

    @include mq(sm) {
      max-width: 60%;
    }

    @include mq(lg) {
      max-width: 40%;
    }

    &--more {
      color: var(--color-black-200);
      font-size: toRem(16);
      font-weight: 500;
    }

    &--title {
      font-size: toRem(32);
      font-weight: bold;
    }

    &--desc {
      color: var(--color-black-400);
      font-weight: lighter;
      margin-bottom: toRem(8);

    }
  }

  .images {
    position: absolute;

    &--yellow {
      right: -35%;
      bottom: 0;
      @include mq(sm) {
        right: -15%;
      }
      @include mq(lg) {
        right: 0;
      }
    }

    &--blue {
      left: -35%;
      top: 50%;
      transform: translateY(-50%);

      @include mq(sm) {
        left: -15%;
      }
      @include mq(lg) {
        left: 0;
      }
    }
  }
}
</style>
