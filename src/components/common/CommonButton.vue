

<template>
  <button class="button" @click="$emit('clickHandler')">
    {{ text }}
  </button>
</template>


<style scoped>
.button {
  padding: 12px 16px;
  background-color: var(--custom-color, rgb(14, 209, 235));
  cursor: pointer;
}
</style>

<script setup lang="ts">
defineProps<{
  customColor: string;
  text: string;
}>();

</script>