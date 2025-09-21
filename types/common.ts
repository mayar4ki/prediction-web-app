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
  YES = '0x8078791547705d0627af388be89cb38bd2ac6c318022e1e78a1919acdab95446',
  NO = '0xb8888ec2e2e66921621be7dbd69657d2a35b6f44ecb80ad47d93145b44c98226'
}


export enum EmptyBytes {
  'bytes32' = '0x0000000000000000000000000000000000000000000000000000000000000000'
}

