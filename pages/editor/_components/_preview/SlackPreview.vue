<script setup lang="ts">
import type { OgType } from "~/types/common";

defineProps<{ og: OgType; iframeUrl?: string }>();
</script>
<template>
  <div
    class="wrap w-360px border-l-4px border-solid px-12px text-15px leading-22px"
  >
    <div class="flex">
      <img
        v-if="og.favicon"
        :src="og.favicon"
        width="16"
        height="16"
        class="mr-8px mb-3px object-contain"
      />
      <span class="font-bolder">{{ og.name }}</span>
    </div>
    <div class="title font-bold">{{ og.title }}</div>
    <template v-if="og.twitterCard === 'summary_large_image' && og.thumbUrl">
      <div>{{ og.desc }}</div>
      <div
        class="w-360px h-189px bg-cover bg-no-repeat bg-center mt-5px rounded-8px"
        :style="{
          'background-image': `url(${og.thumbUrl})`,
          'box-shadow': 'inset 0 0 0 1px #0000001a',
        }"
      >
        <iframe
          v-if="iframeUrl"
          id="player"
          type="text/html"
          width="360"
          height="189"
          class="rounded-8px"
          :src="iframeUrl"
          frameborder="0"
        ></iframe>
      </div>
    </template>
    <template v-else>
      <div>{{ og.desc }}</div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.wrap {
  border-color: rgb(221, 221, 221);
  color: rgb(29, 28, 29);
}

.title {
  color: rgb(18, 100, 163);
}
</style>
