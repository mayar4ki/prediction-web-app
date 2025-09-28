<script lang="ts" setup>
import { useBetCard } from "../store";
import { cn } from "~/lib/utils";
import { calculatePayout } from "../helpers";

const { item, activeActionCard } = useBetCard()!;
const payout = computed(() => calculatePayout(item.value));
</script>

<template>
  <div class="flex flex-col gap-3 lg:flex-col">
    <Badge :variant="'success'" :class="cn('text-sm font-semibold', {})">
      {{ payout.yes }}x {{ $t("Payout") }}
    </Badge>

    <Button
      :variant="'success'"
      size="lg"
      @click="activeActionCard = 'form-yes'"
    >
      {{ $t("Bet Yes") }}
    </Button>

    <Button
      :variant="'destructive'"
      size="lg"
      @click="activeActionCard = 'form-no'"
    >
      {{ $t("Bet No") }}
    </Button>

    <Badge :variant="'destructive'" :class="cn('text-sm font-semibold', {})">
      {{ payout.no }}x {{ $t("Payout") }}
    </Badge>
  </div>
</template>
