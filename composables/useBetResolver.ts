import { useWaitForTransactionReceipt, useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/config/chain";
import { abi, address } from "~/config/ai-prediction-v1";


export interface UseBetResolverOption {
    onSuccess?: (data?: Hash) => void
}

export const useBetResolver = (options: UseBetResolverOption) => {

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


    type TriggerProps = WriteContractParameters<typeof abi, 'endRound'>;

    const trigger = (args: Omit<TriggerProps, 'address' | 'abi' | 'functionName' | 'chain' | 'account'>) => writeContract({
        ...args as TriggerProps,
        address: address,
        abi: abi,
        functionName: "endRound",
    })


    const { isLoading, data: t } = useWaitForTransactionReceipt({
        hash: computed(() => data.value),
        pollingInterval: 10000,
        query: {
            enabled: !!computed(() => data.value)
        },
    });


    watchEffect(() => {
        if (t.value?.status === 'success') {
            options.onSuccess?.(txHash.value)
        }
    })

    return {
        trigger,
        isPending: isPending,
        isConfirming: isLoading
    }
}