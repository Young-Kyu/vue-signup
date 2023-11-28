


<template>
  <div>
    <div>이메일</div>
    <div>비밀번호</div>
    <div>비밀번호 확인</div>
    <button @click="$emit('stepHandler', 1)">다음</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
</script>