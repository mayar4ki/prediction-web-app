import { useTransactionReceipt, useWriteContract } from "@wagmi/vue";
import type { Hash } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/config/chain";



export interface UseCreateBetOptions {
    onSuccess?: (data: Hash) => void;
    onError?: (data: Hash) => void;
}

export const useCreateBet = (options?: UseCreateBetOptions) => {

    const txHash = ref<Hash | undefined>();

    const { writeContract, isPending } = useWriteContract({
        mutation: {
            onSuccess(data) {
                txHash.value = data;
                toast.success("Transaction has been sent", {
                    description: h('a', {
                        href: `${blockExplorer}${data}`,
                        target: '_blank',
                        style: {
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }
                    }, data),
                    position: "top-right",
                });


            },
        },
    });

    const tx = useTransactionReceipt({
        hash: computed(() => txHash.value),
        query: {
            enabled: computed(() => !!txHash.value),
            retryDelay: 2500,
            retry: 10,
        },
    });

    watch(
        () => tx.data?.value,
        (newReceipt) => {
            if (newReceipt) {
                if (newReceipt.status === "success") {
                    options?.onSuccess?.(txHash.value!);
                    toast.success("Transaction confirmed", {
                        description: h('a', {
                            href: `${blockExplorer}${txHash.value}`,
                            target: '_blank',
                            style: {
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            }
                        }, txHash.value),
                        position: "top-right",
                    });
                } else if (newReceipt.status === "reverted") {
                    options?.onError?.(txHash.value!);
                    toast.success("Transaction Failed", {
                        description: h('a', {
                            href: `${blockExplorer}${txHash.value}`,
                            target: '_blank',
                            style: {
                                textDecoration: 'none',
                                fontWeight: 'bold'
                            },
                            class: 'text-destructive'
                        }, txHash.value),
                        position: "top-right",
                    })
                }
            }
        }
    );

    return {
        writeContract,
        isPending: computed(() => isPending.value || tx.isLoading.value),
        txHash,
        txStatus: computed(() => tx.data?.value?.status),
    }
}