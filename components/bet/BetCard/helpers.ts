import { formatUnits } from "viem";
import type { RoundData } from "~/types/common";

export const calculatePayout = (item: RoundData) => {

    const yesBetsVolume = Number(item.yesBetsVolume);
    const noBetsVolume = Number(item.noBetsVolume);
    const totalVolume = Number(item.totalVolume);

    const y = totalVolume / (yesBetsVolume || 1);
    const n = totalVolume / (noBetsVolume || 1);

    return {
        yes: y,
        no: n,
    };
}


export const calculatePrizePool = (item: RoundData, priceFeed: bigint) => {

    const totalVolumeWei = item.yesBetsVolume + item.noBetsVolume;

    const totalVolumeEth = Number(formatUnits(totalVolumeWei, 18));

    const totalVolumeUSD = Number(
        totalVolumeEth *
        Number(formatUnits(priceFeed, 8))
    );

    return {
        eth: totalVolumeEth,
        usd: totalVolumeUSD,
    };


}


export const EthToUsd = (value: number, priceFeed: bigint) => {

    const tmp = value * Number(formatUnits(priceFeed, 8))

    return Number.isNaN(tmp) ? 0 : tmp;

}