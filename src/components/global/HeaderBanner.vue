<script setup>

import BaseBtn from '@/components/global/BaseBtn.vue'

const bannerImgSrs = {
  orangeBg: '/assets/images/banner/orangeBg.png',
  greenBg: '/assets/images/banner/greenBg.png',
  textBg: '/assets/images/banner/textBg.png',
  girl: '/assets/images/banner/girl.png'
}
</script>

<template>
  <section class="banner">
    <img :src="bannerImgSrs.orangeBg" alt="banner-asset" class="banner__asset--orange">
    <img :src="bannerImgSrs.greenBg" alt="banner-asset" class="banner__asset--green" />

    <div class="banner--wrapper max-content">
      <img :src="bannerImgSrs.textBg" alt="banner-asset" class="banner__asset--text">
      <img :src="bannerImgSrs.girl" alt="banner-asset" class="banner__asset--girl">

      <div class="banner__content">
        <h1>Build Skills with
          Online Course</h1>
        <p>We denounce with righteous indignation and dislike men who are so beguiled and
          demoralized
          that cannot trouble.</p>
        <BaseBtn text="Find Course" />
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 80vh;
  max-height: toRem(700);
  background: linear-gradient(to right, #FFF5BE 30%, #D0F7EA);
  overflow: hidden;

  &--wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  &__asset {
    &--orange {
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
    }

    &--green {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
    }

    &--text {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
      width: 100%;
      @include mq(lg) {
        width: 80%;

      }
    }

    &--girl {
      display: none;
      @include mq(md) {
        display: block;
        position: absolute;
        right: -15%;
        bottom: 0;
        z-index: 3;
        height: 100%;
        object-fit: contain;
      }
      @include mq(lg) {
        right: -10%;
      }
    }
  }


  &__content {
    position: relative;
    z-index: 100;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: toRem(16);

    p {
      color: var(--color-black-600);
    }

    h1, p {
      text-align: center;
    }

    @include mq(md) {
      width: 50%;
      align-items: start;
      h1, p {
        text-align: start;
      }

    }
  }
}

</style>
