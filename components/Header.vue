<script setup lang="ts">
import ColorModePicker from "./ColorModelPicker/ColorModePicker.vue";
</script>

<template>
  <div
    class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-primary-200/75 dark:border-primary-900/50"
  >
    <div
      class="mx-auto px-4 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]"
    >
      <div
        class="flex items-end gap-2 font-bold text-xl text-gray-900 dark:text-white"
        @click="$router.replace('/')"
      >
        <div class="w-auto h-6">uglin</div>
        <UBadge
          label="v0.1.0"
          variant="subtle"
          size="xs"
          class="-mb-[2px] rounded font-semibold"
        />
      </div>
      <ColorModePicker />
    </div>
  </div>
</template>
<style></style>
