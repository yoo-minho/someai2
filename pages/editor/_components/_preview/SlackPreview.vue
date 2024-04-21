<script setup lang="ts">
import type { OgType } from "~/types/common";

defineProps<{ og: OgType; iframeUrl?: string }>();
</script>
<template>
  <div class="flex w-full p-3 bg-white gap-2" style="overflow-x: auto">
    <div>
      <UAvatar
        src="./avatar/butter.png"
        alt="Avatar"
        size="md"
        img-class="rounded-lg object-cover"
      />
    </div>
    <div>
      <div class="font-bold text-[15px] leading-[22px]">
        Stewart Butterfield
      </div>
      <div
        class="text-[15px] leading-[22px] mb-[4px]"
        style="color: rgb(18, 100, 163)"
      >
        {{ og.url }}
      </div>
      <div
        class="border-l-4 border-solid px-[12px] text-[15px] leading-[22px] flex flex-col gap-[2px]"
      >
        <div class="flex">
          <img
            v-if="og.favicon"
            :src="og.favicon"
            width="16"
            height="16"
            class="mr-[4px] object-contain"
          />
          <span class="font-bold">{{ og.name }}</span>
        </div>
        <div class="title font-bold">{{ og.title }}</div>
        <template
          v-if="og.twitterCard === 'summary_large_image' && og.thumbUrl"
        >
          <div>{{ og.desc }}</div>
          <div
            class="w-[360px] h-[189px] bg-cover bg-no-repeat bg-center mt-5px rounded-[8px]"
            :style="{ 'background-image': `url(${og.thumbUrl})` }"
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  color: rgb(18, 100, 163);
}
</style>
