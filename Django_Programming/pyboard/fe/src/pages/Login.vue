<template>
  <section class="hero is-warning is-large" style="min-height: calc(100vh - 76px); display: flex; align-items: center; justify-content: center;">
    <div class="hero-body" style="width: 100%; padding: 2rem 1.5rem;">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <h2 class="title has-text-centered mb-5" style="font-weight: 800; font-size: 2rem; color: #0f172a;">PyBoard 로그인</h2>
            <form @submit.prevent="handleSubmit" class="box">
              <div class="field mb-4">
                <label class="label">아이디</label>
                <div class="control has-icons-left">
                  <input
                    type="text"
                    placeholder="아이디를 입력하세요."
                    class="input"
                    name="username"
                    v-model="username"
                    required
                  />
                  <span class="icon is-small is-left" style="color: #94a3b8;">
                    <FontAwesomeIcon :icon="faUser" />
                  </span>
                </div>
              </div>
              <div class="field mb-5">
                <label class="label">패스워드</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    class="input"
                    name="password"
                    v-model="password"
                    required
                  />
                  <span class="icon is-small is-left" style="color: #94a3b8;">
                    <FontAwesomeIcon :icon="faLock" />
                  </span>
                </div>
              </div>
              <div class="field">
                <button class="button is-primary is-fullwidth" type="submit" style="border-radius: 10px; font-weight: 600; font-size: 1rem; height: 3rem;">
                  로그인
                </button>
              </div>
              <div class="has-text-centered mt-4">
                <router-link class="is-link" to="/register" style="color: #6366f1; font-weight: 600; font-size: 0.9rem;">
                  아직 계정이 없으신가요? 회원가입
                </router-link>
              </div>
            </form>
            <div class="content tcentered my-4" style="color: #64748b; font-size: 0.875rem;">
              <strong>또는</strong>
            </div>
            <div class="buttons is-centered">
              <button class="button is-white" style="border: 1px solid #e2e8f0; border-radius: 10px; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span class="icon" style="color: #24292e;">
                  <FontAwesomeIcon :icon="faGithub" />
                </span>
                <span>Github 로그인</span>
              </button>
              <button class="button is-info" style="background-color: #1877f2; border-color: transparent; border-radius: 10px; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <span class="icon">
                  <FontAwesomeIcon :icon="faFacebook" />
                </span>
                <span>Facebook 로그인</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub } from "@fortawesome/free-brands-svg-icons";

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['doLogin']);
const router = useRouter();

const username = ref("");
const password = ref("");

console.log("[Login.vue] Constructor");

const handleSubmit = () => {
  console.log("[Login.vue] handleSubmit");
  axios
    .post("http://localhost:8080/api/users/signin/", {
      Username: username.value,
      Password: password.value,
    })
    .then((response) => {
      if (response.status < 300) {
        console.log("[Login.vue] Call props.doLogin");
        emit('doLogin');
        localStorage.setItem("token", response.data["token"]);
        localStorage.setItem("userId", response.data["UserID"]);
        localStorage.setItem("username", username.value);
        console.log(response.data);
        router.push("/");
      }
    });
};
</script>
