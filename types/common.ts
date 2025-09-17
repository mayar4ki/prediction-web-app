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


export enum BetOptions {
  YES = '0xdd05c5cc54897bd053e080a16989ecccd7ba309f5fa46f826db731e684a61378',
  NO = '0x2ded21741aab77cb4e4c6bd9ac752deddd8eebb337f3bcfe36c7963b408ebc7d'
}