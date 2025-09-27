<script setup lang="ts">
import { useReadContract } from "@wagmi/vue";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import * as ethUsdPriceFeed from "~/_config/eth-usd-price-feed";
import { nativeSymbol } from "~/_config/chain";
import { formatUnits } from "viem";
import type { HTMLAttributes } from "vue";

const result = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  functionName: "estimateFee",
});

const result2 = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  functionName: "latestRoundData",
});

const currentPrice = computed(() => {
  const priceInGwei =
    (BigInt(result.data.value ?? 0) * BigInt(115)) / BigInt(100);

  const ethPrice = BigInt(result2.data.value?.toString().split(",")[1] ?? "0");

  const priceInUSD =
    Number(formatUnits(priceInGwei, 9)) * Number(formatUnits(ethPrice, 8));

  const timestamp = Number(result2.data.value?.toString().split(",")[3]);

  const lastUpdatedAt = timestamp > 0 ? new Date(timestamp * 1000) : null;

  return {
    priceInEth: Number(formatUnits(priceInGwei, 9)),
    priceInGwei: priceInGwei.toLocaleString(),
    priceInUSD,
    lastUpdatedAt,
  };
});

const props = defineProps<{
  defaultValue?: string | number;
  modelValue?: string | number;
  class?: HTMLAttributes["class"];
  placeholder?: HTMLAttributes["placeholder"];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

function emitFee() {
  const priceInGwei =
    (BigInt(result.data.value ?? 0) * BigInt(115)) / BigInt(100);

  const fee = Number(formatUnits(priceInGwei, 9));
  if (fee) {
    emits("update:modelValue", fee);
  }
}

watch(result.data, () => {
  emitFee();
});

onMounted(() => {
  emitFee();
});
</script>

<template>
  <FormItem>
    <FormLabel>{{ $t("Fees") }} ({{ nativeSymbol }})</FormLabel>
    <FormControl>
      <Input v-bind="props" disabled />
    </FormControl>
    <FormDescription>
      <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
        <li>{{ currentPrice.priceInGwei }} Gwei</li>
        <li>{{ formatCurrency(currentPrice.priceInUSD) }} USD</li>
        <li>
          {{ $t("Last Update") }}:
          {{
            currentPrice.lastUpdatedAt &&
            formatDateTime(currentPrice.lastUpdatedAt)
          }}
        </li>
      </ul>
    </FormDescription>
    <FormMessage />
  </FormItem>
</template>
