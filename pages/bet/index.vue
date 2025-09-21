<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import { useAccount, useReadContract } from "@wagmi/vue";
import { AlertCircle } from "lucide-vue-next";
import BetCard from "~/components/bet/BetCard/BetCard.vue";
import Loader from "~/components/ui/backdrop-loader/Loader.vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";

const { data: roundIdCounter } = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  functionName: "roundIdCounter",
});

const itemPerPage = ref(BigInt(4));
const currentPage = ref(BigInt(1));

const cursor = computed(() => {
  if (roundIdCounter.value) {
    const pagesCount = BigInt(
      Math.ceil((Number(roundIdCounter.value) + 1) / Number(itemPerPage.value))
    );

    const flip = (pagesCount - currentPage.value) * itemPerPage.value;
    return flip;
  }

  const skip = (currentPage.value - BigInt(1)) * itemPerPage.value;

  return skip;
});

const { address } = useAccount();

const { mappedData, isFetching } = useBetIndex({
  args: [address, cursor, itemPerPage],
  query: {
    enabled: computed(() => !!roundIdCounter.value && !!address.value),
  },
});
</script>

<template>
  <section class="py-32 px-6 container-wrapper">
    <div class="container mx-auto">
      <div class="flex flex-col gap-6 text-center">
        <h2 class="text-4xl font-medium md:text-5xl">Latest Bets</h2>
      </div>
      <div class="mt-20">
        <template v-for="(item, index) in mappedData" :key="item.id">
          <BetCard :item="item" />
          <Separator v-if="index < mappedData.length - 1" class="my-12" />
        </template>

        <div
          v-if="isFetching"
          class="flex flex-col justify-center items-center gap-6 mb-28"
        >
          <div class="h-[30vh]">
            <Loader />
          </div>
        </div>

        <div
          v-else-if="mappedData.length === 0"
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
      :page="Number(currentPage)"
      :show-edges="true"
      :sibling-count="0"
      @update:page="
        (value) => {
          currentPage = BigInt(value);
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
