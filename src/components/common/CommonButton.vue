

<template>
  <button class="button" @click="$emit('clickHandler')" :type='type'>
    {{ btnText }}
  </button>
</template>


<style scoped>
.button {
  padding: 12px 16px;
  background-color: v-bind('backgroundColor');
  cursor: pointer;
  border: none;
  color: #FFF;
}
</style>

<script setup lang="ts">

defineEmits<{
  (e: 'clickHandler'): void
}>();

withDefaults(defineProps<CommonButtonProps>(), {
  btnText: '확인',
  backgroundColor: 'black',
  type: 'button',
});


</script>

<script lang="ts">
interface CommonButtonProps {
  backgroundColor: string;
  btnText: string;
  type: 'button' | 'submit';
}
</script>