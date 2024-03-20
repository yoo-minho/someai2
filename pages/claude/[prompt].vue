<script lang="ts" setup>
const route = useRoute();
const prompt = String(route.params.prompt);

const s = performance.now();
// const { title, desc, url, image } = await callClaude(prompt);

const baseImage =
  "https://techcrunch.com/wp-content/uploads/2023/04/anthropic-header.jpg?w=1200&crop=1";

const { title, desc, url, image } = {
  title: "제목",
  desc: "대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답대답 대답",
  url: "클릭",
  image: baseImage,
};

console.log("created", `${(performance.now() - s).toLocaleString()}ms`);

useSeoMeta({
  title: title,
  description: desc,
  ogTitle: title,
  ogDescription: desc,
  ogUrl: url,
  twitterTitle: title,
  twitterDescription: desc,
  twitterCard: "summary",
});

defineOgImageComponent("Reload", {
  title: title,
  question: prompt,
  answer: desc,
  url: image,
});

const ogImage = ref(baseImage);
onMounted(() => {
  ogImage.value = document
    .querySelector("meta[property='og:image']")
    .getAttribute("content");
});
</script>
<template>
  <div class="w-full h-full flex flex-col justify-center">
    <div>
      <div class="flex-1">
        <img :src="ogImage" width="600" height="300" />
      </div>
    </div>
    <div class="flex-1">어디를 가즈아</div>
    <div class="flex-1">어디를 가즈아</div>
  </div>
</template>
