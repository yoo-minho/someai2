// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: "@nuxt-themes/alpine",
  modules: ["nuxt-og-image", "nuxt-icon"],
  ogImage: {
    defaults: { component: "OgImage" },
    fonts: ["Noto+Sans+KR:400", "Noto+Sans+KR:700"],
  },
  runtimeConfig: {
    hasNuxtIcon: true,
  },
});
