import { useReadContract, type UseReadContractParameters } from "@wagmi/vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";




export type UseBetIndexOptions = UseReadContractParameters<typeof aiPredictionV1.abi, 'getAllRounds'>;

export const useBetIndex = (options?: Omit<UseBetIndexOptions, ''>) => {

    const result = useReadContract({
        abi: aiPredictionV1.abi,
        address: aiPredictionV1.address,
        functionName: "getAllRounds",
        ...options
    });

    const mappedData = computed(() => {
        const rounds = result.data.value?.[0] ?? [];
        const userBets = result.data.value?.[1] ?? [];

        return rounds.map((el, index) => ({
            ...el,
            userBetInfo: userBets[index],
        }));
    });

    return { ...result, mappedData };
}