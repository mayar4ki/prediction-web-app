<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BetOptions, type RoundData } from "@/types/common";

import { blockExplorer, nativeSymbol } from "~/config/chain";
import { formatUnits } from "viem";

const { item, ethPriceInUSD = BigInt(0) } = defineProps<{
  item: RoundData;
  ethPriceInUSD?: bigint;
}>();

const totalVolume = computed(() => {
  const totalVolumeWei = item.yesBetsVolume + item.noBetsVolume;

  const totalVolumeEth = Number(formatUnits(totalVolumeWei, 18));

  const totalVolumeUSD = Number(
    totalVolumeEth * Number(formatUnits(ethPriceInUSD, 8))
  );

  return {
    eth: totalVolumeEth,
    usd: totalVolumeUSD,
  };
});

const payout = computed(() => {
  const yesBetsVolume = Number(item.yesBetsVolume);
  const noBetsVolume = Number(item.noBetsVolume);
  const totalVolume = Number(item.totalVolume);

  const y = totalVolume / (yesBetsVolume || 1);
  const n = totalVolume / (noBetsVolume || 1);

  return {
    yes: y,
    no: n,
  };
});

const closerAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.closeTimestamp) * 1000),
});
</script>

<template>
  <div
    class="grid gap-4 lg:grid-cols-3 xl:gap-8 opacity-100 hover:opacity-100 transition-opacity duration-300"
  >
    <div
      class="flex flex-col gap-8 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-8"
    >
      <NuxtImg
        src="/img/blockchain.png"
        alt="placeholder"
        class="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover self-center sm:self-auto"
      />
      <div class="flex h-full w-full flex-col justify-between gap-4 py-1">
        <div class="flex flex-col gap-1">
          <p class="text-primary text-sm font-normal flex items-center gap-1">
            <Icon name="radix-icons:clock" class="h-[1rem] w-[1rem]" />
            Will be resolved at:
            {{ formatDateTime(new Date(Number(item.closeTimestamp) * 1000)) }}
          </p>
          <p class="text-2xl font-semibold">
            {{ item.prompt }}
          </p>
        </div>

        <div
          class="flex flex-col xl:flex-row gap-2 xl:justify-between xl:items-center w-full"
        >
          <p class="text-muted-foreground text-sm font-mono">
            Publisher:

            <a
              class="text-sm text-muted-foreground hover:underline"
              :href="`${blockExplorer}${item.master}`"
              target="_blank"
              >{{ item.master }}
            </a>
          </p>

          <!-- <ReactionBtnGroup
            class="hidden lg:flex"
            :comments-count="item.commentCount"
            :likes-count="item.likeCount"
          /> -->
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 lg:flex-col">
      <Badge
        :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
        :class="
          cn('text-sm font-semibold', {
            'opacity-50': item.lockTimestamp < new Date().getTime() / 1000,
          })
        "
      >
        {{ payout.yes.toFixed(2) }}x Payout
      </Badge>

      <Button
        :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
        size="lg"
        :disabled="item.lockTimestamp < new Date().getTime() / 1000"
      >
        Bet Yes
      </Button>

      <Button
        :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
        size="lg"
        :disabled="item.lockTimestamp < new Date().getTime() / 1000"
      >
        Bet No
      </Button>
      <Badge
        :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
        :class="
          cn('text-sm font-semibold', {
            'opacity-50': item.lockTimestamp < new Date().getTime() / 1000,
          })
        "
      >
        {{ payout.no.toFixed(2) }}x Payout
      </Badge>

      <p
        class="text-muted-foreground text-sm font-medium flex items-center gap-1"
      >
        Betting Close at:
        {{ formatDateTime(new Date(Number(item.lockTimestamp) * 1000)) }}
      </p>
      <p
        class="text-muted-foreground text-sm font-medium flex items-center gap-1"
      >
        <Icon name="radix-icons:clock" class="h-[1rem] w-[1rem]" />
        Time left: {{ closerAtCounter.days }}D, {{ closerAtCounter.hours }}H,
        {{ closerAtCounter.minutes }}m, {{ closerAtCounter.seconds }}s
      </p>

      <div class="flex flex-col gap-2">
        <p class="text-3xl font-medium text-primary">
          {{ totalVolume.eth.toFixed(2) }} {{ nativeSymbol }} =
          {{ formatCurrency(totalVolume.usd) }}
        </p>
        <p class="font-semibold text-primary">Pool Total Volume</p>
      </div>
    </div>
    <!-- <ReactionBtnGroup
      class="lg:hidden -ml-3"
      :comments-count="item.commentCount"
      :likes-count="item.likeCount"
    /> -->
  </div>
</template>
