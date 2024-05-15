<script setup lang="ts">
import { useBase, useOg } from "@/composables/states/stepStates";
import PreviewSelector from "./PreviewSelector.vue";
import { DOMAIN_URL } from "@/constants/common";
import type { OgType } from "~/types/common";

const baseState = useBase();
const ogState = useOg();
const urlPath = ref(generateRandomString(6));
const ogNewState = useOg("new");
const isValidRegexPath = ref(false);
const isValidRangePath = ref(false);
const isUniquePath = ref(false);
const isUniquePathLoading = ref(false);

const REQUIRED_CONDITION = {
  REGEX: "Only uppercase & lowercase letters, numbers, and '-'",
  RANGE: "6 to 20 characters",
  UNIQ: "Unique link",
};

watch(
  urlPath,
  () => {
    isValidRangePath.value = urlPath.value.length >= 6 && urlPath.value.length <= 20;
    isValidRegexPath.value = !/[^A-Za-z0-9-]/.test(urlPath.value);
    isUniquePath.value = false;

    if (urlPath.value) {
      ogNewState.value.url = DOMAIN_URL + urlPath.value;
    }
  },
  { immediate: true }
);

const moveStylingUrl = () => {
  baseState.value.step = "Styling";
  ogNewState.value.url = ogState.value.url;
};

const 중복체크 = async () => {
  isUniquePathLoading.value = true;
  await delay(1000);
  const { data: og } = await useFetch<OgType>(`/api/link/${urlPath.value}`);
  isUniquePathLoading.value = false;
  isUniquePath.value = og.value === undefined;
};

const 퍼블리싱 = async () => {
  const toast = useToast();
  if (!isValidRegexPath.value) {
    toast.add({ title: `Check ${REQUIRED_CONDITION.REGEX}!` });
    return;
  }

  if (!isValidRangePath.value) {
    toast.add({ title: `Check ${REQUIRED_CONDITION.RANGE}!` });
    return;
  }

  if (!isUniquePath.value) {
    toast.add({ title: `Check ${REQUIRED_CONDITION.UNIQ}!` });
    return;
  }

  await useFetch("/api/link", {
    method: "POST",
    body: {
      ...ogNewState.value,
      path: urlPath.value,
      url: ogState.value.url,
      thumbUrl: ogNewState.value.newThumbUrl,
    },
  });
  navigateTo(urlPath.value + "/welcome");
};

function generateRandomString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
</script>
<template>
  <div class="flex items-center gap-1 w-full justify-center">
    <span>{{ DOMAIN_URL }}</span>
    <UFormGroup>
      <UInput v-model="urlPath" placeholder="Enter path" />
    </UFormGroup>
    <UButton
      v-if="!isUniquePath"
      label="Unique?"
      size="sm"
      variant="outline"
      @click="중복체크()"
      :loading="isUniquePathLoading"
    />
  </div>

  <UCard class="my-3" :ui="{ body: { padding: 'px-2 py-3 sm:p-3' } }">
    <div class="text-base">Required</div>
    <UCheckbox v-model="isValidRegexPath" color="primary" :label="REQUIRED_CONDITION.REGEX" disabled />
    <UCheckbox v-model="isValidRangePath" color="primary" :label="REQUIRED_CONDITION.RANGE" disabled />
    <UCheckbox v-model="isUniquePath" color="primary" :label="REQUIRED_CONDITION.UNIQ" disabled />
  </UCard>

  <PreviewSelector :og="ogNewState" />

  <div class="flex justify-center gap-3 mt-3">
    <UButton color="black" leadingIcon="i-heroicons-arrow-small-left-solid" @click="moveStylingUrl()" />
    <UButton
      color="black"
      class="flex-1 justify-end"
      trailingIcon="i-heroicons-arrow-small-right-solid"
      @click="퍼블리싱()"
    >
      publish
    </UButton>
  </div>
</template>

<style lang="scss" scoped>
* {
}
</style>
