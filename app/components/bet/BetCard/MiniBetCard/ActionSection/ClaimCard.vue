<script lang="ts" setup>
import { BetOptions, EmptyBytes } from "~/_types/common";
import { useBetCard } from "../../store";
import { pad } from "viem";

import { useQueryClient } from "@tanstack/vue-query";

const { item } = useBetCard()!;

const closedAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.value.closeTimestamp) * 1000),
});

const queryClient = useQueryClient();

const betIndex = useBetIndex({
  query: {
    enabled: false,
  },
});

const betIndexPicker = useBetIndexPicker({
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
    queryClient.invalidateQueries({
      queryKey: betIndexPicker.queryKey,
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
    queryClient.invalidateQueries({
      queryKey: betIndexPicker.queryKey,
    });
  },
});

const oracleFinished = computed(() => {
  if (item.value?.err !== EmptyBytes.bytes) {
    return true;
  }

  if (pad(item.value.result, { size: 32 }) !== EmptyBytes.bytes32) {
    return true;
  }

  return false;
});

const resultError = computed(
  () =>
    item.value?.err !== EmptyBytes.bytes ||
    item.value.result === BetOptions.UNKNOWN
);

const userHasBetRecord = computed(
  () => item.value.userBetInfo?.amount ?? BigInt(0) !== BigInt(0)
);

const userHasWinBetRecord = computed(
  () =>
    item.value.result === item.value.userBetInfo?.betOption &&
    userHasBetRecord.value
);

const oracleIsCalled = computed(
  () => pad(item.value.oracleRequestId, { size: 32 }) !== EmptyBytes.bytes32
);

const betOptionLabel = (op: `0x${string}` | undefined) => {
  if (op === BetOptions.YES) {
    return $t("Yes");
  }

  if (op === BetOptions.NO) {
    return $t("No");
  }

  if (op === BetOptions.UNKNOWN) {
    return $t("AI Couldn't Decide");
  }

  if (!oracleFinished.value) {
    return $t("Not resolved yet");
  }

  return $t("Error");
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
    <Button
      v-if="!closedAtCounter.finished"
      variant="outline"
      class="text-center text-sm font-medium pointer-events-none"
    >
      <span v-if="!closedAtCounter.finished">
        {{ $t("Resolved in") }} : {{ closedAtCounter.days }}D,
        {{ closedAtCounter.hours }}H, {{ closedAtCounter.minutes }}m,
        {{ closedAtCounter.seconds }}s
      </span>
    </Button>
    <template v-if="closedAtCounter.finished">
      <Button
        v-if="!oracleFinished"
        :disabled="oracleIsCalled"
        @click="
          resolveBet({
            args: [item.id],
          })
        "
      >
        {{ oracleIsCalled ? $t("Waiting for result") : $t("Resolve") }} ({{
          $t("Result")
        }}: {{ betOptionLabel(item.result) }})
      </Button>

      <Button
        v-if="userHasWinBetRecord"
        :disabled="item.userBetInfo?.claimed"
        @click="
          claimBet({
            args: [[item.id]],
          })
        "
      >
        {{ item.userBetInfo?.claimed ? $t("Claimed") : $t("Claim rewards") }}
        ({{ $t("Result") }}: {{ betOptionLabel(item.result) }})
      </Button>

      <Button
        v-if="resultError"
        :disabled="item.userBetInfo?.claimed"
        @click="
          claimBet({
            args: [[item.id]],
          })
        "
      >
        {{ item.userBetInfo?.claimed ? $t("Refunded") : $t("Refund") }} ({{
          $t("Result")
        }}: {{ betOptionLabel(item.result) }})
      </Button>
    </template>
  </div>
</template>
