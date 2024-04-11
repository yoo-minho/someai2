<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  url: z.string().url("Invalid URL"),
});

const schema2 = z.object({
  headline: z.string(),
  newTitle: z.string(),
  newDesc: z.string(),
  newUrl: z.string().url("Invalid URL"),
});

type Schema = z.output<typeof schema>;
type Schema2 = z.output<typeof schema2>;

const state = reactive({
  url: undefined,
});
const previewLoading = ref(false);

const state2 = reactive({
  headline: "",
  newTitle: "",
  newDesc: "",
  newUrl: "https://murl.cc/q1w2e3",
});

const ogData = ref<any>({
  ogUrl: "ogUrl",
  ogTitle: "ogTitle",
  ogDescription: "ogDescription",
  twitterCard: "twitterCard",
  twitterUrl: "twitterUrl",
  twitterTitle: "twitterTitle",
  twitterDescription: "twitterDescription",
  ogSiteName: "ogSiteName",
  ogImage: [{ url: "" }],
  twitterImage: [{ url: "" }],
  favicon: "",
  requestUrl: "https://murl.cc",
});

const domain = computed(() =>
  ogData.value.requestUrl.replace(/(https:\/\/|http:\/\/)/, "")
);
const isSummaryLargeImg = computed(
  () => ogData.value.twitterCard === "summary_large_image"
);
const thumbnailUrl = computed(() => ogData.value.ogImage?.[0].url || "");
const newThumbnailUrl = ref("");
const iframeUrl = ref("");
const stepNo = ref(1);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  previewLoading.value = true;
  const { url } = event.data;
  await new Promise((res) => setTimeout(res, 2000));
  const { data, error } = await useFetch("/api/scrap", {
    method: "POST",
    body: { url },
  });
  previewLoading.value = false;
  if (error.value) {
    const toast = useToast();
    toast.add({ title: "유효하지 않은 링크입니다!" });
    return;
  }

  if (stepNo.value === 2) stepNo.value = 3;

  ogData.value = data.value;
  if (ogData.value.ogTitle) {
    state2.newTitle = ogData.value.ogTitle || "";
    state2.newDesc = ogData.value.ogDescription || "";
    state2.headline = state2.newTitle;
  } else {
    ogData.value.ogUrl = "ogUrl";
    state2.newTitle = url;
    state2.newDesc = url;
  }

  iframeUrl.value = makeIframeUrl();
}

function makeIframeUrl() {
  return [
    `/makeup?title=${encodeURIComponent(state2.headline)}`,
    `thumbUrl=${encodeURIComponent(
      thumbnailUrl.value.replace(
        "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=",
        ""
      )
    )}`,
  ].join("&");
}

watch(
  () => state2.headline,
  () => {
    iframeUrl.value = makeIframeUrl();
  }
);

async function onSubmit2(event: FormSubmitEvent<Schema2>) {
  const { newTitle, newDesc } = event.data;
  console.log({ newTitle, newDesc });
}

