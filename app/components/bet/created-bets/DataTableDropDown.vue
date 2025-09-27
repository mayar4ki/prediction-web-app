<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

import { EmptyBytes, type RoundData } from "~/_types/common";
import type { CellContext } from "@tanstack/vue-table";
import { blockExplorer } from "~/_config/chain";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import { useQueryClient } from "@tanstack/vue-query";

const { cellCtx } = defineProps<{ cellCtx: CellContext<RoundData, unknown> }>();

const item = computed(() => cellCtx.row.original);

const queryClient = useQueryClient();

const ownedBetIndex = useOwnedBetsIndex({
  query: {
    enabled: false,
  },
});

const {
  trigger: claimMasterFees,
  isPending,
  isConfirming,
} = useClaimMasterFees({
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ownedBetIndex.queryKey,
    });
  },
});

const {
  trigger: resolveBet,
  isPending: isPending2,
  isConfirming: isConfirming2,
} = useBetResolver({
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: ownedBetIndex.queryKey,
    });
  },
});
</script>

<template>
  <div>
    <div
      v-if="isPending || isPending2 || isConfirming || isConfirming2"
      class="absolute top-0 right-0 left-0 bottom-0 z-50 bg-background/10 pointer-events-none"
    >
      <Loader
        :text="isConfirming || isConfirming2 ? $t('Confirming') + '...' : ''"
      />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">{{ $t("Open menu") }}</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{{ $t("Actions") }}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          :disabled="
            Number(item.closeTimestamp) * 1000 > new Date().getTime() ||
            item.oracleRequestId !== EmptyBytes.bytes32
          "
          @click="
            resolveBet({
              args: [item.id],
            })
          "
        >
          {{ $t("Resolve") }}
        </DropdownMenuItem>
        <DropdownMenuItem
          :disabled="item.masterBalance === BigInt(0)"
          @click="
            claimMasterFees({
              args: [item.id],
            })
          "
        >
          {{ $t("Claim Creator Fees") }}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="navigateTo(`/bet/show/${item.id}`)">{{
          $t("View Bet")
        }}</DropdownMenuItem>

        <a
          :href="`${blockExplorer}${aiPredictionV1.address}#readContract`"
          target="_blank"
        >
          <DropdownMenuItem>{{ $t("View on Explorer") }}</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
