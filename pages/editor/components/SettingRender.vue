<script setup lang="ts">
import { z } from "zod";
import { useBase, useOg } from "@/composables/states/stepStates";
import PreviewSelector from "./PreviewSelector.vue";

const baseState = useBase();
const ogState = useOg();
const urlPath = ref("random");
const ogNewState = useOg("new");
ogNewState.value.url = 'https://ugurl.cc/adw';

const schema = z.object({
  headline: z.string(),
  title: z.string(),
  desc: z.string(),
  thumbUrl: z.string(),
});
type Schema = z.output<typeof schema>;
</script>
<template>
  <PreviewSelector :og="ogNewState" />
</template>

<style lang="scss" scoped>
* {}
</style>
