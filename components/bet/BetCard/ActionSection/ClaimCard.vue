<script lang="ts" setup>
import { BetOptions, EmptyBytes, type UserBet } from "~/types/common";
import { useBetCard } from "../store";
import { calculatePayout, calculatePrizePool } from "../helpers";
import { nativeSymbol } from "~/config/chain";
import { Button } from "~/components/ui/button";
import { useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { formatUnits, pad } from "viem";

import { useQueryClient } from "@tanstack/vue-query";
import Loader from "~/components/ui/backdrop-loader/Loader.vue";

const { userBetInfo } = defineProps<{
  // eslint-disable-next-line vue/require-default-prop
  userBetInfo?: UserBet;
}>();

const { item } = useBetCard()!;
const payout = computed(() => calculatePayout(item.value));

const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  functionName: "latestRoundData",
});

const { convert } = useEthToUsd();

const closedAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.value.closeTimestamp) * 1000),
});

const totalVolume = computed(() =>
  calculatePrizePool(item.value, priceFeed.data.value?.[1] ?? BigInt("0"))
);

const queryClient = useQueryClient();

const betIndex = useBetIndex({
  query: {
    enabled: false,
  },
});

const {
  trigger: resolveBet,
  isPending,
  isConfirming,
} = useBetResolver({
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: betIndex.queryKey,
    });
  },
});

const {
  trigger: claimBet,
  isPending: isPending2,
  isConfirming: isConfirming2,
} = useClaimBet({
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: betIndex.queryKey,
    });
  },
});

const oracleFinished = computed(() => {
  if (pad(item.value.err, { size: 32 }) !== EmptyBytes.bytes32) {
    return true;
  }

  if (pad(item.value.result, { size: 32 }) !== EmptyBytes.bytes32) {
    return true;
  }

  return false;
});

const resultError = computed(
  () =>
    pad(item.value.err, { size: 32 }) !== EmptyBytes.bytes32 ||
    item.value.result === BetOptions.UNKNOWN
);

const userHasBetRecord = computed(
  () => item.value.userBetInfo.amount ?? BigInt(0) !== BigInt(0)
);

const userHasWinBetRecord = computed(
  () => item.value.result === userBetInfo?.betOption && userHasBetRecord.value
);

const oracleIsCalled = computed(
  () => pad(item.value.oracleRequestId, { size: 32 }) !== EmptyBytes.bytes32
);

const betOptionLabel = (op: `0x${string}` | undefined) => {
  if (op === BetOptions.YES) {
    return "Yes";
  }

  if (op === BetOptions.NO) {
    return "No";
  }

  if (op === BetOptions.UNKNOWN) {
    return "AI Couldn't Decide";
  }

  if (!oracleFinished.value) {
    return "Not resolved yet";
  }

  return "Error";
};
</script>

<template>
  <div
    v-if="isPending || isConfirming || isPending2 || isConfirming2"
    class="absolute top-0 right-0 left-0 bottom-0 z-50 bg-background/55 pointer-events-none"
  >
    <Loader
      :text="isConfirming || isConfirming2 ? 'Confirming...' : undefined"
    />
  </div>
  <div class="flex flex-col gap-3 lg:flex-col">
    <Badge variant="success" class="text-sm font-semibold">
      {{ payout.yes }}x Payout
    </Badge>

    <div class="py-12 text-center text-sm font-medium">
      <span v-if="!closedAtCounter.finished">
        Resolved in : {{ closedAtCounter.days }}D, {{ closedAtCounter.hours }}H,
        {{ closedAtCounter.minutes }}m, {{ closedAtCounter.seconds }}s
      </span>

      <br />

      <span v-if="Number(userBetInfo?.amount ?? 0) > 0">
        You Bet on
        <Badge
          :variant="
            userBetInfo?.betOption === BetOptions.NO ? 'destructive' : 'success'
          "
          >{{ betOptionLabel(item.userBetInfo.betOption) }}</Badge
        >
        {{
          formatCurrency(
            convert(Number(formatUnits(userBetInfo?.amount ?? BigInt(0), 18)))
          )
        }}
      </span>
    </div>

    <template v-if="closedAtCounter.finished">
      <div class="py-4 text-center text-sm font-medium">
        Result: {{ betOptionLabel(item.result) }}
      </div>

      <Button
        v-if="userHasWinBetRecord"
        :disabled="userBetInfo?.claimed"
        @click="
          claimBet({
            args: [[item.id]],
          })
        "
      >
        {{ userBetInfo?.claimed ? "Claimed" : "Claim rewards" }}
      </Button>

      <Button
        v-if="resultError && userHasBetRecord"
        :disabled="userBetInfo?.claimed"
        @click="
          claimBet({
            args: [[item.id]],
          })
        "
      >
        {{ userBetInfo?.claimed ? "Refunded" : "Refund" }}
      </Button>

      <Button
        v-if="!oracleFinished"
        :disabled="oracleIsCalled"
        @click="
          resolveBet({
            args: [item.id],
          })
        "
      >
        {{ oracleIsCalled ? "Waiting for result" : "Resolve" }}
      </Button>
    </template>

    <Badge variant="destructive" class="text-sm font-semibold">
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
