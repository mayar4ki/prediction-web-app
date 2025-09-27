import { useQuery } from "@tanstack/vue-query";
import type { DeepMaybeRef } from "@vueuse/core";
import { useAccount, useReadContract } from "@wagmi/vue";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import { refreshInterval } from "~/_constants";
import type { _Tag, RoundMeta } from "~/_types/common";

export interface UseBetIndexApiOptions {
  params?: DeepMaybeRef<{
    skip?: number;
    take?: number;
    tags?: string | string[];
  }>;
}

export interface BetIndexFetch {
  rounds: Array<RoundMeta & { tags: _Tag[] }>;
  totalCount: number;
}

export const useBetIndexApi = (options?: UseBetIndexApiOptions) => {
  const apiResponse = useQuery({
    queryKey: ["bet/index", options?.params],
    queryFn: ({ signal, queryKey }) => {
      const [, params] = queryKey;
      return $fetch<BetIndexFetch>("/api/bet/list", {
        signal,
        params: params as Record<string, string>,
      });
    },
  });

  const { address } = useAccount();

  const explorerResponse = useReadContract({
    abi: aiPredictionV1.abi,
    address: aiPredictionV1.address,
    functionName: "pickRounds",
    args: [
      computed(() => address.value!),
      computed(() =>
        (apiResponse.data.value?.rounds ?? []).map((el) => BigInt(el.roundId))
      ),
    ],
    query: {
      refetchInterval: refreshInterval,
      enabled: computed(
        () =>
          (apiResponse.data.value?.rounds ?? []).length > 0 &&
          !apiResponse.isFetching.value
      ),
    },
  });

  const totalCount = computed(() => apiResponse.data.value?.totalCount ?? 0);

  const mappedData = computed(() => {
    const rounds = explorerResponse.data.value?.[0] ?? [];
    const userBets = explorerResponse.data.value?.[1] ?? [];
    const metaData = apiResponse.data.value?.rounds ?? [];

    return rounds.map((el, index) => ({
      ...el,
      userBetInfo: userBets[index],
      meta: metaData.find((m) => BigInt(m.roundId) === el.id),
    }));
  });

  return {
    isLoading: computed(
      () => apiResponse.isLoading.value || explorerResponse.isLoading.value
    ),
    mappedData,
    totalCount,
  };
};
