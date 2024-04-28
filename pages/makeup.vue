<script setup lang="ts">
const route = useRoute();
const { title, thumbUrl, app } = route.query;
const _app = String(app);

const { width: appW, height: appH } = {
  KakaoTalk: { width: 400, height: 200 },
  twitter: { width: 400, height: 200 },
  Facebook: { width: 400, height: 210 },
  Slack: { width: 360, height: 189 },
}[_app];

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
</script>
<template>
  <div></div>
</template>