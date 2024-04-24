<script setup lang="ts">
import type { OgType } from "~/types/common";

defineProps<{ og: OgType; iframeUrl?: string }>();
</script>
<template>
  <div
    class="flex w-full p-3 gap-3"
    style="background-color: #9bbbd4; overflow-x: auto"
  >
    <div>
      <UAvatar
        src="./avatar/ryan.png"
        alt="Avatar"
        size="md"
        img-class="rounded-lg object-cover"
      />
    </div>
    <div class="flex flex-col items-start">
      <div class="text-sm">Brian Kim</div>
      <div class="url message rounded-sm py-1 px-2 mb-2">
        {{ og.url }}
      </div>
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
.url {
  color: rgb(0, 100, 209);
  text-decoration: underline;
}
.message {
  background-color: white;
  position: relative;
  display: inline-block;
}

.message::after {
  content: "";
  box-sizing: content-box;
  position: absolute;
  width: 17.5px;
  height: 25px;
  border: 0 solid white;
  border-width: 0 20px;
  border-radius: 50%;
  clip: rect(0, 38px, 14px, 29px);
  display: block;
  z-index: 1;
  left: -37.5px;
  top: 5px;
}
</style>
