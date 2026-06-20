<template>
  <div class="column is-one-quarter-desktop is-one-third-tablet is-full-mobile">
    <div class="card">
      <router-link
        :to="{
          name: 'Detail',
          params: { pk: post.ID },
          state: { post: post }
        }"
      >
        <div class="card-image">
          <figure class="image is-16by9">
            <img
              :src="post.Image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60'"
              alt="sample"
            />
          </figure>
        </div>
        <div class="card-content">
          <div>
            <div class="tag-row mb-2">
              <span class="tag is-primary is-light">
                {{ post.Category || '일반' }}
              </span>
            </div>
            <h2 class="title">
              {{ post.Title }}
            </h2>
            <div class="subtitle">@{{ post.UserID || 'anonymous' }}</div>
            <div class="content preview">
              <p>{{ post.Content }}</p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.mb-2 {
  margin-bottom: 0.5rem;
}
.tag-row {
  display: flex;
  gap: 0.25rem;
}
.tag {
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
}
</style>
