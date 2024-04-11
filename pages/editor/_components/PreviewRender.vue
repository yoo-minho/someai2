<script setup lang="ts">
import { useBase, useOg } from "~/composables/states/stepStates";
import type { AppType } from "~/types/common";
import KakaoPreview from "./KakaoPreview.vue";
import FacebookPreview from "./FacebookPreview.vue";
import SlackPreview from "./SlackPreview.vue";

const baseState = useBase();
const ogState = useOg();
const ogNewState = useOg("new");

const clickApp = (appId: AppType) => {
  baseState.value.app = appId;
};

const goMakeUp = () => {
  baseState.value.isMakeUp = true;
  ogNewState.value = { ...ogState.value };
};
</script>
<template>
  <template v-if="baseState.url !== '' && ogState.title !== ''">
    <div v-if="ogState.title === ''" class="mt-3">
      The preview is empty. Let’s make it quickly!
    </div>
    <div v-else class="mt-3">
      <UContainer class="mb-3 sm:p-0 p-0 flex gap-3 justify-center">
        <template v-for="appId in ['KakaoTalk', 'Facebook', 'Slack']">
          <UButton
            :label="appId"
            :color="baseState.app === appId ? 'primary' : 'gray'"
            @click="clickApp(appId as AppType)"
          />
        </template>
      </UContainer>
      <template v-if="!baseState.isMakeUp">
        <UContainer class="flex justify-center">
          <KakaoPreview v-if="baseState.app === 'KakaoTalk'" :og="ogState" />
          <FacebookPreview v-if="baseState.app === 'Facebook'" :og="ogState" />
          <SlackPreview v-if="baseState.app === 'Slack'" :og="ogState" />
        </UContainer>
        <UContainer class="flex justify-center my-3 sm:p-0">
          <UButton
            class="w-full"
            label="Go Make Up!"
            :color="'primary'"
            @click="goMakeUp()"
          />
        </UContainer>
      </template>
    </div>
  </template>
</template>

<style lang="scss" scoped></style>
