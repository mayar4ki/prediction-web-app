import type { Address } from "viem";

export const address: Address = import.meta.env
  .CLIENT_KEY_AI_PREDICTION_V1_CONTRACT_ADDRESS as Address;