const activeApp = ref("");
const clickApp = (appId: string) => {
  activeApp.value = appId;
  if (stepNo.value === 1) stepNo.value = 2;
};
</script>
<template>
  <template v-if="stepNo > 0">
    <h2 class="text-2xl font-bold text-primary-400 mb-2">
      # Step 1. Choose Sharing App
    </h2>
    <UContainer class="mb-6 sm:p-0 p-0 flex gap-3">
      <template v-for="appId in ['KakaoTalk', 'Facebook', 'Slack']">
        <UButton
          :label="appId"
          :color="activeApp === appId ? 'primary' : 'gray'"
          @click="clickApp(appId)"
        />
      </template>
    </UContainer>
  </template>

  <template v-if="stepNo > 1">
    <h2 class="text-2xl font-bold text-primary-400 mb-2">
      # Step 2. Enter Url
    </h2>
    <UForm
      :schema="schema"
      :state="state"
      class="flex gap-3 text-2xl"
      @submit="onSubmit"
    >
      <UFormGroup name="url" class="flex-1 text-2xl">
        <UInput v-model="state.url" placeholder="Enrer Url" size="lg" />
      </UFormGroup>
      <UButton type="submit" class="text-lg" :loading="previewLoading">
        Preview
      </UButton>
    </UForm>
    <div v-if="!ogData.ogTitle" class="mt-3">
      The preview is empty. Let’s make it quickly!
    </div>
    <div v-else class="mt-3">
      <UContainer v-if="activeApp === 'KakaoTalk'" class="flex justify-center">
        <div
          class="w-400px h-294px border-1px border-solid rounded-8px bg-white box-content"
          style="border-color: #e5e5e5"
        >
          <div
            v-if="thumbnailUrl"
            class="w-full h-200px bg-cover bg-no-repeat bg-center rounded-t-8px"
            :style="{ 'background-image': `url(${thumbnailUrl})` }"
          ></div>
          <div
            v-else-if="ogData.ogUrl === 'ogUrl'"
            class="w-400px h-200px text-white bg-black flex items-center justify-center rounded-t-8px"
          >
            NO THUMBNAIL
          </div>
          <div class="px-12px py-8px leading-24px tracking-[-.2px]">
            <p class="text-14px" style="color: #111">{{ ogData.ogTitle }}</p>
            <p
              class="text-13px text-ellipsis overflow-hidden whitespace-nowrap mt-[-4px]"
              style="color: #707070"
            >
              {{ ogData.ogDescription }}
            </p>
            <p class="text-12px" style="color: #aaa">{{ domain }}</p>
          </div>
        </div>
      </UContainer>
      <UContainer v-if="activeApp === 'Facebook'" class="flex justify-center">
        <div
          class="w-400px border-1 border-solid bg-white box-content"
          style="border-color: #dadde1"
        >
          <div
            v-if="thumbnailUrl"
            class="w-full aspect-[1.91/1] bg-cover bg-no-repeat bg-center"
            :style="{ 'background-image': `url(${thumbnailUrl})` }"
          ></div>
          <div
            v-else-if="ogData.ogUrl === 'ogUrl'"
            class="w-400px aspect-[1.91/1] text-white bg-black flex items-center justify-center"
          >
            NO THUMBNAIL
          </div>
          <div class="px-12px py-10px leading-20px">
            <div
              class="text-13px"
              style="color: rgb(101, 103, 107); text-transform: uppercase"
            >
              {{ domain }}
            </div>
            <div class="text-17px font-[600]" style="color: rgb(5, 5, 5)">
              {{ ogData.ogTitle }}
            </div>
            <div
              class="text-15px font-[400] text-ellipsis overflow-hidden whitespace-nowrap"
              style="color: rgb(101, 103, 107)"
            >
              {{ ogData.ogDescription }}
            </div>
          </div>
        </div>
      </UContainer>
      <UContainer
        v-if="activeApp === 'Slack'"
        class="flex justify-center bg-white p-4"
      >
        <div
          class="w-400px border-l-4px border-solid px-12px text-15px leading-22px"
          style="border-color: rgb(221, 221, 221); color: rgb(29, 28, 29)"
        >
          <div class="flex">
            <img
              v-if="ogData.favicon"
              :src="ogData.requestUrl + '/' + ogData.favicon"
              width="16"
              height="16"
              class="mr-8px mb-3px object-contain"
            />
            <span class="font-bold">{{ domain }}</span>
          </div>
          <div style="color: rgb(18, 100, 163)" class="font-bold">
            {{ ogData.ogTitle }}
          </div>
          <template v-if="isSummaryLargeImg && thumbnailUrl">
            <div>{{ ogData.ogDescription }}<span class="ml-1">(nkB)</span></div>
            <div
              class="w-360px h-189px bg-contain bg-no-repeat bg-center mt-5px rounded-8px"
              :style="{
                'background-image': `url(${thumbnailUrl})`,
                'box-shadow': 'inset 0 0 0 1px #0000001a',
              }"
            ></div>
          </template>
          <template v-else-if="ogData.ogUrl === 'ogUrl'">
            <div>{{ ogData.ogDescription }}<span class="ml-1">(0kB)</span></div>
            <div
              class="w-360px h-189px mt-5px rounded-8px border-1 text-white bg-black flex items-center justify-center"
            >
              NO THUMBNAIL
            </div>
          </template>
          <template v-else>
            <div>{{ ogData.ogDescription }}</div>
          </template>
        </div>
      </UContainer>
    </div>
  </template>

  <template v-if="stepNo > 2">
    <h2 class="text-2xl font-bold text-primary-400 mb-2 mt-6">
      # Step 3. MakeUp Url
    </h2>
    <template v-if="state2.newTitle === ''"> wait... </template>
    <template v-else>
      <UForm
        :schema="schema2"
        :state="state2"
        class="text-2xl mt-3 flex-col flex gap-3"
      >
        <UFormGroup label="Headline (24자 이내)" name="headline">
          <UInput
            v-model="state2.headline"
            placeholder="Enrer New Headline"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup label="Title" name="newTitle">
          <UInput
            v-model="state2.newTitle"
            placeholder="Enrer New Title"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup label="Description" name="newDesc">
          <UInput
            v-model="state2.newDesc"
            placeholder="Enrer New Desc"
            size="lg"
          />
        </UFormGroup>
      </UForm>

      <div class="mt-4">
        <UContainer
          v-if="activeApp === 'KakaoTalk'"
          class="flex justify-center"
        >
          <div
            class="w-400px h-294px border-1px border-solid rounded-8px bg-white box-content"
            style="border-color: #e5e5e5"
          >
            <div
              v-if="iframeUrl"
              class="w-full h-200px bg-cover bg-no-repeat bg-center rounded-t-8px"
            >
              <iframe
                id="player"
                type="text/html"
                width="400"
                height="200"
                :src="iframeUrl"
                frameborder="0"
              ></iframe>
            </div>
            <div
              v-else-if="ogData.ogUrl === 'ogUrl'"
              class="w-400px h-200px text-white bg-black flex items-center justify-center rounded-t-8px"
            >
              NO THUMBNAIL
            </div>
            <div class="px-12px py-8px leading-24px tracking-[-.2px]">
              <p class="text-14px" style="color: #111">{{ state2.newTitle }}</p>
              <p
                class="text-13px text-ellipsis overflow-hidden whitespace-nowrap mt-[-4px]"
                style="color: #707070"
              >
                {{ state2.newDesc }}
              </p>
              <p class="text-12px" style="color: #aaa">{{ domain }}</p>
            </div>
          </div>
        </UContainer>
        <UContainer v-if="activeApp === 'Facebook'" class="flex justify-center">
          <div
            class="w-400px border-1 border-solid bg-white box-content"
            style="border-color: #dadde1"
          >
            <div
              v-if="newThumbnailUrl"
              class="w-full aspect-[1.91/1] bg-cover bg-no-repeat bg-center"
              :style="{ 'background-image': `url(${newThumbnailUrl})` }"
            ></div>
            <div
              v-else-if="ogData.ogUrl === 'ogUrl'"
              class="w-400px aspect-[1.91/1] text-white bg-black flex items-center justify-center"
            >
              NO THUMBNAIL
            </div>
            <div class="px-12px py-10px leading-20px">
              <div
                class="text-13px"
                style="color: rgb(101, 103, 107); text-transform: uppercase"
              >
                {{ domain }}
              </div>
              <div class="text-17px font-[600]" style="color: rgb(5, 5, 5)">
                {{ state2.newTitle }}
              </div>
              <div
                class="text-15px font-[400] text-ellipsis overflow-hidden whitespace-nowrap"
                style="color: rgb(101, 103, 107)"
              >
                {{ state2.newDesc }}
              </div>
            </div>
          </div>
        </UContainer>
        <UContainer
          v-if="activeApp === 'Slack'"
          class="flex justify-center bg-white p-4"
        >
          <div
            class="max-w-400px border-l-4px border-solid px-12px text-15px leading-22px"
            style="border-color: rgb(221, 221, 221); color: rgb(29, 28, 29)"
          >
            <div class="flex">
              <img
                v-if="ogData.favicon"
                :src="ogData.requestUrl + '/' + ogData.favicon"
                width="16"
                height="16"
                class="mr-8px mb-3px object-contain"
              />
              <span class="font-bold">{{ domain }}</span>
            </div>
            <div style="color: rgb(18, 100, 163)" class="font-bold">
              {{ state2.newTitle }}
            </div>
            <template v-if="isSummaryLargeImg && newThumbnailUrl">
              <div>{{ state2.newDesc }}<span class="ml-1">(0kB)</span></div>
              <div
                class="w-360px h-189px bg-contain bg-no-repeat bg-center mt-5px rounded-8px"
                :style="{
                  'background-image': `url(${newThumbnailUrl})`,
                  'box-shadow': 'inset 0 0 0 1px #0000001a',
                }"
              ></div>
            </template>
            <template v-else-if="ogData.ogUrl === 'ogUrl'">
              <div>{{ state2.newDesc }}<span class="ml-1">(0kB)</span></div>
              <div
                class="w-360px h-189px mt-5px rounded-8px border-1 text-white bg-black flex items-center justify-center"
              >
                NO THUMBNAIL
              </div>
            </template>
            <template v-else>
              <div>{{ state2.newDesc }}</div>
            </template>
          </div>
        </UContainer>
      </div>

      <h2 class="text-2xl font-bold text-primary-400 mb-2 mt-6">
        # Step 4. Save & Share
      </h2>
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
      </UForm>
    </template>
  </template>
</template>
