<script setup lang="ts">
import { useBase, useOg } from "~/composables/states/stepStates";
import PreviewSelector from "./PreviewSelector.vue";

const baseState = useBase();
const ogState = useOg();
const ogNewState = useOg("new");

const rewriteUrl = () => {
  baseState.value.step = 'Welcome';
  ogState.value = {
    url: "",
    title: "",
    desc: "",
    thumbUrl: "",
    twitterCard: "",
    favicon: "",
    domain: "",
    name: ""
  };
};

const stylingUrl = () => {
  baseState.value.step = 'Styling';
  ogNewState.value = { ...ogState.value };
};
</script>
<template>
  <template v-if="baseState.url !== '' && ogState.title !== ''">
    <div v-if="ogState.title === ''" class="mt-3">
      The preview is empty. Let’s make it quickly!
    </div>
    <div v-else>
      <PreviewSelector :og="ogState" />
      <div class="flex justify-center gap-3 mt-3">
        <UButton class="flex-1" leadingIcon="i-heroicons-arrow-small-left-solid" @click="rewriteUrl()">
          Rewrite Url
        </UButton>
        <UButton class="flex-1 justify-end" trailingIcon="i-heroicons-arrow-small-right-solid" @click="stylingUrl()">
          Styling Preview
        </UButton>
      </div>
    </div>
  </template>
</template>

<style lang="scss" scoped>
.con {
  background-color: var(--bg) !important;
  font-size: 0.875em;
  font-weight: 400;
}
</style>
