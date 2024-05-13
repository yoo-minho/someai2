<script setup lang="ts">
import type { OgType } from "~/types/common";

defineProps<{ og: OgType }>();
</script>
<template>
  <div class="flex w-full justify-center" style="overflow-x: auto">
    <div class="wrap rounded-lg drop-shadow-lg m-3">
      <div class="p-3 pb-0">
        <div class="flex gap-2">
          <UAvatar src="/avatar/mark.jpg" alt="Avatar" size="md" />
          <div>
            <div class="text-base font-bold">Mark Zuckerberg</div>
            <div class="text-sm mt-[-4px]" style="color: rgb(101, 103, 107)">
              1m
            </div>
          </div>
        </div>
        <div class="url rounded-sm my-2">
          {{ og.url }}
        </div>
      </div>
      <div
        class="w-[400px] border-0 bg-white box-content"
        style="border-color: #dadde1"
      >
        <div
          v-if="og.thumbUrl?.length > 0"
          class="w-full aspect-[1.91/1] bg-cover bg-no-repeat bg-center"
          :style="{
            'background-image': og.newThumbUrl
              ? `url(${og.newThumbUrl}), url(${og.thumbUrl})`
              : `url(${og.thumbUrl})`,
          }"
        ></div>
        <div class="px-3 py-2 leading-4 fb-content">
          <div class="domain text-[13px]">{{ og.domain }}</div>
          <div class="title text-[17px] font-[600]">{{ og.title }}</div>
          <div
            class="desc text-[15px] font-[400] text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {{ og.desc }}
          </div>
        </div>
      </div>
      <div class="p-2 facebook-bottom">
        <div class="flex">
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 x1d69dk1"
            style="background-position: 0px -760px"
          ></i>
        </div>
        <div>
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 x1d69dk1"
            style="background-position: 0px -571px"
          ></i>
        </div>
        <div>
          <i
            data-visualcompletion="css-img"
            class="x1b0d499 x1d69dk1"
            style="background-position: 0px -907px"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
:root {
  --bg-fb: #fff;
  --bg-fb-content: #f0f2f5;
  --color-fb: rgb(101, 103, 107);
  --url-fb: rgb(0, 100, 209);
}

.dark {
  --bg-fb: rgb(36, 37, 38);
  --bg-fb-content: #3a3b3c;
  --color-fb: rgb(176, 179, 184);
  --url-fb: rgb(90, 167, 255);
}
</style>
<style lang="scss" scoped>
.wrap {
  background-color: var(--bg-fb);
}

.fb-content {
  background-color: var(--bg-fb-content);
}

.url {
  color: var(--url-fb);
}

.title {
  color: var(--color);
}

.domain {
  color: var(--color-fb);
  text-transform: uppercase;
}

.desc {
  color: var(--color-fb);
}

.facebook-bottom {
  display: flex;
  font-weight: 600;

  & > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
  }

  i {
    background-image: url("https://static.xx.fbcdn.net/rsrc.php/v3/yc/r/U46SvbOsaBN.png");
    background-position: 0px -760px;
    width: 20px;
    height: 20px;
    filter: invert(39%) sepia(21%) saturate(200%) saturate(109.5%)
      hue-rotate(174deg) brightness(94%) contrast(86%);
  }
}
</style>
