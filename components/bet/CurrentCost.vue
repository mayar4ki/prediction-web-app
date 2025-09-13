<script lang="ts" setup>
import { useReadContract } from "@wagmi/vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { chain } from "~/config/chain";
import { formatUnits } from "viem";

const result = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  chainId: chain.id,
  functionName: "estimateFee",
  args: [BigInt("500000")],
});

const result2 = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  chainId: chain.id,
  functionName: "latestRoundData",
});

const currentPrice = computed(() => {
  const priceInGwei = BigInt(result.data.value ?? 0);

  const ethPrice = BigInt(result2.data.value?.toString().split(",")[1] ?? "0");

  const priceInUSD =
    Number(formatUnits(priceInGwei, 9)) * Number(formatUnits(ethPrice, 8));

  const timestamp = Number(result2.data.value?.toString().split(",")[3]);

  const lastUpdatedAt = new Date(timestamp * 1000);

  return {
    priceInEth: Number(formatUnits(priceInGwei, 9)),
    priceInGwei: priceInGwei.toLocaleString(),
    priceInUSD,
    lastUpdatedAt,
  };
});
</script>

<template>
  <div>
    Estimated gas cost: {{ currentPrice.priceInGwei }} Gwei =
    {{ currentPrice.priceInEth }} ETH =
    {{ formatCurrency(currentPrice.priceInUSD) }}
  </div>
  <div>
    Last Updated:
    {{ formatDateTime(currentPrice.lastUpdatedAt) }}
  </div>
  <div>{{ result.error }}</div>
  <div>{{ result2.error }}</div>
</template>
