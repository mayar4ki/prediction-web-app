<script lang="ts" setup>
import { blockExplorer } from "~/_config/chain";
import { useBetCard } from "../store";

const { item } = useBetCard()!;
</script>

<template>
  <div
    class="flex flex-col gap-8 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-8 lg:h-[330px]"
  >
    <NuxtImg
      src="/img/blockchain.png"
      alt="placeholder"
      class="aspect-29/35 h-full w-full max-w-60 border rounded-2xl object-cover self-center sm:self-auto"
    />
    <div class="flex h-full w-full flex-col justify-between gap-4 py-1">
      <div class="flex flex-col gap-1">
        <NuxtLink
          class="text-muted-foreground text-sm font-mono hover:underline"
          :to="`/bet/show/${item.id}`"
        >
          #ID:

          <span class="text-sm text-muted-foreground"
            >{{ item.id.toString() }}
          </span>
        </NuxtLink>

        <p class="text-primary text-sm font-normal flex items-center gap-1">
          <Icon name="radix-icons:clock" class="h-[1rem] w-[1rem]" />
          Will be resolved at:
          {{ formatDateTime(new Date(Number(item.closeTimestamp) * 1000)) }}
        </p>
        <p class="text-2xl font-semibold">
          {{ item.prompt }}
        </p>
      </div>

      <div
        class="flex flex-col xl:flex-row gap-2 xl:justify-between xl:items-center w-full"
      >
        <p class="text-muted-foreground text-sm font-mono">
          Publisher:
          <a
            class="text-sm text-muted-foreground hover:underline"
            :href="`${blockExplorer}${item.master}`"
            target="_blank"
            >{{ item.master }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>
