<script setup lang="ts">
import { FlexRender } from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useReadContract } from "@wagmi/vue";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import { blockExplorer } from "~/_config/chain";
import { isAddress, type Hash } from "viem";
import { useBetsTable } from "~/components/bet/created-bets/useBetsTable";
import type { RoundData } from "~/_types/common";

const route = useRoute();
const _address = computed(() => route.params.address as Hash);

const { data: totalCount } = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  functionName: "getMasterRoundsLength",
  args: [_address],
  query: {
    enabled: isAddress(String(_address.value)),
  },
});

const itemPerPage = ref(BigInt(10));
const currentPage = ref(BigInt(0));

const result = useOwnedBetsIndex({
  args: [
    _address,
    computed(() => currentPage.value * itemPerPage.value),
    itemPerPage,
  ],
  query: {
    enabled: isAddress(String(_address.value)),
  },
});

const { table, columns } = useBetsTable({
  data: computed(() => result.data.value?.[0] ?? []) as MaybeRef<RoundData[]>,
});
</script>

<template>
  <div class="relative py-32 px-6 container-wrapper">
    <div class="flex flex-col md:flex-row justify-between py-6">
      <div class="text-lg font-semibold md:text-xl">
        Creation History for:
        <a
          class="text-sm text-muted-foreground hover:underline"
          :href="`${blockExplorer}${_address}`"
          target="_blank"
          >{{ _address }}
        </a>
      </div>

      <NuxtLink to="/bet/create">
        <Button>
          Create New Bet <Icon name="radix-icons:plus" :size="18" />
        </Button>
      </NuxtLink>
    </div>

    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <Pagination
      v-slot="{ page }"
      class="my-6"
      :items-per-page="Number(itemPerPage)"
      :total="Number(totalCount)"
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
          Total Count : {{ totalCount }}
        </div>
      </PaginationContent>
    </Pagination>
  </div>
</template>
