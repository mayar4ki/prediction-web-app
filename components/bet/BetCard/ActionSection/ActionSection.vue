<script setup lang="ts">
import { nativeSymbol } from "~/config/chain";
import { cn } from "~/lib/utils";
import { BetOptions, type RoundData } from "~/types/common";
import { calculatePayout, calculatePrizePool } from "../helpers";
import { useAccount, useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { Button } from "~/components/ui/button";
import PlaceBetForm from "./PlaceBetForm.vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";
import Loader from "~/components/ui/backdrop-loader/Loader.vue";
import { formatUnits } from "viem";

const { item } = defineProps<{ item: RoundData }>();
const showForm = ref<"main" | "form-no" | "form-yes">("main");

const account = useAccount();

const lockedAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.lockTimestamp) * 1000),
});

const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  functionName: "latestRoundData",
});

const { data, isLoading } = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  functionName: "betsLedger",
  args: [item.id, account.address.value!],
  query: {
    enabled: computed(
      () => !!account.address.value && showForm.value !== "main"
    ),
  },
});

const withinLockTime = computed(
  () => Number(item.lockTimestamp) * 1000 < new Date().getTime()
);

const totalVolume = computed(() =>
  calculatePrizePool(item, priceFeed.data.value?.[1] ?? BigInt("0"))
);
const payout = computed(() => calculatePayout(item));

const isBettable = computed(() =>
  Boolean(!data.value || data.value?.[1] === BigInt(0))
);
</script>
<template>
  <div>
    <div
      v-if="isLoading"
      class="absolute top-0 right-0 left-0 bottom-0 z-50 bg-background/75 pointer-events-none"
    >
      <Loader />
    </div>
    <div v-if="showForm === 'main'" class="flex flex-col gap-3 lg:flex-col">
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

      <Button
        :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
        size="lg"
        :disabled="withinLockTime || !isBettable"
        @click="showForm = 'form-yes'"
      >
        Bet Yes
        <span v-if="BetOptions.YES == data?.[0]"
          >{{ Number(formatUnits(data?.[1] ?? BigInt(0), 18)).toFixed(2) }}
          {{ nativeSymbol }}</span
        >
      </Button>

      <Button
        :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
        size="lg"
        :disabled="withinLockTime || !isBettable"
        @click="showForm = 'form-no'"
      >
        Bet No
        <span v-if="BetOptions.NO == data?.[0]"
          >{{ Number(formatUnits(data?.[1] ?? BigInt(0), 18)).toFixed(2) }}
          {{ nativeSymbol }}</span
        >
      </Button>

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
      :id="item.id"
      v-model="showForm"
      :disabled="!isBettable"
    />
  </div>
</template>
