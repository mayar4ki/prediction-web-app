import { useWriteContract } from "@wagmi/vue";
import type { Hash } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/config/chain";

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

    return {
        writeContract,
        isPending: computed(() => isPending.value),
        txHash
    }
}