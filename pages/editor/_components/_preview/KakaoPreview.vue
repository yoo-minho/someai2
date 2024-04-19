<script setup lang="ts">
import type { OgType } from "~/types/common";

defineProps<{ og: OgType; iframeUrl?: string }>();
</script>
<template>
  <div class="w-[400px] rounded-[8px]">
    <template v-if="og.thumbUrl?.length > 0">
      <div
        class="w-full h-[200px] bg-cover bg-no-repeat bg-center rounded-t-[8px]"
        :style="{ 'background-image': `url(${og.thumbUrl})` }"
      >
        <iframe
          v-if="iframeUrl"
          id="player"
          type="text/html"
          width="400"
          height="200"
          class="rounded-t-[8px]"
          :src="iframeUrl"
          frameborder="0"
        ></iframe>
      </div>
    </template>
    <div
      class="px-3 py-2 tracking-[-.2px] leading-[24px] bg-white rounded-b-[8px]"
    >
      <p class="text-sm" style="color: #111">{{ og.title }}</p>
      <p
        class="text-[13px] text-ellipsis overflow-hidden whitespace-nowrap mt-[-4px]"
        style="color: #707070"
      >
        {{ og.desc }}
      </p>
      <p class="text-xs" style="color: #aaa">{{ og.domain }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
