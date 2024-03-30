<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

// import { snapsave } from '@bochilteam/scraper'

const schema = z.object({
    url: z.string().url('Invalid URL'),
})

type Schema = z.output<typeof schema>

const state = reactive({
    url: undefined
})

const ogData = ref<any>({
    ogUrl: 'https://flow.team/kr/index',
    ogTitle: '플로우(flow) - 대한민국 최초 AI 협업툴',
    ogDescription: '업무용 메신저와 업무관리를 한 번에! 대한민국 최초 AI 협업툴 플로우로 업무 효율을 높여보세요',
    twitterCard: 'summary',
    twitterUrl: 'https://flow.team/kr/index',
    twitterTitle: '플로우(flow) - 대한민국 최초 AI 협업툴',
    twitterDescription: '업무용 메신저와 업무관리를 한 번에! 대한민국 최초 AI 협업툴 플로우로 업무 효율을 높여보세요',
    ogSiteName: '플로우(flow) - 대한민국 최초 AI 협업툴',
    ogImage: [{ url: '' }],
    twitterImage: [{ url: '' }],
    favicon: '/favicon.ico?ver=8.5964.3077.66240',
    requestUrl: 'https://flow.team'
});

const domain = computed(() => ogData.value.requestUrl.replace(/(https:\/\/|http:\/\/)/, ''))

async function onSubmit(event: FormSubmitEvent<Schema>) {
    const { url } = event.data;
    const { data } = await useFetch('/api/scrap', {
        method: 'POST',
        body: { url }
    });
    ogData.value = data.value;
}
</script>
<template>
    <UContainer class="w-600px p-6">
        <h1 class="text-4xl font-bold text-primary-400 mb-4">Enter Url</h1>
        <UForm :schema="schema" :state="state" class="flex gap-3 text-2xl" @submit="onSubmit">
            <UFormGroup name="url" class="flex-1 text-2xl">
                <UInput v-model="state.url" placeholder="Enrer Url" size="lg" />
            </UFormGroup>
            <UButton type="submit" class="text-lg">
                Preview
            </UButton>
        </UForm>
        <UContainer class="mt-6 bg-white flex justify-center">
            <div class="w-400px h-294px border-1 border-solid rounded-8px m-24px" style="border-color: #e5e5e5">
                <div class="w-full h-210px bg-cover bg-no-repeat bg-center rounded-t-8px"
                    :style="{ 'background-image': `url(${ogData.ogImage[0].url})` }">
                </div>
                <div class="px-12px py-8px leading-24px tracking-[-.2px]">
                    <p class="text-14px" style="color:#111">{{ ogData.ogTitle }}</p>
                    <p class="text-13px text-ellipsis overflow-hidden whitespace-nowrap mt-[-4px]"
                        style="color:#707070">
                        {{ ogData.ogDescription }}
                    </p>
                    <p class="text-12px" style="color:#aaa">{{ domain }}</p>
                </div>
            </div>
        </UContainer>
        <UContainer class="mt-6 bg-white flex justify-center">
            <div class="w-466px border-1 border-solid m-24px" style="border-color: #dadde1">
                <div class="w-full aspect-[1.91/1] bg-cover bg-no-repeat bg-center"
                    :style="{ 'background-image': `url(${ogData.ogImage[0].url})` }">
                </div>
                <div class="px-12px py-10px leading-20px">
                    <div class="text-13px" style="color:rgb(101, 103, 107); text-transform: uppercase;">
                        {{ domain }}
                    </div>
                    <div class="text-17px font-[600]" style="color:rgb(5, 5, 5)">{{ ogData.ogTitle }}
                    </div>
                    <div class="text-15px font-[400] text-ellipsis overflow-hidden whitespace-nowrap"
                        style="color:rgb(101, 103, 107);">
                        {{ ogData.ogDescription }}
                    </div>
                </div>
            </div>
        </UContainer>
    </UContainer>
</template>