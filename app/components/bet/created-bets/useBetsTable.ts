import type { ColumnDef } from "@tanstack/vue-table";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { h } from "vue";

import { nativeSymbol } from "~/_config/chain";
import { formatUnits } from "viem";
import type { RoundData } from "~/_types/common";
import DataTableDropDown from "~/components/bet/created-bets/DataTableDropDown.vue";

export type UseBetsTableProps = {
  data: MaybeRef<RoundData[]>;
};

export const useBetsTable = ({ data }: UseBetsTableProps) => {
  const { convert: convertEthToUsd } = useEthToUsd();

  const columns: ColumnDef<RoundData>[] = [
    {
      header: "#ID",
      accessorKey: "id",
      cell: ({ row }) =>
        h("div", { class: "text-center " }, row.getValue("id")?.toString()),
    },
    {
      header: translate("Prompt"),
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
      header: translate("Lock Time (Bets stopped)"),
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
      header: translate("Close Time (Resolve)"),
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
      header: translate(`Resolved (Calculated)`),
      accessorKey: "rewardBaseCall",

      cell: ({ row }) => {
        const tmp = row.getValue<bigint>("rewardBaseCall") === BigInt(0);
        return h(
          "div",
          { class: "capitalize text-center" },
          tmp ? "NO" : "YES"
        );
      },
    },
    {
      header: translate(`Total volume ({nativeSymbol} / USD)`, {
        nativeSymbol,
      }),
      accessorKey: "totalVolume",
      cell: ({ row }) => {
        const tmp = Number(
          formatUnits(row.getValue<bigint>("totalVolume"), 18)
        );

        return h(
          "div",
          { class: "capitalize" },
          tmp.toFixed(4) + " ETH / " + formatCurrency(convertEthToUsd(tmp))
        );
      },
    },

    {
      header: translate("Creator Unclaimed Fees (Wei / USD)"),
      accessorKey: "masterBalance",
      cell: ({ row }) => {
        const weiShare = row.getValue<bigint>("masterBalance");
        const tmp = Number(formatUnits(weiShare, 18));

        return h(
          "div",
          { class: "capitalize" },
          weiShare.toString() +
            " wei /  " +
            formatCurrency(convertEthToUsd(tmp))
        );
      },
    },

    {
      id: "actions",
      header: translate(`Actions`),
      cell: (p) => {
        return h(DataTableDropDown, {
          cellCtx: p,
        });
      },
    },
  ];

  const table = useVueTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return { table, columns };
};
