<script setup lang="ts">
import type { ColumnDef } from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { h } from "vue";
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
import * as aiPredictionV1 from "~/config/ai-prediction-v1";
import { blockExplorer, chain, nativeSymbol } from "~/config/chain";
import { isAddress, type Hash } from "viem";
import type { RoundData } from "~/types/common";

const route = useRoute();
const _address = computed(() => route.params.address);

const { data: totalCount } = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  chainId: chain.id,
  functionName: "getMasterRoundsLength",
  args: [_address.value as Hash],
  query: {
    enabled: isAddress(String(_address.value)),
  },
});

const itemPerPage = ref(BigInt(10));
const currentPage = ref(BigInt(0));

const result = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  chainId: chain.id,
  functionName: "getMasterRounds",
  args: [
    _address.value as Hash,
    computed(() => currentPage.value * itemPerPage.value),
    itemPerPage,
  ],
  query: {
    enabled: isAddress(String(_address.value)),
  },
});

const columns: ColumnDef<RoundData>[] = [
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) =>
      h("div", { class: "capitalize" }, row.getValue("id")?.toString()),
  },
  {
    header: "Prompt",
    accessorKey: "prompt",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "capitalize max-w-[310px] min-w-[220px] text-wrap" },
        row.getValue("prompt")
      );
    },
  },
  {
    header: "Lock Time",
    accessorKey: "lockTimestamp",
    cell: ({ row }) => {
      let txt = "Err";
      try {
        const unixDate = Number(
          row.getValue<number>("lockTimestamp").toString()
        );
        txt = formatDateTime(new Date(unixDate * 1000));
      } catch {
        //
      }

      return h("div", { class: "capitalize" }, txt);
    },
  },
  {
    header: "Close Time",
    accessorKey: "closeTimestamp",
    cell: ({ row }) => {
      let txt = "Err";
      try {
        const unixDate = Number(
          row.getValue<number>("closeTimestamp").toString()
        );
        txt = formatDateTime(new Date(unixDate * 1000));
      } catch {
        //
      }

      return h("div", { class: "capitalize" }, txt);
    },
  },
  {
    header: `Total volume (${nativeSymbol})`,
    accessorKey: "totalVolume",
  },
];

const table = useVueTable({
  data: computed(() => result.data.value?.[0] ?? []) as MaybeRef<RoundData[]>,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
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
