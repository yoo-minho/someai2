<script setup lang="ts">
import Banner from "~/components/OgImage/Banner.vue";

const route = useRoute();
const { title, thumbUrl, preview, app } = route.query;
const _app = String(app);

const { width: appW, height: appH } = {
  KakaoTalk: { width: 400, height: 200 },
  twitter: { width: 400, height: 200 },
  Facebook: { width: 400, height: 210 },
  Slack: { width: 360, height: 189 },
}[_app];

console.log({ appW, appH });

const _title = String(title);
const convertThumbUrl = thumbUrl
  ? decodeURIComponent(String(thumbUrl)).replace(
      "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=",
      ""
    )
  : null;

defineOgImageComponent(
  "Banner",
  {
    title: title || "헤드라인!",
    thumbUrl: convertThumbUrl,
  },
  {
    width: appW * 3,
    height: appH * 3,
  }
);

const ogImage = ref("");
onMounted(() => {
  ogImage.value = document
    .querySelector("meta[property='og:image']")
    .getAttribute("content");
});

// console.log({ strThumbUrl });
</script>
<template>
  <div class="w-full h-full flex flex-col justify-center">
    <div class="flex justify-center">
      <div>
        <div
          v-if="ogImage"
          class="bg-cover bg-center"
          :style="{
            'background-image': `url(${ogImage})`,
            width: `${appW}px`,
            height: `${appH}px`,
          }"
        ></div>

        <div v-if="preview" class="layer">
          <div style="font-size: 60px">구분선</div>
          <Banner
            :title="_title"
            :thumbUrl="convertThumbUrl"
            style="position: relative"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.container {
  position: relative;
  overflow: hidden; /* 요소 내부의 내용이 넘치는 경우를 방지하기 위해 */
}

.layer {
  position: absolute;
  width: 100%; /* 이미지의 크기를 scale(0.5)로 축소할 것이므로 200% */
  height: 100%; /* 이미지의 크기를 scale(0.5)로 축소할 것이므로 200% */
  transform: scale(0.33333333); /* 요소를 0.3배 축소 */
  transform-origin: top left; /* 축소 기준점을 좌측 상단으로 지정 */
}
</style>
