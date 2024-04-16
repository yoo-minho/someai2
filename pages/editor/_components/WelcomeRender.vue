<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { ref } from "vue";
import { useOg, useBase } from "~/composables/states/stepStates";
import type { OgType } from "~/types/common";
import ColorModePicker from "~/components/ColorModelPicker/ColorModePicker.vue";

const schema = z.object({
  url: z.string().url(),
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

  if (error.value) {
    const toast = useToast();
    toast.add({ title: "유효하지 않은 링크입니다!" });
    return;
  }

  ogState.value = { ...data.value };
}
</script>
<template>
  <div class="m-3">
    <ColorModePicker />
    <h2 class="text-4xl font-bold text-primary-400 m-3 text-center">
      uglink.cc
    </h2>
    <UForm
      class="flex gap-3 text-2xl flex-col"
      :state="baseState"
      :schema="schema"
      @submit="onSubmit"
    >
      <UFormGroup name="url" class="flex-1 text-2xl">
        <UInput
          v-model="baseState.url"
          placeholder="Enrer Url"
          size="lg"
          :disabled="ogState.title?.length > 0"
        />
      </UFormGroup>
      <UButton
        v-if="ogState.title?.length === 0"
        type="submit"
        class="text-lg flex justify-center"
        :loading="previewLoading"
      >
        Search Preview
      </UButton>
    </UForm>
  </div>
</template>

<style lang="scss" scoped></style>
