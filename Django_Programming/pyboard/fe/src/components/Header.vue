<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <span class="icon is-medium mr-2" style="color: #6366f1;">
          <FontAwesomeIcon :icon="faClipboard" size="lg" />
        </span>
        <h1>PyBoard</h1>
      </router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <router-link class="button is-light" to="/new" style="border: 1px solid #e2e8f0;">
            <span class="icon" style="color: #6366f1;">
              <FontAwesomeIcon :icon="faPlus" />
            </span>
            <span>
              새 글 작성
            </span>
          </router-link>
        </div>
      </div>
      <div class="navbar-item">
        <div class="buttons">
          <template v-if="isLogin">
            <router-link
              class="button is-primary"
              to="/"
              @click="handleLogout"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="faSignOutAlt" />
              </span>
              <span>
                로그아웃
              </span>
            </router-link>
          </template>
          <template v-else>
            <router-link class="button is-primary" to="/login">
              <span class="icon">
                <FontAwesomeIcon :icon="faSignInAlt" />
              </span>
              <span>
                로그인
              </span>
            </router-link>
          </template>
        </div>
      </div>
      <div class="navbar-item">
        <div class="buttons">
          <router-link class="button is-info" to="/profile">
            <span class="icon">
              <FontAwesomeIcon :icon="faUserCircle" />
            </span>
            <span>
              프로필
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faSignInAlt, faSignOutAlt, faPlus, faClipboard } from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['doLogout']);

const handleLogout = () => {
  console.log("[Header.vue] handleLogout");
  localStorage.setItem("token", null);
  localStorage.setItem("username", null);
  console.log("[Header.vue] Call doLogout");
  emit('doLogout');
};
</script>

<style scoped>
.mr-2 {
  margin-right: 0.5rem;
}
</style>
