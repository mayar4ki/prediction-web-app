<script setup lang="ts">
import ActionSection from "./ActionSection/ActionSection.vue";
import InfoSection from "./InfoSection/InfoSection.vue";
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
  <div
    class="relative grid gap-4 lg:grid-cols-3 xl:gap-8 opacity-100 hover:opacity-100 transition-opacity duration-300"
  >
    <InfoSection />
    <ActionSection />
  </div>
</template>
