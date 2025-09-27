import { useReadContract, type UseReadContractParameters } from "@wagmi/vue";
import type { UnwrapRef } from "vue";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import { refreshInterval } from "~/_constants";

export type _UseOwnedBetsIndexOptions = UseReadContractParameters<
  typeof aiPredictionV1.abi,
  "getMasterRounds"
>;

type NoRefUseOwnedBetsIndexOptions = UnwrapRef<_UseOwnedBetsIndexOptions>;

export type UseOwnedBetsIndexOptions = Omit<
  NoRefUseOwnedBetsIndexOptions,
  "address" | "abi" | "functionName"
>;

export const useOwnedBetsIndex = (options?: UseOwnedBetsIndexOptions) => {
  const result = useReadContract({
    abi: aiPredictionV1.abi,
    address: aiPredictionV1.address,
    functionName: "getMasterRounds",
    ...options,
    query: {
      refetchInterval: refreshInterval,
      ...options?.query,
    },
  });

  return result;
};
