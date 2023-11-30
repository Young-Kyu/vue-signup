<template>
  <div class="wrap">
    <div class="inner-row">
      <div>{{ name }}</div>
      <input ref="inputRef" :type="type" :id="name" :value="value" @input="changeInputHandler($event)"
        @keyup.enter="keyUpEnter" />
    </div>
    <div v-if="error" class="error-text-wrap">
      <ErrorText :errorText="error" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps, ref } from "vue";
import ErrorText from "./ErrorText.vue";

const props = defineProps<InputFieldProps>();
const { enableEnter } = props;
const emit = defineEmits<{
  (e: 'inputHandler', value: string): void
  (e: 'enterHandler'): void
}>()
const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
}

const keyUpEnter = () => {
  if (enableEnter && inputRef.value) {
    emit('enterHandler');
  }
}

const changeInputHandler = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('inputHandler', value);
}


defineExpose({
  focusInput
})
</script>

<script lang="ts">
interface InputFieldProps {
  value: string;
  name: string;
  type: 'text' | 'password';
  error: string;
  enableEnter?: boolean;
  ref?: any;
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

input {
  width: 60%;
  height: 30px;
  padding-left: 6px;
  border-radius: 6px;
  border: .5px solid #DEDEDE;
}
</style>