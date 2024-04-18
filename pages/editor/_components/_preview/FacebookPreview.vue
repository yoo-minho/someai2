<script setup lang="ts">
import type { OgType } from "~/types/common";

defineProps<{ og: OgType; iframeUrl?: string }>();
</script>
<template>
  <div
    class="w-400px border-0 bg-white box-content"
    style="border-color: #dadde1"
  >
    <div
      v-if="og.thumbUrl?.length > 0"
      class="w-full aspect-[1.91/1] bg-cover bg-no-repeat bg-center"
      :style="{ 'background-image': `url(${og.thumbUrl})` }"
    >
      <iframe
        v-if="iframeUrl"
        id="player"
        type="text/html"
        width="400"
        height="210"
        :src="iframeUrl"
        frameborder="0"
      ></iframe>
    </div>
    <div class="px-12px py-10px leading-20px">
      <div class="domain text-13px">{{ og.domain }}</div>
      <div class="title text-17px font-[600]">{{ og.title }}</div>
      <div
        class="desc text-15px font-[400] text-ellipsis overflow-hidden whitespace-nowrap"
      >
        {{ og.desc }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.title {
  color: rgb(5, 5, 5);
}
.domain {
  color: rgb(101, 103, 107);
  text-transform: uppercase;
}
.desc {
  color: rgb(101, 103, 107);
}
</style>
