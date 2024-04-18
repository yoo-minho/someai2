<script setup lang="ts">
import IconDark from "./IconDark.vue";
import IconLight from "./IconLight.vue";
</script>
<template>
  <div class="color-button">
    <IconDark
      v-if="$colorMode.preference === 'dark'"
      @click="$colorMode.preference = 'light'"
    />
    <IconLight
      v-if="$colorMode.preference === 'light'"
      @click="$colorMode.preference = 'dark'"
    />
  </div>
</template>
<style scoped>
.color-button svg {
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
</style>
