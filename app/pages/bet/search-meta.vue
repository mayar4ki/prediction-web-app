<script setup lang="ts">
import BetCard from "~/components/bet/BetCard/BetCard.vue";

const { query } = useRoute();

const itemPerPage = ref(4);
const currentPage = ref(1);
const cursor = computed(() => (currentPage.value - 1) * itemPerPage.value);

const { totalCount, isLoading, mappedData } = useBetIndexApi({
  params: {
    skip: cursor.value,
    take: itemPerPage.value,
    tags: typeof query.tag === "string" ? [query.tag] : [],
  },
});
</script>

<template>
  <section class="py-32 px-6 container-wrapper">
    <div class="container mx-auto">
      <div class="flex flex-col gap-6 text-center">
        <h2 class="text-4xl font-medium md:text-5xl">
          Latest in
          <span class="capitalize">
            {{ query.tag }}
          </span>
        </h2>
      </div>

      <div class="mt-20">
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
          Total Count : {{ totalCount }}
        </div>
      </PaginationContent>
    </Pagination>
  </section>
</template>
