<script setup lang="ts">
import { useBase, useOg } from "@/composables/states/stepStates";
import type { AppType } from "@/types/common";
import KakaoPreview from "./_preview/KakaoPreview.vue";
import FacebookPreview from "./_preview/FacebookPreview.vue";
import SlackPreview from "./_preview/SlackPreview.vue";

defineProps<{ og: any, iframeUrl?: string }>();

const baseState = useBase();

const clickApp = (appId: AppType) => {
    baseState.value.app = appId;
};
</script>
<template>
    <div class="w-full">
        <div
            class="flex items-center gap-1 border border-gray-200 dark:border-gray-700 border-b-0 rounded-t-md overflow-hidden p-2">
            <template v-for="appId in ['KakaoTalk', 'Facebook', 'Slack']">
                <UButton size="xs" :variant="baseState.app === appId ? 'solid' : 'ghost'" :label="appId" color="gray"
                    class="font-light" @click="clickApp(appId as AppType)">
                    <template #leading>
                        <img :src="`/icon/${appId}.png`" width="20px" height="20px" />
                    </template>
                </UButton>
            </template>
        </div>
        <div
            class="con w-full flex item-center gap-1 border border-gray-200 dark:border-gray-700 rounded-b-md overflow-hidden">
            <KakaoPreview v-if="baseState.app === 'KakaoTalk'" :og="og" :iframe-url="iframeUrl"
                :step="baseState.step" />
            <FacebookPreview v-if="baseState.app === 'Facebook'" :og="og" :iframe-url="iframeUrl"
                :step="baseState.step" />
            <SlackPreview v-if="baseState.app === 'Slack'" :og="og" :iframe-url="iframeUrl" :step="baseState.step" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.con {
    background-color: var(--bg) !important;
    font-size: 0.875em;
    font-weight: 400;
}
</style>
