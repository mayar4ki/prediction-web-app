<script lang="ts" setup>
import { blockExplorer } from "~/_config/chain";
import { useBetCard } from "../store";
import ReactionBtnGroup from "../ReactionBtnGroup.vue";

const { item } = useBetCard()!;
</script>

<template>
  <div
    class="flex flex-col gap-4 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-0 lg:h-[330px]"
  >
    <NuxtImg
      :src="`/userFiles/${item.closeTimestamp.toString()}/${item.id}.png`"
      placeholder="/img/blockchain.png"
      alt="placeholder"
      class="aspect-29/35 h-full w-full max-w-60 border rounded-2xl object-cover self-center sm:self-auto"
    />
    <div class="flex h-full w-full flex-col justify-between gap-4 pb-1 pt-2">
      <div class="flex flex-col gap-1">
        <a
          class="hover:underline text-sm font-mono font-medium text-muted-foreground"
          :href="`${blockExplorer}${item.master}`"
          target="_blank"
        >
          <Icon name="radix-icons:person" size="14" />:
          {{ item.master }}
        </a>

        <NuxtLink
          :to="`/bet/show/${item.id}`"
          class="text-2xl font-semibold hover:underline"
        >
          {{ item.prompt }}
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-1">
        <div
          class="flex flex-col xl:flex-row gap-2 xl:justify-between xl:items-center w-full"
        >
          <p class="text-muted-foreground text-sm">
            {{ $t("Will be resolved at") }}:

            {{ formatDateTime(new Date(Number(item.closeTimestamp) * 1000)) }}
          </p>
        </div>
        <div
          v-if="item.meta?.tags"
          class="flex flex-col xl:flex-row gap-2 xl:justify-between xl:items-center w-full"
        >
          <p class="text-muted-foreground text-sm font-mono">
            {{ $t("Tags") }}:

            <Badge v-for="tag in item.meta.tags" :key="tag.id" variant="outline"
              >#{{ $t(tag.name) }}</Badge
            >
          </p>
        </div>

        <div
          class="flex flex-row justify-center sm:justify-end flex-1 mr-6 border-t-2 pt-1.5 mt-0.5"
        >
          <ReactionBtnGroup />
        </div>
      </div>
    </div>
  </div>
</template>
