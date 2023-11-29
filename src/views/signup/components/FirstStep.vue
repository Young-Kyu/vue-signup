


<template>
  <section class="field-wrap">
    <InputField ref="emailInputRef" name="이메일" type="text" :value='email' :error="emailError"
      @inputHandler="emailInputHandler" />
    <InputField name="비밀번호" type="password" :value='password' :error="passwordError"
      @inputHandler="passwordInputHandler" />
    <InputField name="비밀번호 확인" type="password" :value='confirmPassword' :error="confirmPasswordError"
      @inputHandler="confirmPasswordInputHandler" :enableEnter="true" @enterHandler="nextStepHandler" />
  </section>
  <CommonButton :btn-text="`다음`" @clickHandler="nextStepHandler" />
</template>

<style scoped>
.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.row-wrap {
  display: flex;
  justify-content: space-between;
}
</style>

<script setup lang="ts">
const emit = defineEmits(['stepHandler']);
import { computed, onMounted, ref } from 'vue';
import InputField from '@/components/common/InputField.vue'
import { useStore } from 'vuex';
import CommonButton from '@/components/common/CommonButton.vue';

const store = useStore();

const email = ref<string>('');
const emailError = ref('');
const password = ref('');
const passwordError = ref('');
const confirmPassword = ref('');
const confirmPasswordError = ref('');
const emailInputRef = ref<typeof InputField | null>(null);

const emailInputHandler = (value: string) => email.value = value;
const passwordInputHandler = (value: string) => password.value = value;
const confirmPasswordInputHandler = (value: string) => confirmPassword.value = value;


onMounted(() => {
  onMountHandler();
})

const userInfo = computed(() => store.getters['user/getSignProcess']);
const onMountHandler = () => {
  const { email: emailStore, password: passwordStore } = userInfo.value[0];
  if (email && password) {
    email.value = emailStore;
    password.value = passwordStore;
    confirmPassword.value = passwordStore;
  }

  if (emailInputRef.value) {
    emailInputRef.value.focusInput();
  }
}

const nextStepHandler = () => {
  const emailValid = emailValidationCheck();
  const passwordValid = passwordValidationCheck();
  const confirmPasswordValid = confirmPasswordValidationCheck();

  const allPassValid = [emailValid, passwordValid, confirmPasswordValid].every(valid => valid);
  if (allPassValid) {
    store.commit('user/setSignupProcess', { data: { email: email.value, password: password.value }, step: 0 });
    emit('stepHandler', 1)
  }
}

const emailValidationCheck = (): boolean => {
  let flag = false;
  if (!email.value) {
    emailError.value = '이메일은 필수 입력사항 입니다.';
    return flag;
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email.value)) {
    emailError.value = '이메일 형식을 지켜주세요';
  } else {
    emailError.value = '';
    flag = true;
  }
  return flag;
}

const passwordValidationCheck = (): boolean => {
  let flag = false;
  if (!password.value) {
    passwordError.value = '비밀번호를 입력 해 주세요.';
    return flag;
  }
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password.value)) {
    passwordError.value = '비밀번호는 영문 대문자, 소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자열로 작성해주세요.';
  } else {
    passwordError.value = '';
    flag = true;
  }
  return flag;
}

const confirmPasswordValidationCheck = (): boolean => {
  confirmPasswordError.value = '';
  if (!confirmPassword.value) {
    confirmPasswordError.value = '비밀번호를 입력 해 주세요.';
    return false;
  }
  const valid = password.value === confirmPassword.value;
  if (!valid) {
    confirmPasswordError.value = '비밀번호와 동일하게 입력 해 주세요'
  }
  return valid;
}

</script>
