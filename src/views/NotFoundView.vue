<script setup>
console.log('NotFoundView loaded')

</script>

<template>
  <main class="not-found max-content">
    <h1>Ooops! The page you were looking for does not exist</h1>
    <img alt="not found image" src="/assets/images/notFound.png" />
  </main>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: toRem(24);
  max-width: 80%;
  margin: auto;
}
</style>
