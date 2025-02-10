<script setup>
import BaseBtn from '@/components/global/BaseBtn.vue'

const emits = defineEmits(['clickOnBtn'])

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

function clickOnBtn() {
  emits('clickOnBtn')
}
</script>

<template>
  <section class="banner">
    <div class="banner__content">
      <p v-if="props.item.moreTxt" class="banner__content--more">{{ props.item.moreTxt }}</p>
      <h3 v-if="props.item.title" class="banner__content--title">{{ props.item.title }}</h3>
      <p v-if="props.item.desc" class="banner__content--desc">{{ props.item.desc }}</p>
      <BaseBtn :text="props.item.btnTxt" @click="clickOnBtn" />
    </div>
    <div class="red-square">
      <img alt="icon" src="/assets/icons/pdf.png" />
    </div>
    <div class="purple-square">
      <img alt="icon" src="/assets/icons/woo.png" />
    </div>
    <div class="yellow-square">
      <img alt="icon" src="/assets/icons/stripe.png" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 40vh;
  padding: toRem(32);
  max-height: toRem(350);
  border-radius: toRem(24);
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(to right, #B5FFE7 10%, #FDC1C1);
  overflow: hidden;

  &__content {
    gap: toRem(8);
    display: flex;
    flex-direction: column;
    align-items: start;
    max-width: 70%;

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

  .red-square {
    background: var(--color-danger);
    height: toRem(100);
    width: toRem(100);
    transform: rotate(130deg);
    right: 0;
    bottom: 10%;
    @include mq(sm) {
      height: toRem(120);
      width: toRem(120);
    }

    img {
      transform: rotate(-140deg) translateY(-10px);
    }
  }

  .purple-square {
    background: #CB37FF;
    transform: rotate(40deg);
    bottom: 0;
    right: 20%;
    height: toRem(80);
    width: toRem(80);
    @include mq(sm) {
      height: toRem(100);
      width: toRem(100);
      right: 15%;

    }

    img {
      transform: rotate(345deg);
    }
  }

  .yellow-square {
    height: toRem(80);
    width: toRem(80);
    background: var(--color-secondary);
    transform: rotate(-20deg) translateY(-58%);
    right: 10%;
    top: 50%;

    img {
      transform: rotate(-15deg);

    }

  }
}

div[class*="square"] {
  border-radius: toRem(24);
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
