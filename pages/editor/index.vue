<script setup lang="ts">
import { useBase } from "~/composables/states/stepStates";

import WelcomeRender from "./_components/WelcomeRender.vue";
import PreviewRender from "./_components/PreviewRender.vue";
import MakeUpRender from "./_components/MakeUpRender.vue";

const baseState = useBase();
</script>
<template>
  <div>
    <component :is="WelcomeRender"></component>
    <WelcomeRender />
    <PreviewRender />
    <MakeUpRender />
    <StepButton />
  </div>
</template>
