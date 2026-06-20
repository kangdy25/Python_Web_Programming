<template>
  <article class="post-detail-container">
    <div class="head">
      <div class="tag-row mb-3">
        <span class="tag is-primary is-light">
          {{ post?.Category || '일반' }}
        </span>
      </div>
      <h1 class="title">{{ post?.Title }}</h1>
      <div class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <h2 class="subtitle">@{{ post?.UserID || 'TaeBbong' }}</h2>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span class="icon is-clickable-heart" @click="toggleLike">
              <FontAwesomeIcon :icon="isLiked ? faHeartSolid : faHeartRegular" :style="{ color: isLiked ? '#f43f5e' : '' }" />
            </span>
          </div>
          <div class="level-item">
            <span class="icon is-clickable-share" @click="sharePost">
              <FontAwesomeIcon :icon="faShareAlt" />
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="my-body">
      <div class="image">
        <img
          :src="post?.Image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80'"
          alt="post image"
        />
      </div>
      <div class="content">
        <p>
          {{ post?.Content || defaultContent }}
        </p>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid, faShareAlt } from "@fortawesome/free-solid-svg-icons";

const props = defineProps({
  post: {
    type: Object,
    default: () => ({})
  }
});

const isLiked = ref(false);
const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

const sharePost = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 클립보드에 복사되었습니다!");
  } else {
    alert("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
  }
};

const defaultContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
</script>

<style scoped>
.mb-3 {
  margin-bottom: 0.75rem;
}
.tag {
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 6px;
}
.is-clickable-heart:hover {
  color: #f43f5e;
  transform: scale(1.15);
  transition: all 0.2s ease;
}
.is-clickable-share:hover {
  color: #0ea5e9;
  transform: scale(1.15);
  transition: all 0.2s ease;
}
.icon {
  cursor: pointer;
  transition: all 0.2s ease;
}
</style>
