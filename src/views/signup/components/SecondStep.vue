


<template>
  <div>
    <div>이름</div>
    <div>연락처</div>
    <div>주소</div>
    <div>
      <button @click="$emit('stepHandler', 0)">이전</button>
      <button @click="$emit('stepHandler', 1)">다음</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const userName = ref('');
const phoneNumber = ref('');
const address = ref('');
</script>