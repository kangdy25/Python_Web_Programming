<template>
  <div>
    <Grid :posts="posts" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Grid from "../components/Grid.vue";

const posts = ref(null);

const getPosts = () => {
  console.log("[*] getPosts");
  axios.get("http://localhost:8000/posts/").then((response) => {
    if (response.status < 300) {
      console.log(response.data);
      posts.value = response.data;
    }
  });
};

console.log("[*] Main render");
getPosts();
</script>
