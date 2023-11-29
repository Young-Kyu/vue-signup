<template>
  <section class="field-wrap">
    <p>카드번호</p>
    <div class="input-wrap">
      <input ref="inputRef" v-model="cardNumber[0]" @input="handleInput(0)" maxlength="4" />
      <input v-model="cardNumber[1]" @input="handleInput(1)" maxlength="4" />
      <input v-model="cardNumber[2]" @input="handleInput(2)" maxlength="4" />
      <input v-model="cardNumber[3]" @input="handleInput(3)" maxlength="4" @keyup.enter="submitHandler" />
    </div>
    <ErrorText v-if="!!cardNumberError" :error-text="cardNumberError" />
  </section>
  <CommonButton :btn-text="`완료`" @clickHandler="submitHandler" />
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue';
import ErrorText from '@/components/common/ErrorText.vue';
import { onMounted, ref } from 'vue';

const cardNumber = ref<string[]>(["", "", "", ""]);
const cardNumberError = ref<string>('');
const inputRef = ref<HTMLInputElement | null>(null)

const handleInput = (index: 0 | 1 | 2 | 3) => {
  cardNumber.value[index] = cardNumber.value[index].replace(/[^0-9]/g, '');
};

onMounted(() => {
  // 컴포넌트가 마운트된 후 첫 번째 input에 포커스를 설정
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

const submitHandler = () => {
  let fullCardNumber = '';
  cardNumberError.value = '';
  for (let number of cardNumber.value) {
    fullCardNumber += number;
  }

  if (fullCardNumber.length !== 16) {
    cardNumberError.value = '카드번호 16자리를 모두 입력해 주세요.';
    return;
  }

  let sum = 0;
  for (let i = 0; i < fullCardNumber.length; i++) {
    let digit = parseInt(fullCardNumber.charAt(i), 10);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = digit % 10 + Math.floor(digit / 10);
      }
    }
    sum += digit;
  }
  if (sum % 10 !== 0) {
    cardNumberError.value = '카드번호가 유효하지 않습니다. 다시 확인해 주세요.';
    return;
  }
}

</script>

<style scoped>
.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;

}

.input-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  width: 22%;
  min-width: 10px;
  height: 30px;
  padding-left: 6px;
  border-radius: 6px;
  border: .5px solid #DEDEDE;
}
</style>
