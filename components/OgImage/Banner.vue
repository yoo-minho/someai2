<script setup lang="ts">
const props = defineProps<{
  title: string;
  thumbUrl?: string;
  align?: string;
}>();

const squareAlign = {
  "arrow-up-left": "justify-start items-start",
  "arrow-up": "justify-center items-start",
  "arrow-up-right": "justify-end items-start",
  "arrow-left": "justify-start items-center",
  "arrows-out-cardinal": "justify-center items-center",
  "arrow-right": "justify-end items-center",
  "arrow-down-left": "justify-start items-end",
  "arrow-down": "justify-center items-end",
  "arrow-down-right": "justify-end items-end",
};

const _thumbUrl = props.thumbUrl || "/theme/meadow.png";
const _className = squareAlign[props.align];
console.log({ props, _className });
</script>
<template>
  <div class="w-full h-full">
    <img v-if="_thumbUrl" class="absolute w-full h-full" style="object-fit: cover" :src="_thumbUrl" />
    <div :class="`relative w-full h-full flex ${_className}`" style="padding: 64px">
      <span
        class="relative"
        style="
          font-size: 80px;
          font-family: 'Noto Sans KR';
          word-break: break-word;
          text-align: center;
          color: white;
          background: linear-gradient(to right, rgba(255, 0, 0, 0.5), rgba(0, 123, 255, 0.5));
          font-weight: 900;
          padding: 0 32px;
          letter-spacing: -4px;
        "
      >
        {{ title }}
      </span>
    </div>
  </div>
</template>
