<template>
  <section class="field-wrap">
    <p>카드번호</p>
    <div class="input-wrap">
      <input type="text" v-for="(_, idx) in cardNumber" :ref="setItemRef" :key="idx" v-model="cardNumber[idx]"
        @input="handleInput(idx)" maxlength="4" @keyup.enter="idx === cardNumber.length - 1 ? submitHandler() : null" />
    </div>
    <ErrorText v-if="!!cardNumberError" :error-text="cardNumberError" />
  </section>
  <CommonButton :btn-text="`완료`" @clickHandler="submitHandler" />
</template>


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


<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue';
import ErrorText from '@/components/common/ErrorText.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const emit = defineEmits<{
  (e: 'stepHandler', step: number): void
}>();

const cardNumber = ref<string[]>(["", "", "", ""]);
const cardNumberError = ref<string>('');

const inputRefs = ref<Array<HTMLInputElement>>([]);

const setItemRef = (el: any) => {
  if (!el) return;
  inputRefs.value.push(el);
}


const handleInput = (index: number) => {
  cardNumber.value[index] = cardNumber.value[index].replace(/[^0-9]/g, '');

  if (index < cardNumber.value.length - 1 && cardNumber.value[index].length === 4) {
    inputRefs.value[index + 1].focus();
  }
};

onMounted(() => {
  // 컴포넌트가 마운트된 후 첫 번째 input에 포커스를 설정
  if (inputRefs.value[0]) {
    inputRefs.value[0].focus();
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

  store.commit('user/setSignupProcess', { data: { cardNumber: fullCardNumber }, step: 2 });
  emit('stepHandler', 3)
}

</script>
