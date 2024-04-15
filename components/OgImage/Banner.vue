<script setup lang="ts">
const props = defineProps<{
  title: string;
  thumbUrl?: string;
}>();

const thumbUrl = props.thumbUrl || "/theme/meadow.png";
</script>
<template>
  <div class="w-full h-full flex flex-col">
    <img
      v-if="thumbUrl"
      class="absolute w-full h-full"
      style="
        width: 100%; /* 배경 이미지를 포함하는 요소의 너비 */
        height: 100%; /* 배경 이미지를 포함하는 요소의 높이 */
        object-fit: cover; /* 배경 이미지를 화면에 맞게 조절 */
      "
      :src="thumbUrl"
    />
    <div
      class="w-full h-full flex justify-center items-center"
      :class="{ 'item-center': !props.thumbUrl, 'item-end': props.thumbUrl }"
    >
      <div class="relative h-100px">
        <div
          class="absolute w-full h-full"
          style="background-color: black; opacity: 0.8"
        ></div>
        <div
          :style="{ 'font-family': 'Noto Sans KR', 'word-break': 'break-word' }"
          class="relative tracking-tighter text-[64px] font-bold text-white px-40px"
        >
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>
