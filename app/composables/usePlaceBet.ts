import { useWaitForTransactionReceipt, useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/_config/chain";
import { abi, address } from "~/_config/ai-prediction-v1";

export interface UsePlaceBetOptions {
  onSuccess?: (data?: Hash) => void;
}

export const usePlaceBet = (options: UsePlaceBetOptions) => {
  const txHash = ref<Hash | undefined>();

  const { writeContract, isPending, data } = useWriteContract({
    mutation: {
      onSuccess(data) {
        toast.success(translate("Transaction has been sent"), {
          description: h(
            "a",
            {
              href: `${blockExplorer}${data}`,
              target: "_blank",
              style: {
                textDecoration: "none",
                fontWeight: "bold",
              },
            },
            data
          ),
        });

        txHash.value = data;
      },
    },
  });

  type _writeContractPropsBetYes = WriteContractParameters<
    typeof abi,
    "betYes"
  >;

  const _writeContractBetYes = (
    args: Omit<
      _writeContractPropsBetYes,
      "address" | "abi" | "functionName" | "chain" | "account"
    >
  ) =>
    writeContract({
      ...(args as _writeContractPropsBetYes),
      address: address,
      abi: abi,
      functionName: "betYes",
    });

  type _writeContractPropsBetNo = WriteContractParameters<typeof abi, "betNo">;

  const _writeContractBetNo = (
    args: Omit<
      _writeContractPropsBetNo,
      "address" | "abi" | "functionName" | "chain" | "account"
    >
  ) =>
    writeContract({
      ...(args as _writeContractPropsBetNo),
      address: address,
      abi: abi,
      functionName: "betNo",
    });

  const { isLoading, data: t } = useWaitForTransactionReceipt({
    hash: computed(() => data.value),
    pollingInterval: 10000,

    query: {
      enabled: !!computed(() => data.value),
    },
  });

  watchEffect(() => {
    if (t.value?.status === "success") {
      options.onSuccess?.(txHash.value);
    }
  });

  return {
    writeContractBetYes: _writeContractBetYes,
    writeContractBetNo: _writeContractBetNo,
    isPending: isPending,
    isConfirming: isLoading,
  };
};
