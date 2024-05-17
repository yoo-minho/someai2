import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-og-image",
    "nuxt-icon",
    "@nuxt/ui",
    // "@unocss/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],
  colorMode: {
    preference: "dark",
    classSuffix: "",
  },
  ogImage: {
    defaults: { component: "OgImage" },
    fonts: ["Noto+Sans+KR:400", "Noto+Sans+KR:500", "Noto+Sans+KR:700", "Noto+Sans+KR:900"],
  },
  runtimeConfig: {
    hasNuxtIcon: true,
  },
});
