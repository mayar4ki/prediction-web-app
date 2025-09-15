<script setup lang="ts">
import { useReadContract } from "@wagmi/vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { chain } from "~/config/chain";
import { formatUnits } from "viem";
import { callBackGas } from "~/config/ai-prediction-v1/constants";

import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import type { HTMLAttributes } from "vue";

const result = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  chainId: chain.id,
  functionName: "estimateFee",
  args: [callBackGas],
});

const result2 = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  chainId: chain.id,
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
    <FormLabel>Fees (ETH)</FormLabel>
    <FormControl>
      <Input v-bind="props" disabled />
    </FormControl>
    <FormDescription>
      <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
        <li>{{ currentPrice.priceInGwei }} Gwei</li>
        <li>{{ formatCurrency(currentPrice.priceInUSD) }} USD</li>
        <li>
          Last Update:
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
