<script setup lang="ts">
import type { OgType } from "~/types/common";
import PreviewSelector from "./editor/components/PreviewSelector.vue";

const route = useRoute();
const path = route.params.slug[0];
const lastPath = route.params.slug[1]; //stat. edit

const { data: og } = await useFetch<OgType>(`/api/link/${path}`);
const { url, title, desc, thumbUrl, twitterCard, favicon, siteName } = og.value;

useHead({
  htmlAttrs: {
    lang: "ko",
  },
  link: [{ rel: "icon", href: favicon }],
  meta: [{ name: "og:site_name", content: siteName }],
  title,
});

useSeoMeta({
  title,
  description: desc,

  ogTitle: title,
  ogDescription: desc,
  ogImage: thumbUrl,
  ogUrl: url,

  twitterTitle: title,
  twitterDescription: desc,
  twitterCard,
  twitterImage: thumbUrl,
});

const count = ref(5);
onMounted(async () => {
  if (lastPath) return;
  await new Promise((res) => setTimeout(res, 1000));
  count.value = 4;
  await new Promise((res) => setTimeout(res, 1000));
  count.value = 3;
  await new Promise((res) => setTimeout(res, 1000));
  count.value = 2;
  await new Promise((res) => setTimeout(res, 1000));
  count.value = 1;
  await new Promise((res) => setTimeout(res, 1000));
  count.value = 0;
  navigateTo(url, { external: true });
});
</script>
<template>
  <div v-if="!lastPath">{{ count }}초 후 {{ url }}링크로 이동합니다.</div>
  <div v-if="lastPath === 'welcome'">달라진 링크를 마음껏 공유하세요!</div>
  <PreviewSelector :og="{ ...og, url: `https://uglin.cc/${path}` }" />
</template>

<style lang="scss" scoped></style>
