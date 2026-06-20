<template>
  <div class="container">
    <div class="profile-card">
      <div class="profile-image-container">
        <template v-if="!isUpdate">
          <figure class="image is-128x128">
            <img
              :src="image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=256&auto=format&fit=crop&q=80'"
              alt="avatar"
            />
          </figure>
        </template>
        <template v-else>
          <div class="file has-name is-centered">
            <label class="file-label">
              <input
                class="file-input"
                type="file"
                name="image"
                @change="fileChangeHandler"
              />
              <span class="file-cta" style="border-radius: 10px 0 0 10px;">
                <span class="file-label">이미지 선택</span>
              </span>
              <span class="file-name" style="border-radius: 0 10px 10px 0;">{{ image || '선택된 파일 없음' }}</span>
            </label>
          </div>
        </template>
      </div>
      
      <div class="has-text-center">
        <template v-if="!isUpdate">
          <h1 class="title has-text-centered">
            {{ nickname || '사용자 이름' }}
          </h1>
          <p class="subtitle has-text-centered mb-4">
            {{ position || '개발자' }}
          </p>
          
          <div class="tags" style="justify-content: center;">
            <span
              v-for="(subject, index) in subjectsList"
              :key="index"
              class="tag"
            >
              #{{ subject }}
            </span>
          </div>
          
          <div style="display: flex; justify-content: center; margin-top: 1.5rem;">
            <button
              class="button is-primary px-5"
              style="border-radius: 9999px; font-weight: 600;"
              @click="updateClick"
            >
              프로필 수정하기
            </button>
          </div>
        </template>
        
        <template v-else>
          <div class="field">
            <label class="label">닉네임</label>
            <input
              class="input mb-3"
              type="text"
              name="nickname"
              v-model="nickname"
              placeholder="닉네임을 입력하세요."
            />
          </div>
          <div class="field">
            <label class="label">포지션</label>
            <input
              class="input mb-3"
              type="text"
              name="position"
              v-model="position"
              placeholder="포지션을 입력하세요. (예: iOS 앱)"
            />
          </div>
          <div class="field">
            <label class="label">관심 분야 (쉼표로 구분)</label>
            <input
              class="input mb-4"
              type="text"
              name="subjects"
              v-model="subjects"
              placeholder="관심 키워드를 입력하세요. (예: Swift, SwiftUI)"
            />
          </div>
          
          <div style="display: flex; justify-content: center; gap: 0.5rem;">
            <button
              class="button is-primary px-5"
              style="border-radius: 9999px; font-weight: 600;"
              @click="updateClick"
            >
              완료
            </button>
            <button
              class="button is-light px-5"
              style="border-radius: 9999px; font-weight: 600;"
              @click="isUpdate = false"
            >
              취소
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const props = defineProps({
  isLogin: {
    type: Boolean,
    required: true
  }
});

const router = useRouter();

const isUpdate = ref(false);
const nickname = ref("");
const position = ref("");
const subjects = ref("");
const image = ref("");
const new_image = ref(null);

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

const subjectsList = computed(() => {
  if (!subjects.value) return [];
  return subjects.value.split(", ");
});

const fileChangeHandler = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  if (file) {
    new_image.value = file;
    image.value = file.name;
  }
};

const updateClick = (event) => {
  event.preventDefault();
  if (isUpdate.value === true) {
    updateProfile();
  } else {
    isUpdate.value = !isUpdate.value;
  }
};

const updateProfile = () => {
  const token = localStorage.getItem("token");
  console.log("[*] updateProfile");
  const formData = new FormData();
  formData.append("image", new_image.value);
  formData.append("nickname", nickname.value);
  formData.append("position", position.value);
  formData.append("subjects", subjects.value);
  console.log(Array.from(formData.entries()));
  axios
    .patch("http://localhost:8000/users/profile/", formData, {
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": `Token ${token}`,
      },
    })
    .then((response) => {
      if (response.status < 300) {
        router.push("/");
      }
    });
};

const getProfile = () => {
  const token = localStorage.getItem("token");
  console.log("[*] getProfile");
  axios
    .get("http://localhost:8000/users/profile/", {
      headers: {
        "Authorization": `Token ${token}`,
      },
    })
    .then((response) => {
      if (response.status < 300) {
        nickname.value = response.data["nickname"] || "";
        position.value = response.data["position"] || "";
        subjects.value = response.data["subjects"] || "";
        image.value = response.data["image"] || "";
      }
    });
};

if (props.isLogin !== false) {
  getProfile();
}
</script>

<style scoped>
.mb-2 {
  margin-bottom: 0.5rem;
}
</style>
