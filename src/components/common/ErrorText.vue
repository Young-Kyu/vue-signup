
<template>
  <p>{{ errorText }}</p>
</template>

<style scoped>
p {
  color: red;
  font-size: 12px;
}
</style>

<script setup lang="ts">
defineProps<ErrorTextProps>();
</script>

<script lang="ts">
interface ErrorTextProps {
  errorText: string;
}
</script>