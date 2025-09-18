<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { useReadContract } from "@wagmi/vue";
import { AlertCircle } from "lucide-vue-next";
import { BetCard } from "~/components/bet/BetCard";
import Loader from "~/components/ui/backdrop-loader/Loader.vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";
import { chain } from "~/config/chain";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";

const { data: roundIdCounter } = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  chainId: chain.id,
  functionName: "roundIdCounter",
});

const result2 = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  chainId: chain.id,
  functionName: "latestRoundData",
});

const itemPerPage = ref(BigInt(10));
const currentPage = ref(BigInt(0));

const result = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  chainId: chain.id,
  functionName: "getAllRounds",
  args: [computed(() => currentPage.value * itemPerPage.value), itemPerPage],
});

const data = computed(() => result.data.value?.[0] ?? []);
</script>

<template>
  <section class="py-32 px-6 container-wrapper">
    <div class="container mx-auto">
      <div class="flex flex-col gap-6 text-center">
        <h2 class="text-4xl font-medium md:text-5xl">Latest Bets</h2>
      </div>
      <div class="mt-20">
        <template v-for="(item, index) in data" :key="item.id">
          <BetCard :item="item" :eth-price-in-u-s-d="result2.data.value?.[1]" />
          <Separator v-if="index < data.length - 1" class="my-12" />
        </template>

        <div
          v-if="result.isLoading.value"
          class="flex flex-col justify-center items-center gap-6 mb-28"
        >
          <div class="h-[30vh]">
            <Loader />
          </div>
        </div>

        <div
          v-else-if="data.length === 0"
          class="flex flex-col justify-center items-center gap-6 mb-28"
        >
          <NuxtImg
            src="./img/error.png"
            width="155"
            height="200"
            class="opacity-40"
          />
          <Alert variant="default" class="max-w-sm">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Whoops !</AlertTitle>
            <AlertDescription> No results. </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>

    <Pagination
      v-slot="{ page }"
      class="my-6"
      :items-per-page="Number(itemPerPage)"
      :total="Number(roundIdCounter)"
      :page="Number(currentPage) + 1"
      :show-edges="true"
      :sibling-count="0"
      @update:page="
        (value) => {
          currentPage = BigInt(value - 1);
        }
      "
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious />

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
          >
            {{ item.value }}
          </PaginationItem>
        </template>

        <PaginationNext />
        <div class="text-sm font-medium text-muted-foreground">
          Total Count : {{ roundIdCounter }}
        </div>
      </PaginationContent>
    </Pagination>
  </section>
</template>
