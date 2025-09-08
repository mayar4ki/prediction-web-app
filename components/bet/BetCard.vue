<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BetResult } from "@/enums/common";
import { cn } from "@/lib/utils";
import type { Bet } from "@/types/common";
import { Icon } from "@iconify/vue";
import ReactionBtnGroup from "./ReactionBtnGroup.vue";

const { item } = defineProps<{
  item: Bet;
}>();
</script>

<template>
  <div
    class="grid gap-4 lg:grid-cols-3 xl:gap-8 opacity-100 hover:opacity-100 transition-opacity duration-300"
  >
    <div
      class="flex flex-col gap-8 border-border sm:flex-row lg:col-span-2 lg:border-r lg:pr-8"
    >
      <NuxtImg
        :src="item.img"
        alt="placeholder"
        class="aspect-29/35 h-full w-full max-w-60 rounded-2xl object-cover self-center sm:self-auto"
      />
      <div class="flex h-full w-full flex-col justify-between gap-4 py-1">
        <div class="flex flex-col gap-1">
          <p class="text-primary text-sm font-normal flex items-center gap-1">
            <Icon icon="radix-icons:clock" class="h-[1rem] w-[1rem]" />
            Will be resolved at:
            {{ formatDate(item.endTimestamp) }}
          </p>
          <p class="text-2xl font-semibold">
            {{ item.prompt }}
          </p>
        </div>

        <div class="flex justify-between items-center w-full">
          <p class="text-muted-foreground text-sm font-mono">
            Publisher: {{ item.master }}
          </p>
          <ReactionBtnGroup
            class="hidden lg:flex"
            :comments-count="item.commentCount"
            :likes-count="item.likeCount"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 lg:flex-col">
      <Badge
        :variant="item.result === BetResult.No ? 'outline' : 'success'"
        :class="
          cn('text-sm font-semibold', {
            'opacity-50': item.lockTimestamp < new Date(),
          })
        "
      >
        {{
          (
            (item.yesBetsVolume + item.noBetsVolume) /
            item.yesBetsVolume
          ).toFixed(2)
        }}x Payout
      </Badge>

      <Button
        :variant="item.result === BetResult.No ? 'outline' : 'success'"
        size="lg"
        :disabled="item.lockTimestamp < new Date()"
      >
        Bet Yes
      </Button>

      <Button
        :variant="item.result === BetResult.Yes ? 'outline' : 'destructive'"
        size="lg"
        :disabled="item.lockTimestamp < new Date()"
      >
        Bet No
      </Button>
      <Badge
        :variant="item.result === BetResult.Yes ? 'outline' : 'destructive'"
        :class="
          cn('text-sm font-semibold', {
            'opacity-50': item.lockTimestamp < new Date(),
          })
        "
      >
        {{
          (
            (item.yesBetsVolume + item.noBetsVolume) /
            item.noBetsVolume
          ).toFixed(2)
        }}x Payout
      </Badge>

      <p
        class="text-muted-foreground text-sm font-medium flex items-center gap-1"
      >
        <Icon icon="radix-icons:clock" class="h-[1rem] w-[1rem]" /> Betting
        Close at:
        {{ formatDate(item.lockTimestamp) }}
      </p>

      <div class="flex flex-col gap-2">
        <p class="text-4xl font-medium text-primary sm:text-5xl">
          {{ formatCurrency(item.yesBetsVolume + item.noBetsVolume) }}
        </p>
        <p class="font-semibold text-primary">Pool Total Volume</p>
      </div>
    </div>
    <ReactionBtnGroup
      class="lg:hidden -ml-3"
      :comments-count="item.commentCount"
      :likes-count="item.likeCount"
    />
  </div>
</template>
