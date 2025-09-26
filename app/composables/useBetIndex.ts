import { useReadContract, type UseReadContractParameters } from "@wagmi/vue";
import type { UnwrapRef } from "vue";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";

export type _UseBetIndexOptions = UseReadContractParameters<
  typeof aiPredictionV1.abi,
  "getAllRounds"
>;

type NoRefUseBetIndexOptions = UnwrapRef<_UseBetIndexOptions>;

export type UseBetIndexOptions = Omit<
  NoRefUseBetIndexOptions,
  "address" | "abi" | "functionName"
>;

export const useBetIndex = (options?: UseBetIndexOptions) => {
  const result = useReadContract({
    abi: aiPredictionV1.abi,
    address: aiPredictionV1.address,
    functionName: "getAllRounds",
    ...options,
    query: {
      refetchInterval: 15000,
      ...options?.query,
    },
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
};
