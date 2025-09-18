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
  YES = '0x8078791547705d0627af388be89cb38bd2ac6c318022e1e78a1919acdab95446',
  NO = '0xb8888ec2e2e66921621be7dbd69657d2a35b6f44ecb80ad47d93145b44c98226'
}


