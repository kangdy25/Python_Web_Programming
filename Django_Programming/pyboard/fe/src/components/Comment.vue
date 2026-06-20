<template>
  <article class="comment-section-card">
    <div class="comment">
      <div class="field">
        <label class="label">댓글 작성</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="따뜻한 댓글을 남겨주세요."
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="has-text-right">
        <button class="button is-primary px-5" style="border-radius: 9999px; font-weight: 600;">
          등록하기
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
</script>

<style scoped>
.px-5 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
</style>
