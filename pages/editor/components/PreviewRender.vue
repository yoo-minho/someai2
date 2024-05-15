<script setup lang="ts">
import { useBase, useOg } from "~/composables/states/stepStates";
import PreviewSelector from "./PreviewSelector.vue";

const baseState = useBase();
const ogState = useOg();
const ogNewState = useOg("new");

const moverWriteUrl = () => {
  baseState.value.step = "Welcome";
  ogState.value = {
    url: "",
    title: "",
    desc: "",
    thumbUrl: "",
    newThumbUrl: "",
    twitterCard: "summary_large_image",
    favicon: "",
    domain: "",
    siteName: "",
  };
};

const moveStylingUrl = () => {
  baseState.value.step = "Styling";
  ogNewState.value = { ...ogState.value };
};
</script>
<template>
  <div v-if="ogState.title === ''" class="mt-3">The preview is empty. Let’s make it quickly!</div>
  <div v-else>
    <PreviewSelector :og="ogState" />
  </div>
  <div class="flex justify-center gap-3 mt-3">
    <UButton leadingIcon="i-heroicons-arrow-small-left-solid" color="black" @click="moverWriteUrl()" />
    <UButton
      class="flex-1 justify-end"
      color="black"
      trailingIcon="i-heroicons-arrow-small-right-solid"
      @click="moveStylingUrl()"
    >
      Prettier
    </UButton>
  </div>
</template>

<style lang="scss" scoped>
.con {
  background-color: var(--bg) !important;
  font-size: 0.875em;
  font-weight: 400;
}
</style>
