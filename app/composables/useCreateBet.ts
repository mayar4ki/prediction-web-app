import { useAccount, useSignMessage, useWaitForTransactionReceipt, useWatchContractEvent, useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/_config/chain";
import { abi, address } from "~/_config/ai-prediction-v1";
import { useMutation } from "@tanstack/vue-query";



export const useCreateBet = () => {

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
            },
        },
    });

    type TriggerProps = WriteContractParameters<typeof abi, 'createRound'>;

    const trigger = (args: Omit<TriggerProps, 'address' | 'abi' | 'functionName' | 'chain' | 'account'>) => writeContract({
        ...args as TriggerProps,
        address: address,
        abi: abi,
        functionName: "createRound",
    })



    const { isLoading, data: t } = useWaitForTransactionReceipt({
        hash: computed(() => data.value),
        pollingInterval: 10000,

        query: {
            enabled: !!computed(() => data.value),

        },
    });

    watchEffect(() => {
        if (t.value?.status === 'success' && isWaitingEvent.value === false) {
            isWaitingEvent.value = true;
        }
    })

    const { address: myAddress } = useAccount();


    const isWaitingEvent = ref<boolean>(false);

    useWatchContractEvent({
        address: address,
        abi: abi,
        eventName: 'CreateNewRound',
        args: {
            master: myAddress
        },
        enabled: isWaitingEvent,
        onLogs: async (logs) => {
            isWaitingEvent.value = false;

            toast.success("Event has been received.");

            const roundId = logs[0]?.args.roundId;

            if (files.value[0] && roundId) {
                const signature = await signMessageAsync({
                    message: roundId.toString(),
                });

                await mutateAsync({
                    files: files.value,
                    signature: signature,
                    itemId: roundId.toString(),
                });
            }

            if (roundId) {
                navigateTo(`/bet/show/${roundId.toString()}`);
            } else {
                navigateTo(`/bet/created-bets/${address}`);
            }

        }
    });

    const { handleFileInput, files, clearFiles } = useFileStorage();
    const { mutateAsync, isPending: isPendingPhoto } = useMutation({
        mutationFn: (body: {
            signature: `0x${string}`;
            files: any;
            itemId: string;
        }) => $fetch<unknown>("/api/bet/create", { method: "POST", body }),
    });
    const { isPending: isPendingSignature, signMessageAsync } = useSignMessage();




    return {
        trigger,
        isPending: isPending,
        isConfirming: isLoading,
        isWaitingEvent, isPendingPhoto, isPendingSignature,
        filesStorage: { handleFileInput, files, clearFiles }
    }
}