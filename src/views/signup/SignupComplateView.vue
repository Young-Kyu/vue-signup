<template>
  <Layout>
    <SignupLayout>
      <section>
        <div>
          <h1>"{{ '김발란' }}"님,</h1>
          <h1>회원가입이</h1>
          <h1>완료되었습니다.</h1>
        </div>
        <div>
          <div>
            <span>이메일: </span>
            <span>fhweh@fui.com</span>
          </div>
          <div>
            <span>주소: </span>
            <span>서울시 강남구 테헤란로 217</span>
          </div>
          <div>
            <span>연락처</span>
            <span>010-1234-1234</span>
          </div>
        </div>
      </section>
    </SignupLayout>
  </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/common/Layout.vue';
import SignupLayout from './components/SignupLayout.vue';

</script>