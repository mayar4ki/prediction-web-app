import type { _Tag, RoundData, RoundMeta, UserBet } from "~/_types/common";

export const BetCardStoreKey = "BetCard/BetCard" as const;

export type ActiveActionCard = "main" | "form-no" | "form-yes";

export type BetCardItem = RoundData & {
  userBetInfo?: UserBet;
  meta?: RoundMeta & { tags: _Tag[] };
};

export interface BetCardState {
  item: Ref<BetCardItem>;
  activeActionCard: Ref<ActiveActionCard, ActiveActionCard>;
}

export const betCardProvider = (state: BetCardState) =>
  provide(BetCardStoreKey, state);

export const useBetCard = () => inject<BetCardState>(BetCardStoreKey);
