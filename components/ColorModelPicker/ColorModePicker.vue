<script setup lang="ts">
import IconDark from "./IconDark.vue";
import IconLight from "./IconLight.vue";
import IconSystem from "./IconSystem.vue";
</script>

<template>
  <div>
    <ul>
      <li
        v-for="color of ['system', 'light', 'dark']"
        :key="color"
        :class="{
          preferred: !$colorMode.unknown && color === $colorMode.preference,
          selected: !$colorMode.unknown && color === $colorMode.value,
        }"
      >
        <IconSystem
          v-if="color === 'system'"
          @click="$colorMode.preference = color"
        />
        <IconDark
          v-if="color === 'dark'"
          @click="$colorMode.preference = color"
        />
        <IconLight
          v-if="color === 'light'"
          @click="$colorMode.preference = color"
        />
      </li>
    </ul>
  </div>
</template>
<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 6px;
  justify-content: center;
}
ul li svg {
  height: 36px;
  width: 36px;
}
.feather {
  position: relative;
  top: 0px;
  cursor: pointer;
  padding: 7px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  margin: 0;
  border-radius: 5px;
  transition: all 0.1s ease;
}
.feather:hover {
  top: -3px;
}
.preferred .feather {
  border-color: var(--color-primary);
  top: -3px;
}
.selected .feather {
  color: var(--color-primary);
}
</style>
