<script setup lang="ts">
import { useBetCard } from "../store";
import PlaceBetCard from "./PlaceBetCard.vue";
import MainCard from "./MainCard.vue";
import ClaimCard from "./ClaimCard.vue";

const { item, activeActionCard } = useBetCard()!;
</script>
<template>
  <div class="relative">
    <template v-if="activeActionCard === 'main'">
      <MainCard
        v-if="
          Number(item.lockTimestamp) * 1000 > new Date().getTime() &&
          Number(item.userBetInfo?.amount ?? 0) === 0
        "
      />

      <ClaimCard v-else :user-bet-info="item.userBetInfo" />
    </template>

    <PlaceBetCard
      v-show="activeActionCard === 'form-no' || activeActionCard === 'form-yes'"
      :disabled="(item.userBetInfo?.amount!) > BigInt(0)"
    />
  </div>
</template>
