<script setup>

const props = defineProps({
  text: String,
  loading: Boolean
})
</script>

<template>
  <button class="btn base-btn" @click="$emit('click')">
    <span v-if="!loading"> {{ props.text }}</span>
    <span v-else :style="loading ? 'display:block':'display:none'" class="btn-ring"
    ></span>
  </button>
</template>

<style lang="scss">
.btn {
  @include base-btn;
}

.btn-ring:after {
  content: "";
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid;
  border-color: var(--color-white-100) transparent var(--color-white-100) transparent;
  animation: ring 1.2s linear infinite;
}

@keyframes ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
