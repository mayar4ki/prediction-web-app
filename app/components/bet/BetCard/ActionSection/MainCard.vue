<script lang="ts" setup>
import { useBetCard } from "../store";
import { cn } from "~/lib/utils";
import { calculatePayout, calculatePrizePool } from "../helpers";
import { nativeSymbol } from "~/_config/chain";
import { useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/_config/eth-usd-price-feed";

const { item, activeActionCard } = useBetCard()!;
const payout = computed(() => calculatePayout(item.value));
const withinLockTime = computed(
  () => Number(item.value.lockTimestamp) * 1000 < new Date().getTime()
);

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
</script>

<template>
  <div class="flex flex-col gap-3 lg:flex-col">
    <Badge
      :variant="'success'"
      :class="
        cn('text-sm font-semibold', {
          'opacity-50': withinLockTime,
        })
      "
    >
      {{ payout.yes }}x Payout
    </Badge>

    <Button
      :variant="'success'"
      size="lg"
      :disabled="withinLockTime"
      @click="activeActionCard = 'form-yes'"
    >
      Bet Yes
    </Button>

    <Button
      :variant="'destructive'"
      size="lg"
      :disabled="withinLockTime"
      @click="activeActionCard = 'form-no'"
    >
      Bet No
    </Button>

    <Badge
      :variant="'destructive'"
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
      Betting Stop at:
      {{ formatDateTime(new Date(Number(item.lockTimestamp) * 1000)) }}
    </p>
    <p
      v-if="!lockedAtCounter.finished"
      class="text-muted-foreground text-sm font-medium flex items-center gap-1"
    >
      <Icon name="radix-icons:clock" class="h-[1rem] w-[1rem]" />
      Time left: {{ lockedAtCounter.days }}D, {{ lockedAtCounter.hours }}H,
      {{ lockedAtCounter.minutes }}m, {{ lockedAtCounter.seconds }}s
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
