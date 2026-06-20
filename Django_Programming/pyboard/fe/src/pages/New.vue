<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop is-10-tablet is-full-mobile">
        <h2 class="title mb-5 animate-slideup" style="font-weight: 800; color: #0f172a; margin-top: 1.5rem; letter-spacing: -0.02em;">새 글 작성하기</h2>
        <div class="box">
          <Form />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import Form from '../components/Form.vue';

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  }
});

const router = useRouter();

const checkAuth = () => {
  if (props.isLogin === false) {
    router.replace('/login');
  }
};

onBeforeMount(() => {
  checkAuth();
});

watch(() => props.isLogin, () => {
  checkAuth();
});
</script>
