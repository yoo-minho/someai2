<script setup lang="ts">
const emit = defineEmits<{
  (e: "change-color", color: string): void;
}>();

const color = [
  {
    id: "none",
    label: "none",
    bg: "rgba(0,0,0,0.2)",
  },
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
  {
    id: "candy",
    label: "candy",
    bg: "linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))",
  },
  {
    id: "crimson",
    label: "crimson",
    bg: "linear-gradient(140deg, rgb(255, 99, 99), rgb(115, 52, 52))",
  },
  {
    id: "falcon",
    label: "falcon",
    bg: "linear-gradient(140deg, rgb(189, 227, 236), rgb(54, 54, 84))",
  },
  {
    id: "meadow",
    label: "meadow",
    bg: "linear-gradient(140deg, rgb(89, 212, 153), rgb(160, 135, 45))",
  },
  {
    id: "midnight",
    label: "midnight",
    bg: "linear-gradient(140deg, rgb(76, 200, 200), rgb(32, 32, 51))",
  },
  {
    id: "raindrop",
    label: "raindrop",
    bg: "linear-gradient(140deg, rgb(142, 199, 251), rgb(28, 85, 170))",
  },
  {
    id: "sunset",
    label: "sunset",
    bg: "linear-gradient(140deg, rgb(255, 207, 115), rgb(255, 122, 47))",
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
