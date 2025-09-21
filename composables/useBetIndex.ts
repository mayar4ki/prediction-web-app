import { useReadContract, type UseReadContractParameters } from "@wagmi/vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";




export type UseBetIndexOptions = Omit<UseReadContractParameters<typeof aiPredictionV1.abi, 'getAllRounds'>, 'abi' | 'address' | 'functionName'>;

export const useBetIndex = (options?: UseBetIndexOptions) => {

    const result = useReadContract({
        abi: aiPredictionV1.abi,
        address: aiPredictionV1.address,
        functionName: "getAllRounds",
        ...options
    });

    return result;
}