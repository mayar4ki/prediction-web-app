import { useReadContract, type UseReadContractParameters } from "@wagmi/vue";
import type { UnwrapRef } from "vue";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import { refreshInterval } from "~/_constants";

export type _UseBetIndexPickerOptions = UseReadContractParameters<
  typeof aiPredictionV1.abi,
  "pickRounds"
>;

type NoRefUseBetIndexPickerOptions = UnwrapRef<_UseBetIndexPickerOptions>;

export type UseBetIndexPickerOptions = Omit<
  NoRefUseBetIndexPickerOptions,
  "address" | "abi" | "functionName"
>;

export const useBetIndexPicker = (options?: UseBetIndexPickerOptions) => {
  const result = useReadContract({
    abi: aiPredictionV1.abi,
    address: aiPredictionV1.address,
    functionName: "pickRounds",
    ...options,
    query: {
      refetchInterval: refreshInterval,
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
