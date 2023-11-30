
<template>
  <section class="wrap">
    <slot></slot>
  </section>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 24px 16px;
  background-color: #EFEFEF;
  border: 1px solid black;
  min-height: 500px;
}
</style>