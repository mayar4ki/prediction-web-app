<script lang="ts" setup>
import { BetOptions, type UserBet } from "~/types/common";
import { useBetCard } from "../store";
import { cn } from "~/lib/utils";
import { calculatePayout, calculatePrizePool } from "../helpers";
import { nativeSymbol } from "~/config/chain";
import { Button } from "~/components/ui/button";
import { useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { formatUnits } from "viem";

const { userBetInfo } = defineProps<{
  // eslint-disable-next-line vue/require-default-prop
  userBetInfo?: UserBet;
}>();

const { item } = useBetCard()!;
const payout = computed(() => calculatePayout(item.value));
const withinLockTime = computed(
  () => Number(item.value.lockTimestamp) * 1000 < new Date().getTime()
);

const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  functionName: "latestRoundData",
});

const closedAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.value.closeTimestamp) * 1000),
});

const totalVolume = computed(() =>
  calculatePrizePool(item.value, priceFeed.data.value?.[1] ?? BigInt("0"))
);

const betResultLabel = computed(() => {
  if (item.value.result === BetOptions.YES) {
    return "Yes";
  }
  if (item.value.result === BetOptions.NO) {
    return "No";
  }

  return "unknown";
});
const betUserLabel = computed(() => {
  if (userBetInfo?.betOption === BetOptions.YES) {
    return "Yes";
  }
  if (userBetInfo?.betOption === BetOptions.NO) {
    return "No";
  }

  return "unknown";
});
</script>

<template>
  <div class="flex flex-col gap-3 lg:flex-col">
    <Badge
      :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
      :class="
        cn('text-sm font-semibold', {
          'opacity-50': withinLockTime,
        })
      "
    >
      {{ payout.yes }}x Payout
    </Badge>

    <div
      v-if="!closedAtCounter.finished"
      class="py-12 text-center text-sm font-medium"
    >
      Resolved in : {{ closedAtCounter.days }}D, {{ closedAtCounter.hours }}H,
      {{ closedAtCounter.minutes }}m, {{ closedAtCounter.seconds }}s

      <br />

      <span v-if="Number(userBetInfo?.amount ?? 0) > 0">
        You Bet on
        <Badge
          :variant="
            userBetInfo?.betOption === BetOptions.NO ? 'destructive' : 'success'
          "
          >{{ betUserLabel }}</Badge
        >
        {{
          Number(formatUnits(userBetInfo?.amount ?? BigInt(0), 18)).toFixed(3)
        }}
        ETH
      </span>
    </div>

    <template v-if="closedAtCounter.finished">
      <div class="py-4 text-center text-sm font-medium">
        Result: {{ betResultLabel }}
      </div>

      <Button
        v-if="
          userBetInfo &&
          BigInt(item.rewardBaseCall) > BigInt(0) &&
          item.result === userBetInfo.betOption
        "
        :disabled="userBetInfo.claimed"
      >
        {{ userBetInfo.claimed ? "Claimed" : "Claim rewards" }}
      </Button>

      <Button v-if="!item.rewardBaseCall"> Resolve </Button>
    </template>

    <Badge
      :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
      :class="
        cn('text-sm font-semibold', {
          'opacity-50': withinLockTime,
        })
      "
    >
      {{ payout.no }}x Payout
    </Badge>

    <p
      class="text-muted-foreground text-sm font-medium flex items-center gap-1"
    >
      Betting Stopped at:
      {{ formatDateTime(new Date(Number(item.lockTimestamp) * 1000)) }}
    </p>

    <div class="flex flex-col gap-2">
      <p class="text-3xl font-medium text-primary">
        {{ totalVolume.eth.toFixed(2) }} {{ nativeSymbol }} =
        {{ formatCurrency(totalVolume.usd) }}
      </p>
      <p class="font-semibold text-primary">Pool Total Volume</p>
    </div>
  </div>
</template>
