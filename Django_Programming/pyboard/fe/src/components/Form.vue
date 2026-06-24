<template>
  <div>
    <div class="field">
      <label class="label">제목</label>
      <div class="control">
        <input
          class="input is-hovered"
          type="text"
          name="title"
          v-model="title"
        />
      </div>
    </div>

    <div class="field mb-4">
      <label class="label">카테고리</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="category" style="width: 100%">
            <option>웹 프론트엔드</option>
            <option>웹 백엔드</option>
            <option>iOS 앱</option>
            <option>안드로이드 앱</option>
            <option>하이브리드 앱</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field mb-5">
      <label class="label">본문</label>
      <div class="control">
        <textarea
          class="textarea"
          placeholder="나누고 싶은 이야기를 적어보세요."
          rows="8"
          name="body"
          v-model="body"
        ></textarea>
      </div>
    </div>

    <div class="field mb-5">
      <label class="label">배경사진</label>
      <div class="control">
        <div class="file has-name is-fullwidth">
          <label class="file-label" style="width: 100%">
            <input
              class="file-input"
              type="file"
              name="image"
              @change="fileChangeHandler"
            />
            <span
              class="file-cta"
              style="
                border-radius: 10px 0 0 10px;
                border-color: #e2e8f0;
                background-color: #f1f5f9;
              "
            >
              <span
                class="file-label"
                style="font-size: 0.85rem; font-weight: 600; color: #475569"
                >이미지 선택</span
              >
            </span>
            <span
              class="file-name"
              style="
                border-radius: 0 10px 10px 0;
                border-color: #e2e8f0;
                flex-grow: 1;
                max-width: none;
              "
              >{{ imageName || "선택된 파일 없음" }}</span
            >
          </label>
        </div>
      </div>
    </div>
    <div class="field is-grouped mt-5">
      <div class="control">
        <button
          class="button is-primary px-5"
          style="border-radius: 9999px; font-weight: 600"
          @click="postClick"
        >
          작성 완료
        </button>
      </div>
      <div class="control">
        <button
          class="button is-light px-5"
          style="border-radius: 9999px; font-weight: 600"
          @click="router.push('/')"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const title = ref("");
const category = ref("웹 프론트엔드");
const body = ref("");
const image = ref(null);
const imageName = ref("");

const fileChangeHandler = (event) => {
  event.preventDefault();
  const file = event.target.files[0];
  if (file) {
    image.value = file;
    imageName.value = file.name;
  }
};

const postClick = () => {
  const token = localStorage.getItem("token");
  console.log("[*] createPost");
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("category", category.value);
  formData.append("body", body.value);
  if (image.value) {
    formData.append("image", image.value);
  }
  console.log(Array.from(formData.entries()));

  axios
    .post("http://localhost:8000/posts/", formData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      if (response.status < 300) {
        router.push("/");
      }
    });
};
</script>
