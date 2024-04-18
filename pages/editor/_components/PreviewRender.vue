<script setup lang="ts">
import { useBase, useOg } from "~/composables/states/stepStates";
import type { AppType } from "~/types/common";
import KakaoPreview from "./_preview/KakaoPreview.vue";
import FacebookPreview from "./_preview/FacebookPreview.vue";
import SlackPreview from "./_preview/SlackPreview.vue";

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
    <div v-else>
      <div class="my-3 w-full">
        <div
          class="flex items-center gap-1 border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md overflow-hidden p-2"
        >
          <template v-for="appId in ['KakaoTalk', 'Facebook', 'Slack']">
            <UButton
              size="xs"
              :variant="baseState.app === appId ? 'solid' : 'ghost'"
              :label="appId"
              color="gray"
              class="font-light"
              @click="clickApp(appId as AppType)"
            />
          </template>
        </div>
        <div
          class="con flex items-center gap-1 border border-gray-200 dark:border-gray-700 rounded-b-md overflow-hidden p-3"
        >
          <KakaoPreview v-if="baseState.app === 'KakaoTalk'" :og="ogState" />
          <FacebookPreview v-if="baseState.app === 'Facebook'" :og="ogState" />
          <SlackPreview v-if="baseState.app === 'Slack'" :og="ogState" />
        </div>
      </div>
      <template v-if="!baseState.isMakeUp">
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

<style lang="scss" scoped>
.con {
  background-color: var(--bg-secondary) !important;
  font-size: 0.875em;
  font-weight: 400;
}
</style>
