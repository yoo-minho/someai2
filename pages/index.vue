<script lang="ts" setup>
useSeoMeta({
  title: "About page",
  description: "This is the about page. It uses the same template.",
});
defineOgImageComponent("NuxtSeo", {
  title: "Welcome to Nuxt OG Image",
  description: "You can modify the og:image by changing these props.",
  icon: "carbon:help",
  colorMode: "dark",
});
</script>
<template>
  <div>BlogPost2</div>
</template>
