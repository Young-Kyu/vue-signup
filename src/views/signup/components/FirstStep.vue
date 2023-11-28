


<template>
  <SignupLayout>
    <InputField name="이메일" type="text" :value='email' :error="emailError" @inputHandler="emailInputHandler" />
    <InputField name="비밀번호" type="password" :value='password' :error="passwordError"
      @inputHandler="passwordInputHandler" />
    <InputField name="비밀번호 확인" type="password" :value='confirmPassword' :error="confirmPasswordError"
      @inputHandler="confirmPasswordInputHandler" />
  </SignupLayout>
  <button @click="nextStepHandler">다음</button>
</template>

<style scoped>
.row-wrap {
  display: flex;
  justify-content: space-between;
}
</style>

<script setup lang="ts">
const emit = defineEmits(['stepHandler']);
import { computed, onMounted, ref } from 'vue';
import InputField from '@/components/common/InputField.vue'
import SignupLayout from './SignupLayout.vue';
import { useStore } from 'vuex';

const store = useStore();

const email = ref('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmPasswordError = ref('');

const emailInputHandler = (value: string) => email.value = value;
const passwordInputHandler = (value: string) => password.value = value;
const confirmPasswordInputHandler = (value: string) => confirmPassword.value = value;


onMounted(() => {
  onMountHandler();
})

const userName = computed(() => store.getters['user/getSignProcess']);
const onMountHandler = () => {
  const { email: emailStore, password: passwordStore } = userName.value[0];
  if (email && password) {
    email.value = emailStore;
    password.value = passwordStore;
    confirmPassword.value = passwordStore;
  }
}

const nextStepHandler = () => {
  const emailValid = emailValidationCheck();
  const passwordValid = passwordValidationCheck();
  const confirmPasswordValid = confirmPasswordValidationCheck();

  const allPassValid = [emailValid, passwordValid, confirmPasswordValid].every(valid => valid);
  store.commit('user/setSignupProcess', { data: { email: email.value, password: password.value }, step: 0 });
  if (allPassValid) {
    emit('stepHandler', 1)
  }

}

const emailValidationCheck = (): boolean => {
  let flag = false;
  if (!email.value.includes('@')) {
    emailError.value = '이메일 형식을 지켜주세요';
  } else {
    emailError.value = '';
    flag = true;
  }
  return flag;
}

const passwordValidationCheck = (): boolean => {
  let flag = false;
  if (!password.value.includes('@')) {
    passwordError.value = '이메일 형식을 지켜주세요';
  } else {
    passwordError.value = '';
    flag = true;
  }
  return flag;
}

const confirmPasswordValidationCheck = (): boolean => {
  confirmPasswordError.value = '';
  const valid = password.value === confirmPassword.value;
  if (!valid) {
    confirmPasswordError.value = '비밀번호와 동일하게 입력 해 주세요'
  }
  return valid;
}

</script>