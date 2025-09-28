import type { Address } from "viem";

export const address: Address = import.meta.env
  .VITE_AI_PREDICTION_V1_CONTRACT_ADDRESS as Address;
