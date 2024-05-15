<script setup lang="ts">
import { z } from "zod";
import { useBase, useOg } from "@/composables/states/stepStates";
import type { FormSubmitEvent } from "#ui/types";
import PreviewSelector from "./PreviewSelector.vue";

const baseState = useBase();
const ogState = useOg();
const headline = ref("No Title");
const ogNewState = useOg("new");

const schema = z.object({
  headline: z.string(),
  title: z.string(),
  desc: z.string(),
  thumbUrl: z.string(),
});
type Schema = z.output<typeof schema>;

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log("event.data", event.data);
};

const changeColor = (color: string) => {
  if (color === "none") {
    ogNewState.value.thumbUrl = ogState.value.thumbUrl;
  } else {
    ogNewState.value.thumbUrl = `http://localhost:3000/theme/${color}.png`;
  }
};

watch(
  [() => headline.value, () => ogNewState.value.thumbUrl],
  () => {
    const query = {
      title: headline.value,
      thumbUrl: ogNewState.value.thumbUrl,
      app: baseState.value.app,
    };
    ogNewState.value.newThumbUrl = `/__og-image__/image/makeup/og.png?_query={${encodeURIComponent(
      JSON.stringify(query).replace(/\{|\}/g, "")
    )}}`;
  },
  { immediate: true }
);

const bgItems = [
  { value: "img", label: "ImageUrl" },
  { value: "color", label: "GradientColor" },
];
const bgSelected = ref("img");
const onBgChange = (index: number) => {
  const item = bgItems[index];
  bgSelected.value = item.value;
  if (item.value === "img") {
    ogNewState.value.thumbUrl = ogState.value.thumbUrl;
  }
};

const moveConfirmPreview = () => {
  baseState.value.step = "Preview";
};

const moveSubmit = () => {
  baseState.value.step = "Submit";
};
</script>
<template>
  <PreviewSelector :og="ogNewState" />
  <UForm
    :schema="schema"
    :state="{ ...ogNewState, headline }"
    class="text-2xl mt-3 flex-col flex gap-3"
    @submit="onSubmit"
  >
    <UFormGroup label="Headline" name="headline">
      <UInput v-model="headline" placeholder="Enrer Headline" size="lg" />
    </UFormGroup>
    <UFormGroup label="Title" name="title">
      <UInput v-model="ogNewState.title" placeholder="Enrer New Title" size="lg" />
    </UFormGroup>
    <UFormGroup label="Description" name="desc">
      <UTextarea v-model="ogNewState.desc" color="white" :row="2" variant="outline" placeholder="Enrer New Desc" />
    </UFormGroup>
    <UFormGroup label="Background" name="thumbUrl">
      <UTabs :items="bgItems" :default-index="0" @change="onBgChange" />
      <UInput v-if="bgSelected === 'img'" v-model="ogNewState.thumbUrl" placeholder="Enrer thumbUrl" size="lg" />
      <BgSelectMenu v-if="bgSelected === 'color'" @change-color="changeColor" />
    </UFormGroup>
  </UForm>
  <div class="flex justify-center gap-3 mt-3">
    <UButton color="black" leadingIcon="i-heroicons-arrow-small-left-solid" @click="moveConfirmPreview()" />
    <UButton
      color="black"
      class="flex-1 justify-end"
      trailingIcon="i-heroicons-arrow-small-right-solid"
      @click="moveSubmit()"
    >
      Done
    </UButton>
  </div>
</template>

<style lang="scss" scoped>
* {
}
</style>
