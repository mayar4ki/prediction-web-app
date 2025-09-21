import { useWaitForTransactionReceipt, useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/config/chain";
import { abi, address } from "~/config/ai-prediction-v1";


export interface UsePlaceBetOptions {
    onSuccess?: (data?: Hash) => void
}

export const useClaimMasterFees = (options: UsePlaceBetOptions) => {

    const txHash = ref<Hash | undefined>();

    const { writeContract, isPending, data } = useWriteContract({
        mutation: {
            onSuccess(data) {
                toast.success("Transaction has been sent", {
                    description: h('a', {
                        href: `${blockExplorer}${data}`,
                        target: '_blank',
                        style: {
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }
                    }, data)
                });
                txHash.value = data;
            }
        },
    });


    type claimMasterFeesProps = WriteContractParameters<typeof abi, 'claimMasterBalance'>;

    const _claimMasterFees = (args: Omit<claimMasterFeesProps, 'address' | 'abi' | 'functionName' | 'chain' | 'account'>) => writeContract({
        ...args as claimMasterFeesProps,
        address: address,
        abi: abi,
        functionName: "claimMasterBalance",
    })


    const { isLoading, data: t } = useWaitForTransactionReceipt({
        hash: computed(() => data.value),
        pollingInterval: 10000,

        query: {
            enabled: !!computed(() => data.value),

        },
    });


    watchEffect(() => {
        if (t.value?.status === 'success') {
            options.onSuccess?.(txHash.value)
        }
    })

    return {
        claimMasterFees: _claimMasterFees,
        isPending: computed(() => isPending.value || isLoading.value)
    }
}