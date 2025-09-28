<script setup lang="ts">
import { useBetCard } from "../store";
import PlaceBetCard from "./PlaceBetCard.vue";
import MainCard from "./MainCard.vue";
import ClaimCard from "./ClaimCard.vue";
import { nativeSymbol } from "~/_config/chain";
import { useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/_config/eth-usd-price-feed";
import { calculatePrizePool } from "../helpers";

const { item, activeActionCard } = useBetCard()!;

const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  functionName: "latestRoundData",
});

const lockedAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.value.lockTimestamp) * 1000),
});

const totalVolume = computed(() =>
  calculatePrizePool(item.value, priceFeed.data.value?.[1] ?? BigInt("0"))
);

const lockTimeHasPassed = computed(
  () => Number(item.value.lockTimestamp) * 1000 < new Date().getTime()
);

const userHasBetRecord = computed(
  () => (item.value.userBetInfo?.amount ?? BigInt(0)) !== BigInt(0)
);
</script>
<template>
  <div class="relative">
    <template v-if="activeActionCard === 'main'">
      <MainCard v-if="!lockTimeHasPassed && !userHasBetRecord" />
      <ClaimCard v-else />

      <p
        class="text-muted-foreground text-sm font-medium flex items-center gap-1"
      >
        {{ $t("Betting Stop at") }}:
        {{ formatDateTime(new Date(Number(item.lockTimestamp) * 1000)) }}
      </p>

      <p
        v-if="!lockedAtCounter.finished"
        class="text-muted-foreground text-sm font-medium flex items-center gap-1"
      >
        <Icon name="radix-icons:clock" class="h-[1rem] w-[1rem]" />
        {{ $t("Time left") }}: {{ lockedAtCounter.days }}D,
        {{ lockedAtCounter.hours }}H, {{ lockedAtCounter.minutes }}m,
        {{ lockedAtCounter.seconds }}s
      </p>

      <div class="flex flex-col gap-2">
        <p class="text-3xl font-medium text-primary">
          {{ totalVolume.eth.toFixed(2) }} {{ nativeSymbol }} =
          {{ formatCurrency(totalVolume.usd) }}
        </p>
        <p class="font-semibold text-primary">{{ $t("Pool Total Volume") }}</p>
      </div>
    </template>

    <PlaceBetCard
      v-show="activeActionCard === 'form-no' || activeActionCard === 'form-yes'"
      :disabled="userHasBetRecord"
    />
  </div>
</template>
