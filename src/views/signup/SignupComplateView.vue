<template>
  <Layout>
    <SignupLayout>
      <section class="section-wrap">
        <div>
          <h1>"{{ userNameInfo }}"님,</h1>
          <h1>회원가입이</h1>
          <h1>완료되었습니다.</h1>
        </div>
        <div>
          <div>
            <span>이메일: </span>
            <span>{{ emailInfo }}</span>
          </div>
          <div>
            <span>주소: </span>
            <span>{{ addressInfo }}</span>
          </div>
          <div>
            <span>연락처</span>
            <span>{{ phoneNumberInfo }}</span>
          </div>
        </div>
      </section>
    </SignupLayout>
  </Layout>
</template>

<style scoped>
.section-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>

<script setup lang="ts">
import Layout from '@/components/common/Layout.vue';
import SignupLayout from './components/SignupLayout.vue';
import { useRouter } from 'vue-router';
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

let urlParams = new URLSearchParams(window.location.search);
const router = useRouter();
const store = useStore();

const userToken = ref<string>('');
const userNameInfo = ref<string>('');
const emailInfo = ref<string>('');
const addressInfo = ref<string>('');
const phoneNumberInfo = ref<string>('');

onBeforeMount(() => {
  isValidEnterHandler();
});

onMounted(() => {
  getUserInfoHandler();
});

onBeforeUnmount(() => {
  store.commit('user/cleanupSignProcess');
});

const isValidEnterHandler = () => {
  if (!urlParams.has('user')) {
    router.replace('/');
    return;
  }
  userToken.value = urlParams.get('user') as string;
}

const getUserInfoHandler = async () => {

  // api 통신으로 signUp 완료된 userInfo 정보 호출
  const { email, userName, address, phoneNumber } = await store.dispatch('user/getUserInfo');
  if (email) emailInfo.value = email;
  if (userName) userNameInfo.value = userName;
  if (address) addressInfo.value = address;
  if (phoneNumber) phoneNumberInfo.value = phoneNumber;

}

</script>