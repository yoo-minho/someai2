import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-og-image", "nuxt-icon", "@unocss/nuxt", "@nuxt/ui"],
  ogImage: {
    defaults: { component: "OgImage" },
    fonts: ["Noto+Sans+KR:400", "Noto+Sans+KR:700"],
  },
  unocss: {
    presets: [
      presetUno(),
      presetWebFonts({
        provider: "google",
        fonts: {
          noto: [
            { name: "Noto Sans KR", weights: ["400", "700"] },
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
