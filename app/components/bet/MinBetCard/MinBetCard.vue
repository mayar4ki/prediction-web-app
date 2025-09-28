<script setup lang="ts">
import ErrorBoundary from "~/components/common/ErrorBoundary.vue";
import ActionSection from "./ActionSection/ActionSection.vue";
import {
  betCardProvider,
  type ActiveActionCard,
  type BetCardItem,
} from "./store";
const { item } = defineProps<{ item: BetCardItem }>();

const activeActionCard = ref<ActiveActionCard>("main");

const _item = computed(() => item);
betCardProvider({ item: _item, activeActionCard });
</script>

<template>
  <ErrorBoundary>
    <div
      class="relative border rounded-md p-3 bg-card text-card-foreground shadow-sm"
    >
      <div class="flex flex-col flex-1">
        <div class="flex flex-row gap-3">
          <NuxtImg
            :src="`/userFiles/${item.closeTimestamp.toString()}/${item.id}.png`"
            placeholder="/img/blockchain.png"
            alt="placeholder"
            class="aspect-square h-full w-full max-w-15 max-h-15 border rounded-md object-cover"
          />
          <div class="flex flex-col py-1 overflow-hidden">
            <NuxtLink
              :to="`/bet/show/${item.id}`"
              class="text-sm sm:text-md font-semibold hover:underline"
            >
              {{ item.prompt }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <ActionSection />
    </div>
  </ErrorBoundary>
</template>
