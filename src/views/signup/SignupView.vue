


<template>
  <Layout>
    <SignupLayout>
      <template v-if="stepProcess === 0">
        <FirstStep @stepHandler="stepHandler" />
      </template>

      <template v-if="stepProcess === 1">
        <SecondStep @stepHandler="stepHandler" />
      </template>

      <template v-if="stepProcess === 2">
        <ThirdStep @stepHandler="stepHandler" />
      </template>
    </SignupLayout>
  </Layout>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue';
import Layout from '@/components/common/Layout.vue';
import FirstStep from './components/FirstStep.vue';
import SecondStep from './components/SecondStep.vue';
import { unloadConfirmation } from '@/util/backConfirmation';
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import SignupLayout from './components/SignupLayout.vue';
import ThirdStep from './components/ThirdStep.vue';
import { useStore } from 'vuex';

const stepProcess = ref(0);
const store = useStore();
const router = useRouter();

const signProcess = computed(() => store.getters['user/getSignProcess']);

const { addEvent, destoryEvent } = unloadConfirmation();

onMounted(() => {
  addEvent();
})

onBeforeUnmount(() => {
  // signUp complate를 위한 cleanup 임시 주석처리
  // store.commit('user/cleanupSignProcess');
  destoryEvent();
});

onBeforeRouteLeave((to, from, next) => {
  const { path } = to;
  if (path.includes('complate')) {
    next();
    return;
  }
  if (stepProcess.value > 0) {
    stepHandler(stepProcess.value - 1);
    next(false);
    return;
  }
  const answer = window.confirm('페이지를 정말 떠나시겠습니까?');
  if (!answer) {
    next(false);
  } else {
    next();
  }
});


const stepHandler = async (step: number) => {
  if (signProcess.value.length > step) {
    stepProcess.value = step;
    return;
  }
  try {
    const isSuccessSignUp = await store.dispatch('user/postUserSignUp');
    if (isSuccessSignUp) {
      router.push({ name: 'signupComplate', query: { user: isSuccessSignUp } });
    }
  } catch (err) {
    console.error(err)
  }
}


</script>