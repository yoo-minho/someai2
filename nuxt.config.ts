import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-og-image",
    "nuxt-icon",
    "@nuxt/ui",
    "@unocss/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
  ],
  ogImage: {
    defaults: { component: "OgImage" },
    fonts: ["Noto+Sans+KR:400", "Noto+Sans+KR:700", "Noto+Sans+KR:900"],
  },
  colorMode: {
    preference: "dark",
    fallback: "dark",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },
  unocss: {
    presets: [
      presetUno(),
      presetWebFonts({
        provider: "google",
        fonts: {
          noto: [
            { name: "Noto Sans KR", weights: ["400", "700", "900"] },
            { name: "sans-serif", provider: "none" },
          ],
        },
      }),
    ],
  },
  runtimeConfig: {
    hasNuxtIcon: true,
  },
});
