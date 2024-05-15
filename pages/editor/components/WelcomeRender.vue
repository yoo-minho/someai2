<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { ref } from "vue";
import { useOg, useBase } from "~/composables/states/stepStates";
import type { OgType } from "~/types/common";
import LandingHero from "~/components/LandingHero.vue";

const schema = z.object({
  url: z.string().url("Give Me The URL!"),
});

type Schema = z.output<typeof schema>;
const baseState = useBase();
const ogState = useOg();
const previewLoading = ref(false);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  previewLoading.value = true;
  const { url } = event.data;
  await new Promise((res) => setTimeout(res, 2000));
  const { data, error } = await useFetch<OgType>("/api/scrap", {
    method: "POST",
    body: { url },
  });
  previewLoading.value = false;
  baseState.value.step = "Preview";

  if (error.value) {
    const toast = useToast();
    toast.add({ title: "유효하지 않은 링크입니다!" });
    return;
  }

  ogState.value = { ...data.value };
}
</script>
<template>
  <div>
    <LandingHero />
    <UForm
      class="flex gap-3 text-2xl flex-col items-center"
      :state="baseState"
      :schema="schema"
      @submit="onSubmit"
    >
      <UFormGroup name="url" class="text-2xl w-full">
        <UInput v-model="baseState.url" placeholder="Enrer Url" size="lg" />
      </UFormGroup>
      <UButton
        type="submit"
        leadingIcon="i-heroicons-magnifying-glass"
        class="text-base flex justify-center w-full font-light"
        :loading="previewLoading"
        loading-icon="i-heroicons-globe-asia-australia"
      >
        Search Preview
      </UButton>
    </UForm>
  </div>
</template>

<style lang="scss" scoped></style>
