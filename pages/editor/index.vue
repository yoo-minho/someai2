<script setup lang="ts">
import { useBase } from "@/composables/states/stepStates";

import WelcomeRender from "./components/WelcomeRender.vue";
import PreviewRender from "./components/PreviewRender.vue";
import StylingRender from "./components/StylingRender.vue";
import SettingRender from "./components/SettingRender.vue";

const baseState = useBase();
</script>
<template>
  <div>
    <WelcomeRender v-if="baseState.step === 'Welcome'" />
    <PreviewRender v-if="baseState.step === 'Preview'" />
    <StylingRender v-if="baseState.step === 'Styling'" />
    <SettingRender v-if="baseState.step === 'Submit'" />
  </div>
</template>
