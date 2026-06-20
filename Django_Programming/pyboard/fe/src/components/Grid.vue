<template>
  <div v-if="posts" class="columns is-multiline">
    <Card v-for="(post, index) in posts" :key="index" :post="post" />
  </div>
  <div v-else></div>
</template>

<script setup>
import { watch } from 'vue';
import Card from "./Card.vue";

const props = defineProps({
  posts: {
    type: Array,
    default: null
  }
});

console.log("[*] Grid render");
console.log(props.posts);

watch(() => props.posts, (newPosts) => {
  console.log("[*] Grid posts changed:", newPosts);
}, { immediate: true });
</script>
