<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RoundData } from "~/types/common";
import type { CellContext } from "@tanstack/vue-table";
import { blockExplorer } from "~/config/chain";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";
import { useQueryClient } from "@tanstack/vue-query";
import Loader from "~/components/ui/backdrop-loader/Loader.vue";

const { cellCtx } = defineProps<{ cellCtx: CellContext<RoundData, unknown> }>();

const item = computed(() => cellCtx.row.original);

const queryClient = useQueryClient();

const result = useOwnedBetsIndex({
  query: {
    enabled: false,
  },
});
const { claimMasterFees, isPending } = useClaimMasterFees({
  onSuccess() {
    queryClient.invalidateQueries({
      queryKey: result.queryKey,
    });
  },
});
</script>

<template>
  <div>
    <div
      v-if="isPending"
      class="absolute top-0 right-0 left-0 bottom-0 z-50 bg-background/10 pointer-events-none"
    >
      <Loader />
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Button variant="ghost" class="w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <MoreHorizontal class="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          :disabled="item.masterBalance === BigInt(0)"
          @click="
            claimMasterFees({
              args: [item.id],
            })
          "
        >
          Claim Creator Fees
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="navigateTo(`/bet/show/${item.id}`)"
          >View Bet</DropdownMenuItem
        >

        <a
          :href="`${blockExplorer}${aiPredictionV1.address}#readContract`"
          target="_blank"
        >
          <DropdownMenuItem>View on Explorer</DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
