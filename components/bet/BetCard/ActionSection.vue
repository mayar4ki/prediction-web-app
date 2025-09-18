<script setup lang="ts">
import { chain, nativeSymbol } from "~/config/chain";
import { cn } from "~/lib/utils";
import { BetOptions, type RoundData } from "~/types/common";
import { calculatePayout, calculatePrizePool } from "./helpers";
import { useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { Button } from "~/components/ui/button";

import PlaceBetForm from "./PlaceBetForm.vue";

const { item } = defineProps<{ item: RoundData }>();

const lockedAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.lockTimestamp) * 1000),
});

const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  chainId: chain.id,
  functionName: "latestRoundData",
});

const totalVolume = computed(() =>
  calculatePrizePool(item, priceFeed.data.value?.[1] ?? BigInt("0"))
);
const payout = computed(() => calculatePayout(item));

const withinLockTime = computed(
  () => item.lockTimestamp < new Date().getTime() / 1000
);

const showForm = ref<"main" | "form-no" | "form-yes">("main");
</script>
<template>
  <div>
    <div v-if="showForm === 'main'" class="flex flex-col gap-3 lg:flex-col">
      <Badge
        :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
        :class="
          cn('text-sm font-semibold', {
            'opacity-50': withinLockTime,
          })
        "
      >
        {{ payout.yes.toFixed(2) }}x Payout
      </Badge>

      <Button
        :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
        size="lg"
        :disabled="withinLockTime"
        @click="showForm = 'form-yes'"
      >
        Bet Yes
      </Button>

      <Button
        :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
        size="lg"
        :disabled="withinLockTime"
        @click="showForm = 'form-no'"
      >
        Bet No
      </Button>

      <Badge
        :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
        :class="
          cn('text-sm font-semibold', {
            'opacity-50': withinLockTime,
          })
        "
      >
        {{ payout.no.toFixed(2) }}x Payout
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
    <PlaceBetForm
      v-show="showForm !== 'main'"
      v-model="showForm"
      :id="item.id"
    />
  </div>
</template>
