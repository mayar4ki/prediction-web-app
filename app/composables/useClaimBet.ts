import { useWaitForTransactionReceipt, useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/_config/chain";
import { abi, address } from "~/_config/ai-prediction-v1";

export interface UseClaimBetOptions {
  onSuccess?: (data?: Hash) => void;
}

export const useClaimBet = (options: UseClaimBetOptions) => {
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

  type TriggerProps = WriteContractParameters<typeof abi, "claim">;

  const trigger = (
    args: Omit<
      TriggerProps,
      "address" | "abi" | "functionName" | "chain" | "account"
    >
  ) =>
    writeContract({
      ...(args as TriggerProps),
      address: address,
      abi: abi,
      functionName: "claim",
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
    trigger,
    isPending: isPending,
    isConfirming: isLoading,
  };
};
