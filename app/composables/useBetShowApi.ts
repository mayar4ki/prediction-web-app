import { useQuery } from "@tanstack/vue-query";
import { useAccount, useReadContract } from "@wagmi/vue";
import * as aiPredictionV1 from "~/_config/ai-prediction-v1";
import type { _Tag, RoundMeta } from "~/_types/common";

export interface UseBetShowApiOptions {
  id: string;
}

export interface BetShowFetch {
  round: RoundMeta & { tags: _Tag[] };
}

export const useBetShowApi = (options: UseBetShowApiOptions) => {
  const { address } = useAccount();

  const itemId = options.id;

  const explorerResponse = useReadContract({
    abi: aiPredictionV1.abi,
    address: aiPredictionV1.address,
    functionName: "getAllRounds",
    args: [address.value!, BigInt(itemId), BigInt(1)],

    query: {
      refetchInterval: 15000,
      enabled: !!itemId,
    },
  });

  const apiResponse = useQuery({
    queryKey: ["bet/show", itemId],
    queryFn: ({ signal, queryKey }) => {
      const [, params] = queryKey;
      return $fetch<BetShowFetch>(`/api/bet/show/${params}`, { signal });
    },
  });

  const mappedData = computed(() => {
    const rounds = explorerResponse.data.value?.[0] ?? [];
    const userBets = explorerResponse.data.value?.[1] ?? [];

    const meta = apiResponse.data.value?.round;

    console.log(apiResponse.data);

    return rounds.map((el, index) => ({
      ...el,
      userBetInfo: userBets[index],

      ...(meta ? { meta } : {}),
    }));
  });

  return { mappedData, ...explorerResponse };
};
