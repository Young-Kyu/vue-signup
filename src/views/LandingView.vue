
<template>
  <Layout>
    <div class="content-wrap">
      <h1>회원가입 하러가기</h1>
      <CommonButton :customColor="`black`" :text="`회원가입`" @clickHandler="buttonClickHandler" />
    </div>
  </Layout>
</template>


<style>
.content-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 48px 0px;
}
</style>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue';
import Layout from '@/components/common/Layout.vue';
import router from '@/router';

function buttonClickHandler() {
  router.push('/signup');
}

</script>


