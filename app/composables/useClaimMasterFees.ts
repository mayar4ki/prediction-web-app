import { useWaitForTransactionReceipt, useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/_config/chain";
import { abi, address } from "~/_config/ai-prediction-v1";
import { pollingInterval } from "~/_constants";

export interface UseClaimMasterFeesOptions {
  onSuccess?: (data?: Hash) => void;
}

export const useClaimMasterFees = (options: UseClaimMasterFeesOptions) => {
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

  type TriggerProps = WriteContractParameters<typeof abi, "claimMasterBalance">;

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
      functionName: "claimMasterBalance",
    });

  const { isLoading, data: t } = useWaitForTransactionReceipt({
    hash: computed(() => data.value),
    pollingInterval: pollingInterval,

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
