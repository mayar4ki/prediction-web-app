import { useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/config/chain";
import { abi, address } from "~/config/ai-prediction-v1";


export interface UsePlaceBetOptions {
    onSuccess?: (data?: Hash) => void
}

export const usePlaceBet = (options: UsePlaceBetOptions) => {

    const txHash = ref<Hash | undefined>();

    const { writeContract, isPending } = useWriteContract({
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

                options.onSuccess?.(data);
                txHash.value = data;
            },
        },
    });


    type _writeContractPropsBetYes = WriteContractParameters<typeof abi, 'betYes'>;

    const _writeContractBetYes = (args: Omit<_writeContractPropsBetYes, 'address' | 'abi' | 'functionName' | 'chain' | 'account'>) => writeContract({
        ...args as _writeContractPropsBetYes,
        address: address,
        abi: abi,
        functionName: "betYes",
    })


    type _writeContractPropsBetNo = WriteContractParameters<typeof abi, 'betNo'>;

    const _writeContractBetNo = (args: Omit<_writeContractPropsBetNo, 'address' | 'abi' | 'functionName' | 'chain' | 'account'>) => writeContract({
        ...args as _writeContractPropsBetNo,
        address: address,
        abi: abi,
        functionName: "betNo",
    })

    return {
        writeContractBetYes: _writeContractBetYes,
        writeContractBetNo: _writeContractBetNo,
        isPending: computed(() => isPending.value)
    }
}