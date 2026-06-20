<template>
  <div>
    <Header @doLogout="doLogout" :isLogin="isLogin" />
    <div class="centered" v-if="isMenuRoute">
      <Menu />
    </div>
    <div class="ncentered" v-if="isMainLikeMyRoute">
      <router-view :isLogin="isLogin" @doLogin="doLogin" />
    </div>
    <div class="ncentered" v-if="isDetailNewProfileRoute">
      <router-view :isLogin="isLogin" @doLogin="doLogin" />
    </div>
    <div v-if="isLoginRegisterRoute">
      <router-view :isLogin="isLogin" @doLogin="doLogin" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import Menu from '../components/Menu.vue';
import './App.scss';

const route = useRoute();

const token = localStorage.getItem("token");
// eslint-disable-next-line
const isLogin = ref(token !== "null" && token !== null);

console.log("[App.vue] token: ", token);
console.log("[App.vue] isLogin: ", isLogin.value);

const doLogin = () => {
  console.log("[App.vue] doLogin");
  isLogin.value = true;
  console.log("[App.vue] isLogin after doLogin: ", isLogin.value);
};

const doLogout = () => {
  console.log("[App.vue] doLogout");
  isLogin.value = false;
  console.log("[App.vue] isLogin after doLogout: ", isLogin.value);
};

// Computed properties to match React Router conditions
const isMenuRoute = computed(() => {
  return ['/', '/like', '/my'].includes(route.path);
});

const isMainLikeMyRoute = computed(() => {
  return ['/', '/like', '/my'].includes(route.path);
});

const isDetailNewProfileRoute = computed(() => {
  return route.path.startsWith('/detail/') || route.path === '/new' || route.path === '/profile';
});

const isLoginRegisterRoute = computed(() => {
  return route.path === '/login' || route.path === '/register';
});
</script>
