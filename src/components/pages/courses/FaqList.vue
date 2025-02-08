<script setup>
import faqList from '@/utils/faqList.js'
import { ref } from 'vue'

const activeFaq = ref(0)

</script>

<template>
  <section class="faq">
    <div v-for="(faq, index) in faqList" :key="index"
         class="faq-item" @click="activeFaq = index">
      <button class="accordion">{{ faq.title }}</button>
      <div :class="activeFaq === index ? 'active':''" class="panel">
        <p>{{ faq.desc }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.accordion {
  background-color: var(--color-white-100);
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  overflow: hidden;
}

.active, .accordion:hover {
  background-color: #ccc;
}

.panel {
  display: none;
  background-color: var(--color-white-200);
  overflow: hidden;
  padding: toRem(12) toRem(16);
}

.panel.active {
  display: block;
}

</style>
