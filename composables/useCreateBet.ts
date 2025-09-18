import { useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/config/chain";
import { abi, address } from "~/config/ai-prediction-v1";


export const useCreateBet = () => {

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
                navigateTo(`/bet/create/result/${data}`);
            },
        },
    });

    type _writeContractProps = WriteContractParameters<typeof abi, 'createRound'>;

    const _writeContract = (args: Omit<_writeContractProps, 'address' | 'abi' | 'functionName' | 'chain' | 'account'>) => writeContract({
        ...args as _writeContractProps,
        address: address,
        abi: abi,
        functionName: "createRound",
    })


    return {
        writeContract: _writeContract,
        isPending: computed(() => isPending.value),
        txHash
    }
}