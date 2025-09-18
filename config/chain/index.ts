import { sepolia } from "viem/chains";


export const blockExplorer = `${sepolia.blockExplorers.default.url}/search?q=`;

export const nativeSymbol = sepolia.nativeCurrency.symbol;