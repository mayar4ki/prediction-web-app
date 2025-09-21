import { useReadContract } from "@wagmi/vue";
import { formatUnits } from "viem";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";


export const useEthToUsd = () => {


    const priceFeed = useReadContract({
        abi: ethUsdPriceFeed.abi,
        address: ethUsdPriceFeed.address,
        functionName: "latestRoundData",
    });


    const convert = (value: number) => {
        const tmp = value * Number(formatUnits(priceFeed.data.value?.[1] ?? BigInt(0), 8))

        return Number.isNaN(tmp) ? 0 : tmp;
    }

    return { convert }

}