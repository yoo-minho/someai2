<script setup lang="ts">
import { useBase, useOg } from "@/composables/states/stepStates";

const baseState = useBase();
const ogState = useOg();
const ogNewState = useOg("new");

const writeUrl = ref(false);
const confirmPreview = ref(false);
const stylingPreview = ref(false);
const submitPage = ref(false);

watch(() => baseState.value.step, () => {
    if (baseState.value.step === 'Welcome') {
        writeUrl.value = false;
        confirmPreview.value = false;
        stylingPreview.value = false;
        submitPage.value = false;
    } else if (baseState.value.step === 'Preview') {
        writeUrl.value = true;
        confirmPreview.value = false;
        stylingPreview.value = true;
        submitPage.value = false;
    } else if (baseState.value.step === 'Styling') {
        writeUrl.value = false;
        confirmPreview.value = true;
        stylingPreview.value = false;
        submitPage.value = true;
    } else if (baseState.value.step === 'Submit') {
        writeUrl.value = false;
        confirmPreview.value = false;
        stylingPreview.value = true;
        submitPage.value = false;
    }
}, { immediate: true })

const moverWriteUrl = () => {
    baseState.value.step = 'Welcome';
    ogState.value = {
        url: "",
        title: "",
        desc: "",
        thumbUrl: "",
        newThumbUrl: "",
        twitterCard: "",
        favicon: "",
        domain: "",
        name: ""
    };
};

const moveConfirmPreview = () => {
    baseState.value.step = 'Preview';
}

const moveStylingUrl = () => {
    baseState.value.step = 'Styling';
    ogNewState.value = { ...ogState.value };
};

const moveSubmit = () => {
    baseState.value.step = 'Submit';
};
</script>
<template>
    <div class="flex justify-center gap-3 mt-3">
        <UButton v-if="writeUrl" class="flex-1" leadingIcon="i-heroicons-arrow-small-left-solid"
            @click="moverWriteUrl()">
            Write Url
        </UButton>
        <UButton v-if="confirmPreview" class="flex-1" leadingIcon="i-heroicons-arrow-small-left-solid"
            @click="moveConfirmPreview()">
            Confirm Preview
        </UButton>
        <UButton v-if="stylingPreview" class="flex-1 justify-end" trailingIcon="i-heroicons-arrow-small-right-solid"
            @click="moveStylingUrl()">
            Styling Preview
        </UButton>
        <UButton v-if="submitPage" class="flex-1 justify-end" trailingIcon="i-heroicons-arrow-small-right-solid"
            @click="moveSubmit()">
            Sumbit New Preview
        </UButton>
    </div>
</template>

<style lang="scss" scoped></style>
