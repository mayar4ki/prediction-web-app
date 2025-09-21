<script setup lang="ts">
import { useAccount, useWaitForTransactionReceipt } from "@wagmi/vue";
import { AlertCircle } from "lucide-vue-next";
import type { Hash } from "viem";
import Loader from "~/components/ui/backdrop-loader/Loader.vue";
import { blockExplorer } from "~/config/chain";

const route = useRoute();
const tx = computed(() => route.params.tx);

const { address } = useAccount();

const { data, error, isLoading } = useWaitForTransactionReceipt({
  hash: tx.value as Hash,
  pollingInterval: 10000,
  query: {
    enabled: !!tx.value,
  },
});

const kk = computed(() => [
  { key: "Status", value: data?.value?.status },
  { key: "From", value: data?.value?.from },
  { key: "To", value: data?.value?.to },
  { key: "Block Number", value: data?.value?.blockNumber },
]);
</script>

<template>
  <div class="relative py-32 px-6 container-wrapper">
    <Card
      class="relative grid grid-rows-[auto_auto_1fr_auto] overflow-hidden bg-background opacity-100"
    >
      <div
        v-if="isLoading"
        class="absolute w-full h-full border backdrop-blur-[3px] backdrop-brightness-95"
      >
        <Loader text="Confirming..." />

        <Alert class="absolute top-4 left-4 w-10/12" variant="default">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Check on explorer !</AlertTitle>
          <AlertDescription>
            <a
              class="text-sm text-muted-foreground hover:underline"
              :href="`${blockExplorer}${tx}`"
              target="_blank"
            >
              {{ tx }}
            </a>
          </AlertDescription>
        </Alert>
      </div>

      <div
        v-if="error?.name"
        class="absolute w-full h-full p-4 border backdrop-blur-[3px] backdrop-brightness-95"
      >
        <Alert variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Error !</AlertTitle>
          <AlertDescription>
            {{ error?.name }}
          </AlertDescription>
        </Alert>
      </div>

      <CardHeader>
        <div class="text-lg font-semibold md:text-xl">Transaction Details</div>
      </CardHeader>
      <CardContent>
        <div class="text-sm font-medium leading-none text-foreground">
          Transaction Hash:
          <a
            class="text-sm text-muted-foreground hover:underline"
            :href="`${blockExplorer}${tx}`"
            target="_blank"
          >
            {{ tx }}
          </a>
        </div>
        <Separator class="my-4" />

        <template v-for="item in kk" :key="item.key">
          <div class="text-sm font-medium leading-none text-foreground">
            {{ item.key }}:
            <span class="text-sm text-muted-foreground">{{
              item.value?.toString()
            }}</span>
          </div>
          <Separator class="my-4" />
        </template>
      </CardContent>

      <CardFooter>
        <NuxtLink as-child :href="`/bet/created-bets/${address}`">
          <Button> Check: My Created Bets </Button>
        </NuxtLink>
      </CardFooter>
    </Card>
  </div>
</template>
