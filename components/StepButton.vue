<script setup lang="ts">
import ColorModePicker from "./ColorModelPicker/ColorModePicker.vue";
</script>

<template>
    <div class="w-full flex gap-2 mt-2">
        <a href="/docs/guide/directory-structure/content"
            class="flex-1 block px-6 py-8 border not-prose rounded-lg border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group">
            <div
                class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50">
                <span
                    class="i-heroicons-arrow-small-left-solid w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary"></span>
            </div>
            <p class="font-medium text-gray-900 dark:text-white text-[15px] mb-1">content</p>
        </a>
        <a href="/docs/guide/directory-structure/middleware"
            class="flex-1 block px-6 py-8 border not-prose rounded-lg border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 group text-right">
            <div
                class="inline-flex items-center rounded-full p-1.5 bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 ring-1 ring-gray-300 dark:ring-gray-700 mb-4 group-hover:ring-primary/50">
                <span
                    class="i-heroicons-arrow-small-right-solid w-5 h-5 text-gray-900 dark:text-white group-hover:text-primary"></span>
            </div>
            <p class="font-medium text-gray-900 dark:text-white text-[15px] mb-1">middleware</p>
        </a>
    </div>
</template>
<style></style>
