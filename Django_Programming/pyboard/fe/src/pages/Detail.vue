<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop is-10-tablet is-full-mobile">
        <Post :post="post" />
        <Comment />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import Post from '../components/Post.vue';
import Comment from '../components/Comment.vue';

const route = useRoute();
console.log(route.params);

// Access post passed via history state
const post = ref(history.state?.post || null);
</script>
