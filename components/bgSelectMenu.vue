<script setup lang="ts">
const emit = defineEmits<{
  (e: "change-color", color: string): void;
}>();

const color = [
  {
    id: "mono",
    label: "mono",
    bg: "linear-gradient(140deg, rgb(51, 51, 51), rgb(24, 24, 24))",
  },
  {
    id: "breeze",
    label: "breeze",
    bg: "linear-gradient(140deg, rgb(207, 47, 152), rgb(106, 61, 236))",
  },
];

const selected = ref(color[0]);

watch(selected, () => {
  emit("change-color", selected.value.id);
});
</script>
<template>
  <USelectMenu v-model="selected" :options="color">
    <template #leading>
      <div
        class="flex-shrink-0 w-4 h-4 mt-px rounded-full"
        :style="{ background: selected.bg }"
      ></div>
    </template>
    <template #option="{ option }">
      <div
        class="flex-shrink-0 w-4 h-4 mt-px rounded-full"
        :style="{ background: option.bg }"
      ></div>
      <span class="truncate">{{ option.label }}</span>
    </template>
  </USelectMenu>
</template>

<style lang="scss" scoped></style>
