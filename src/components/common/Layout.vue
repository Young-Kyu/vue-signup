<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: .5px solid #DEDEDE;
}
</style>