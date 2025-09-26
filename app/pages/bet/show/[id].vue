<script setup lang="ts">
import { useAccount } from "@wagmi/vue";
import { AlertCircle } from "lucide-vue-next";
import BetCard from "~/components/bet/BetCard/BetCard.vue";
import Loader from "~/components/ui/backdrop-loader/_Loader.vue";
import { blockExplorer } from "~/_config/chain";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";

const router = useRoute();

const { address } = useAccount();

const { mappedData, isLoading } = useBetIndex({
  args: [address.value!, BigInt(router.params.id as string), BigInt(1)],
  query: {
    enabled: computed(() => !!router.params.id),
  },
});
</script>

<template>
  <section class="py-32 px-6 container-wrapper">
    <div class="container mx-auto">
      <div v-if="mappedData.length > 0" class="flex flex-col">
        <a
          class="text-1xl font-medium md:text-2xl text-muted-foreground hover:underline font-mono"
          :href="`${blockExplorer}${aiPredictionV1.address}#readContract`"
          target="_blank"
        >
          Check on Explorer #ID: {{ router.params.id }}
        </a>
      </div>

      <div class="mt-10">
        <template v-for="(item, index) in mappedData" :key="item.id">
          <BetCard :item="item" />
          <Separator v-if="index < mappedData.length - 1" class="my-12" />
        </template>

        <div
          v-if="isLoading"
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
  </section>
</template>
