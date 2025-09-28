<script setup lang="ts">
import { useBetCard } from "../store";
import PlaceBetForm from "./PlaceBetForm.vue";
import ClaimCard from "./ClaimCard.vue";
import { useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/_config/eth-usd-price-feed";
import { calculatePayout, calculatePrizePool } from "../helpers";
import { BetOptions } from "~/_types/common";
import { formatUnits } from "viem";

const { item, activeActionCard } = useBetCard()!;

const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  functionName: "latestRoundData",
});

const totalVolume = computed(() =>
  calculatePrizePool(item.value, priceFeed.data.value?.[1] ?? BigInt("0"))
);

const lockTimeHasPassed = computed(
  () => Number(item.value.lockTimestamp) * 1000 < new Date().getTime()
);

const payout = computed(() => calculatePayout(item.value));

const { convert } = useEthToUsd();

const betOptionLabel = (op: `0x${string}` | undefined) => {
  if (op === BetOptions.YES) {
    return $t("Yes");
  }

  if (op === BetOptions.NO) {
    return $t("No");
  }
};

const biggestPayout = computed(() =>
  payout.value.yes >= payout.value.no ? BetOptions.YES : BetOptions.NO
);

const userHasBetRecord = computed(
  () => (item.value.userBetInfo?.amount ?? BigInt(0)) !== BigInt(0)
);
</script>
<template>
  <div class="relative flex flex-col justify-center">
    <div class="text-sm mt-2">
      <span v-if="Number(item.userBetInfo?.amount ?? 0) > 0">
        {{ $t("You Bet on") }}
        <Badge
          :variant="
            item.userBetInfo?.betOption === BetOptions.NO
              ? 'destructive'
              : 'success'
          "
          >{{ betOptionLabel(item.userBetInfo?.betOption) }}</Badge
        >
        {{
          formatCurrency(
            convert(
              Number(formatUnits(item.userBetInfo?.amount ?? BigInt(0), 18))
            )
          )
        }}
      </span>
      <span v-else>
        {{
          $t("Win {percent} with betting on", {
            percent: `${payout.yes > payout.no ? payout.yes : payout.no}x`,
          })
        }}

        <Badge
          :variant="biggestPayout === BetOptions.NO ? 'destructive' : 'success'"
          >{{ betOptionLabel(biggestPayout) }}</Badge
        >
      </span>
    </div>

    <div class="flex my-2">
      <Badge
        :variant="'success'"
        :class="' font-semibold rounded-r-none flex-1'"
      >
        {{ payout.yes }}x {{ $t("Payout") }}
      </Badge>

      <Badge
        :variant="'destructive'"
        :class="' font-semibold rounded-l-none flex-1'"
      >
        {{ payout.no }}x {{ $t("Payout") }}
      </Badge>
    </div>

    <template v-if="activeActionCard === 'main'">
      <div v-if="!lockTimeHasPassed && !userHasBetRecord" class="flex gap-2">
        <Button
          :variant="'success'"
          size="default"
          class="flex-1"
          @click="activeActionCard = 'form-yes'"
        >
          {{ $t("Yes") }}
        </Button>
        <Button
          :variant="'destructive'"
          size="default"
          class="flex-1"
          @click="activeActionCard = 'form-no'"
        >
          {{ $t("No") }}
        </Button>
      </div>
      <ClaimCard v-else />
    </template>

    <PlaceBetForm
      v-show="activeActionCard === 'form-no' || activeActionCard === 'form-yes'"
      :disabled="userHasBetRecord"
    />

    <p class="font-semibold text-sm mt-2">
      {{ formatCurrency(totalVolume.usd) }} <span class="text-xs">Vol.</span>
    </p>
  </div>
</template>
