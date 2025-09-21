import { useReadContract, type UseReadContractParameters } from "@wagmi/vue";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";




export type UseOwnedBetsIndexOptions = UseReadContractParameters<typeof aiPredictionV1.abi, 'getMasterRounds'>;

export const useOwnedBetsIndex = (options?: Omit<UseOwnedBetsIndexOptions, ''>) => {

    const result = useReadContract({
        abi: aiPredictionV1.abi,
        address: aiPredictionV1.address,
        functionName: "getMasterRounds",
        ...options
    });


    return result;
}