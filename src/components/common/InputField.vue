<template>
  <div class="wrap">
    <div class="inner-row">
      <div>{{ name }}</div>
      <input :type="type" :id="name" :value="value" @input="changeInputHandler($event)" />
    </div>
    <div v-if="error" class="error-text-wrap">
      <p class="error-text">{{ error }}</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps } from "vue";

defineProps<InputFieldProps>();

const emit = defineEmits(['inputHandler']);

const changeInputHandler = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('inputHandler', value);
}

</script>

<script lang="ts">
interface InputFieldProps {
  value: string;
  name: string;
  type: 'text' | 'password';
  error: string;
}
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.inner-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-text-wrap {
  display: flex;
  justify-content: flex-end;
}

.error-text {
  color: red;
  font-size: 12px;
}

input {
  width: 60%;
  height: 30px;
  padding-left: 6px;
  border-radius: 6px;
  border: .5px solid #DEDEDE;
}
</style>