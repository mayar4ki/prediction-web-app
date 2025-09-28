<script setup lang="ts">
import { AlertCircle } from "lucide-vue-next";
import BetCard from "~/components/bet/BetCard/BetCard.vue";
import MinBetCard from "~/components/bet/MinBetCard/MinBetCard.vue";

const router = useRoute();

const itemPerPage = ref(6);
const currentPage = ref(1);
const cursor = computed(() => (currentPage.value - 1) * itemPerPage.value);

const filter = computed(() => router.query.tag as string);

const { totalCount, isLoading, mappedData } = useBetIndexApi({
  params: {
    skip: cursor,
    take: itemPerPage,
    tags: filter,
  },
});
</script>

<template>
  <section class="py-32 px-6 container-wrapper">
    <div class="container mx-auto">
      <div class="flex flex-col gap-6 text-center">
        <h2 class="text-4xl font-medium md:text-5xl">
          {{ $t("Latest in") }}
          <span class="capitalize">
            {{ $t(filter ?? "all") }}
          </span>
        </h2>
      </div>

      <div class="mt-20">
        <div
          v-if="false"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 items-stretch"
        >
          <MinBetCard
            v-for="item in mappedData"
            :key="Number(item.id)"
            :item="item"
          />
        </div>

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

    <Pagination
      v-slot="{ page }"
      class="my-6"
      :items-per-page="Number(itemPerPage)"
      :total="totalCount"
      :page="Number(currentPage)"
      :show-edges="true"
      :sibling-count="0"
      @update:page="
        (value) => {
          currentPage = value;
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
          {{ $t("Total Count") }} : {{ totalCount }}
        </div>
      </PaginationContent>
    </Pagination>
  </section>
</template>
