<script setup lang="ts">
defineProps<{
  title?: string;
  question?: string;
  answer?: string;
  url?: string;
}>();
</script>
<template>
  <div class="w-full h-full flex flex-col justify-center">
    <div
      class="bg-cover bg-center h-full"
      :style="`background-image: url(${url});`"
    >
      <div class="absolute w-full h-full inset-0 bg-black opacity-70"></div>
      <div class="flex items-center justify-center text-white">
        <div class="w-full flex justify-between relative p-[60px]">
          <div class="relative">
            <div class="flex flex-row justify-between items-start">
              <div class="flex flex-col w-full max-w-[100%] font-noto">
                <h1 class="m-0 mb-[30px] text-[45px]">
                  {{ title }}
                </h1>
                <p class="text-[35px]" :class="['text-gray-300']">
                  Q. {{ question }}
                </p>
                <p class="text-[35px]" :class="['text-gray-300']">
                  A. {{ answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
