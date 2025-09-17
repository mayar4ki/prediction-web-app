import type { InputHTMLAttributes } from "vue";

export type InputProps = /* @vue-ignore */ InputHTMLAttributes


export interface Bet {
  id: number
  img: string
  prompt: string
  noBetsVolume: number
  yesBetsVolume: number
  result: string
  lockTimestamp: Date
  endTimestamp: Date
  master: string
  commentCount: number
  likeCount: number
}


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