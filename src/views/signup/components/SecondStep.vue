


<template>
  <section class="field-wrap">
    <InputField ref="userNameInputRef" name="이름" type="text" :value='userName' :error="userNameError"
      @inputHandler="userNameInputHandler" />
    <InputField name="연락처" type="text" :value='phoneNumber' :error="phoneNumberError"
      @inputHandler="phoneNumberInputHandler" />
    <div class="address-wrap">
      <div class="address-row">
        <div>주소</div>
        <CommonButton :style="{ padding: '6px 12px' }" btnText="우편번호" @clickHandler="showApi" />
      </div>
      <div class="address-value-wrap">
        <input type="text" :value="address" readonly />
        <input type="text" v-model="addressDetail" @keyup.enter="nextStepHandler" />
        <ErrorText v-if="!!addressError" :error-text="addressError" />
      </div>
    </div>
  </section>
  <div class="button-wrap">
    <CommonButton :btn-text="`이전`" @clickHandler="$emit('stepHandler', 0)" />
    <CommonButton :btn-text="`다음`" @clickHandler="nextStepHandler" />
  </div>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue';
import ErrorText from '@/components/common/ErrorText.vue';
import InputField from '@/components/common/InputField.vue';
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits(['stepHandler']);
const store = useStore();

onMounted(() => {
  onMountHandler();
})

const userInfo = computed(() => store.getters['user/getSignProcess']);

const onMountHandler = () => {
  const { name: nameStore, phoneNumber: phoneNumberStore, address: addressStore, addressDetail: addressDetailStore } = userInfo.value[1];
  if (nameStore) userName.value = nameStore;
  if (phoneNumberStore) phoneNumber.value = phoneNumberStore;
  if (addressStore) address.value = addressStore;
  if (addressDetailStore) addressDetail.value = addressDetailStore;

  if (userNameInputRef.value) {
    userNameInputRef.value.focusInput();
  }
}
const userNameInputRef = ref<typeof InputField | null>(null);

const userName = ref<string>('');
const userNameError = ref<string>('');
const phoneNumber = ref<string>('');
const phoneNumberError = ref<string>('');
const address = ref<string>('');
const addressDetail = ref<string>('');
const addressError = ref<string>('');


const userNameInputHandler = (value: string) => userName.value = value;
const phoneNumberInputHandler = (value: string) => phoneNumber.value = value;

function showApi() {
  new (window as any).daum.Postcode({
    oncomplete: (data: AddressOpenAPIResponse) => {
      let addressInfo = data.address;
      address.value = addressInfo;
    }
  }).open();
}

const nextStepHandler = () => {
  const userNameValid = userNameValidHandler();
  const phoneNumberValid = phoneNumberValidHandler();
  const addressValid = addressValidHandler();

  const allPassValid = [userNameValid, phoneNumberValid, addressValid].every(valid => valid);
  if (allPassValid) {
    store.commit('user/setSignupProcess', { data: { name: userName.value, phoneNumber: phoneNumber.value, address: address.value, addressDetail: addressDetail.value }, step: 1 });
    emit('stepHandler', 2)
  }
};

const userNameValidHandler = () => {
  let flag = false;
  if (!userName.value) {
    userNameError.value = "필수 입력사항 입니다.";
    return flag;
  }
  const userNameRegex = /^[\uAC00-\uD7AF]{2,}|[a-zA-Z]{3,}$/;
  if (!userNameRegex.test(userName.value)) {
    userNameError.value = '2글자 이상의 한글 완성형, 또는 3글자 이상의 영문 알파벳을 충족해주세요.'
  } else {
    userNameError.value = '';
    flag = true;
  }
  return flag;
}

const phoneNumberValidHandler = () => {
  let flag = false;
  if (!phoneNumber.value) {
    phoneNumberError.value = '필수 입력사항 입니다.';
    return flag;
  }

  const phoneStringValue = phoneNumber.value.split('').filter(e => !(/^[\d]$/.test(e)));
  if (phoneStringValue.length === 1) {
    phoneNumberError.value = '동일한 구분자로 연락처를 입력 해 주세요.';
    return flag;
  }

  if (phoneStringValue.length > 0) {
    if (new Set(phoneStringValue).size > 1) {
      phoneNumberError.value = '동일한 구분자로 연락처를 입력 해 주세요.';
      return flag;
    }
  }

  const phoneNumberRegex = /^010[-\s]?[0-9]{4}[-\s]?[0-9]{4}$/;
  if (!phoneNumberRegex.test(phoneNumber.value)) {
    phoneNumberError.value = '연락처 양식에 맞지 않습니다.';
  } else {
    phoneNumberError.value = '';
    flag = true;
  }
  return flag;
}

const addressValidHandler = () => {

  if (!address.value) {
    addressError.value = '필수 입력사항 입니다.';
    return false;
  }

  if (addressError.value) {
    addressError.value = '';
  }

  return true;
}

</script>

<script lang="ts">
interface AddressOpenAPIResponse {
  address: string;
}
</script>

<style scoped>
.field-wrap {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.address-wrap {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.address-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.address-value-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

input {
  width: 100%;
  height: 30px;
  padding-left: 6px;
  border-radius: 6px;
  border: .5px solid #DEDEDE;
}

.button-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 30px;

  & button {
    width: 50%;
  }
}
</style>
