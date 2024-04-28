<script setup lang="ts">
import { useOg } from "~/composables/states/stepStates";
import PreviewSelector from "./PreviewSelector.vue";
const ogState = useOg();
</script>
<template>
  <div v-if="ogState.title === ''" class="mt-3">
    The preview is empty. Let’s make it quickly!
  </div>
  <div v-else>
    <PreviewSelector :og="ogState" />
  </div>
</template>

<style lang="scss" scoped>
.con {
  background-color: var(--bg) !important;
  font-size: 0.875em;
  font-weight: 400;
}
</style>
