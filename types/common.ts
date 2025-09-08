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
