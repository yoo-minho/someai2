<script setup lang="ts">
import { useBase, useOg } from "@/composables/states/stepStates";
import PreviewSelector from "./PreviewSelector.vue";

const baseState = useBase();
const ogState = useOg();
const urlPath = ref(generateRandomString(6));
const ogNewState = useOg("new");

watch(
  urlPath,
  () => {
    ogNewState.value.url = `https://uglin.cc/${urlPath.value}`;
  },
  { immediate: true }
);

const moveStylingUrl = () => {
  baseState.value.step = "Styling";
  ogNewState.value.url = ogState.value.url;
};

const 퍼블리싱 = async () => {
  await useFetch("/api/link", {
    method: "POST",
    body: {
      ...ogNewState.value,
      path: urlPath.value,
      url: ogState.value.url,
      thumbUrl: ogNewState.value.newThumbUrl,
    },
  });
  navigateTo(urlPath.value + "/welcome");
};

function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
</script>
<template>
  <PreviewSelector :og="ogNewState" />
  <div class="flex pt-3 items-center gap-1">
    <span>https://uglin.cc/</span>
    <UInput v-model="urlPath" />
  </div>

  <div class="flex justify-center gap-3 mt-3">
    <UButton
      class="flex-1"
      leadingIcon="i-heroicons-arrow-small-left-solid"
      @click="moveStylingUrl()"
    >
      Styling Preview
    </UButton>
    <UButton
      class="flex-1 justify-end"
      trailingIcon="i-heroicons-arrow-small-right-solid"
      @click="퍼블리싱()"
    >
      배포하기
    </UButton>
  </div>
</template>

<style lang="scss" scoped>
* {
}
</style>
