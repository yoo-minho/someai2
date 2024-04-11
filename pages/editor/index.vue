<script setup lang="ts">
import WelcomeRender from "./_components/WelcomeRender.vue";
import PreviewRender from "./_components/PreviewRender.vue";
import MakeUpRender from "./_components/MakeUpRender.vue";
</script>

<template>
  <WelcomeRender />
  <PreviewRender />
  <MakeUpRender />
  <!--
    <UForm
      :schema="schema2"
      :state="state"
      class="flex gap-3 text-2xl"
      @submit="onSubmit2"
    >
      <UFormGroup name="url" class="flex-1 text-2xl">
        <UInput v-model="state2.newUrl" placeholder="Enrer Url" size="lg" />
      </UFormGroup>
      <UButton type="submit" class="text-lg"> Copy </UButton>
    </UForm> -->
</template>
