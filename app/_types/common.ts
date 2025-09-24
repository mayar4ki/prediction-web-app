import type { Hash } from "viem";
import type { InputHTMLAttributes } from "vue";

export type InputProps = /* @vue-ignore */ InputHTMLAttributes



export interface RoundData {
  id: bigint;
  master: `0x${string}`;
  masterBalance: bigint;
  prompt: string;
  lockTimestamp: bigint;
  closeTimestamp: bigint;
  yesBetsVolume: bigint;
  noBetsVolume: bigint;
  totalVolume: bigint;
  rewardBaseCall: bigint;
  result: `0x${string}`;
  oracleRequestId: `0x${string}`;
  err: `0x${string}`;
}

export interface UserBet {
  betOption: Hash,
  amount: bigint
  claimed: boolean
}


export enum BetOptions {
  YES = '0x5945530000000000000000000000000000000000000000000000000000000000',
  NO = '0x4e4f000000000000000000000000000000000000000000000000000000000000',
  UNKNOWN = '0x554e4b4e4f574e00000000000000000000000000000000000000000000000000'
}


export enum EmptyBytes {
  'bytes32' = '0x0000000000000000000000000000000000000000000000000000000000000000'
}

