<template>
  <section
    class="hero is-warning is-large"
    style="
      min-height: calc(100vh - 76px);
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <div class="hero-body" style="width: 100%; padding: 2rem 1.5rem">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-6-tablet is-5-desktop is-4-widescreen">
            <h2
              class="title has-text-centered mb-5"
              style="font-weight: 800; font-size: 2rem; color: #0f172a"
            >
              PyBoard 회원가입
            </h2>
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
                  <span class="icon is-small is-left" style="color: #94a3b8">
                    <FontAwesomeIcon :icon="faUser" />
                  </span>
                </div>
              </div>
              <div class="field mb-4">
                <label class="label">이메일</label>
                <div class="control has-icons-left">
                  <input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    class="input"
                    name="email"
                    v-model="email"
                    required
                  />
                  <span class="icon is-small is-left" style="color: #94a3b8">
                    <FontAwesomeIcon :icon="faEnvelope" />
                  </span>
                </div>
              </div>
              <div class="field mb-4">
                <label class="label">비밀번호</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    class="input"
                    name="password"
                    v-model="password"
                    required
                  />
                  <span class="icon is-small is-left" style="color: #94a3b8">
                    <FontAwesomeIcon :icon="faLock" />
                  </span>
                </div>
              </div>
              <div class="field mb-5">
                <label class="label">비밀번호 확인</label>
                <div class="control has-icons-left">
                  <input
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요."
                    class="input"
                    name="password2"
                    v-model="password2"
                    required
                  />
                  <span class="icon is-small is-left" style="color: #94a3b8">
                    <FontAwesomeIcon :icon="faLock" />
                  </span>
                </div>
              </div>
              <div class="field mt-5">
                <button
                  class="button is-primary is-fullwidth"
                  type="submit"
                  style="
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 1rem;
                    height: 3rem;
                  "
                >
                  회원가입 완료
                </button>
              </div>
              <div class="has-text-centered mt-4">
                <router-link
                  class="is-link"
                  to="/login"
                  style="color: #6366f1; font-weight: 600; font-size: 0.9rem"
                >
                  이미 계정이 있으신가요? 로그인하기
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const router = useRouter();

const username = ref("");
const email = ref("");
const password = ref("");
const password2 = ref("");

const handleSubmit = () => {
  axios
    .post("http://localhost:8000/users/register/", {
      username: username.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    })
    .then((response) => {
      console.log(response.data);
      router.push("/login");
    });
};
</script>
