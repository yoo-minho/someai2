<script lang="ts" setup>
import Reload from "@/components/OgImage/Reload.vue";

const route = useRoute();

const { title, desc, url, image } = await callClaude();

console.log("created");

useSeoMeta({
  title: title,
  description: desc,
  ogTitle: title,
  ogDescription: desc,
  ogUrl: url,
  ogImage: image,
  twitterTitle: title,
  twitterDescription: desc,
  twitterImage: image,
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});

defineOgImageComponent("Reload", {
  title: title,
  question: '',
  answer: desc,
  url: image,
});
</script>
<template>
  <div class="w-full h-full flex justify-center fixed">
    <div style="width: 1200px; height: 600px; position: relative">
      <Reload :title="title" :description="desc" :url="image" />
    </div>
  </div>
</template>
