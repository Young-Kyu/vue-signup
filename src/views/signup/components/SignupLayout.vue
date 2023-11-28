
<template>
  <section class="wrap">
    <slot></slot>
  </section>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px 16px;
  gap: 40px;
}
</style>