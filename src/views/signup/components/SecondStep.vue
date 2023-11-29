


<template>
  <InputField name="이름" type="text" :value='userName' :error="userNameError" @inputHandler="userNameInputHandler" />
  <InputField name="연락처" type="text" :value='phoneNumber' :error="phoneNumberError"
    @inputHandler="phoneNumberInputHandler" />
  <section class="address-wrap">
    <div class="address-row">
      <div>주소</div>
      <CommonButton :style="{ padding: '6px 12px' }" btnText="우편번호" @clickHandler="showApi" />
    </div>
    <div class="address-value-wrap">
      <input type="text" :value="address" readonly />
      <input type="text" v-model="addressDetail" />
    </div>
  </section>
  <div>
    <button @click="$emit('stepHandler', 0)">이전</button>
    <button @click="nextStepHandler">다음</button>
  </div>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue';
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

  userName.value = nameStore;
  phoneNumber.value = phoneNumberStore;
  address.value = addressStore;
  addressDetail.value = addressDetailStore;

}

const userName = ref<string>('');
const userNameError = ref<string>('');
const phoneNumber = ref<string>('');
const phoneNumberError = ref<string>('');
const address = ref<string>('');
const addressDetail = ref<string>('');


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

  store.commit('user/setSignupProcess', { data: { name: userName.value, phoneNumber: phoneNumber.value, address: address.value, addressDetail: addressDetail.value }, step: 1 });
  emit('stepHandler', 2)

}
</script>

<script lang="ts">
interface AddressOpenAPIResponse {
  address: string;
}
</script>

<style scoped>
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
</style>
