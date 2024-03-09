// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: "@nuxt-themes/alpine",
  modules: ["nuxt-og-image"],
  ogImage: {
    defaults: {
      component: "OgImage",
    },
  },
  content: {
    api: {
      baseURL: "/api/_my_content",
    },
  },
});
