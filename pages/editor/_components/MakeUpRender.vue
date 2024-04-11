<script setup lang="ts">
import { z } from "zod";
import { useBase, useOg } from "~/composables/states/stepStates";
import KakaoPreview from "./KakaoPreview.vue";
import FacebookPreview from "./FacebookPreview.vue";
import SlackPreview from "./SlackPreview.vue";
import type { FormSubmitEvent } from "#ui/types";

const baseState = useBase();
const ogNewState = useOg("new");
const headline = ref("");
const iframeUrl = computed(() =>
  [
    `/makeup?title=${encodeURIComponent(headline.value)}`,
    `thumbUrl=${encodeURIComponent(ogNewState.value.thumbUrl)}`,
  ].join("&")
);

const schema = z.object({
  headline: z.string(),
  title: z.string(),
  desc: z.string(),
  thumbUrl: z.string().url("Invalid URL"),
});
type Schema = z.output<typeof schema>;

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  console.log("event.data", event.data);
};

const changeColor = (color: string) => {
  ogNewState.value.thumbUrl = `http://localhost:3000/theme/${color}.png`;
};
</script>
<template>
  <template v-if="baseState.isMakeUp">
    <UContainer class="flex justify-center">
      <KakaoPreview
        v-if="baseState.app === 'KakaoTalk'"
        :og="ogNewState"
        :iframe-url="iframeUrl"
      />
      <FacebookPreview
        v-if="baseState.app === 'Facebook'"
        :og="ogNewState"
        :iframe-url="iframeUrl"
      />
      <SlackPreview
        v-if="baseState.app === 'Slack'"
        :og="ogNewState"
        :iframe-url="iframeUrl"
      />
    </UContainer>
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
        <UInput
          v-model="ogNewState.title"
          placeholder="Enrer New Title"
          size="lg"
        />
      </UFormGroup>
      <UFormGroup label="Description" name="desc">
        <UInput
          v-model="ogNewState.desc"
          placeholder="Enrer New Desc"
          size="lg"
        />
      </UFormGroup>
      <UFormGroup label="ImageUrl" name="thumbUrl">
        <UInput
          v-model="ogNewState.thumbUrl"
          placeholder="Enrer thumbUrl"
          size="lg"
        />
        <BgSelectMenu @change-color="changeColor" />
      </UFormGroup>
    </UForm>
  </template>
</template>

<style lang="scss" scoped></style>
