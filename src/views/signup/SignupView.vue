


<template>
  <Layout>
    <SignupLayout>
      <template v-if="stepProcess === 0">
        <FirstStep @stepHandler="stepHandler" />
      </template>

      <template v-if="stepProcess === 1">
        <SecondStep @stepHandler="stepHandler" />
      </template>
    </SignupLayout>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Layout from '@/components/common/Layout.vue';
import FirstStep from './components/FirstStep.vue';
import SecondStep from './components/SecondStep.vue';
import { unloadConfirmation } from '@/util/backConfirmation';
import { onBeforeRouteLeave } from 'vue-router'
import SignupLayout from './components/SignupLayout.vue';

const stepProcess = ref(0);

// TODO: 실행 조건 추가하여 addEvent, destory 등록할 것 (조건: store에 사용자 입력값이 존재하는 경우)
// 새로고침, 브라우저 종료 confirm
const { addEvent, destoryEvent } = unloadConfirmation();

onBeforeRouteLeave((to, from, next) => {
  // TODO : 해당 로직에 조건 추가할 것 (조건: store에 사용자 입력값이 존재하는 경우)
  // 화면 뒤로가기 confirm
  if (stepProcess.value > 0) {
    stepHandler(stepProcess.value - 1);
    next(false);
    return;
  }
  const answer = window.confirm('페이지를 정말 떠나시겠습니까?');
  if (!answer) {
    next(false); // 방지
  } else {
    next(); // 계속 진행
  }
});


const stepHandler = (step: number) => {
  stepProcess.value = step;
}
</script>