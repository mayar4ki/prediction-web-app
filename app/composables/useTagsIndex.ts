import { useWaitForTransactionReceipt, useWriteContract } from "@wagmi/vue";
import type { Hash, WriteContractParameters } from "viem";
import { toast } from "vue-sonner";
import { blockExplorer } from "~/_config/chain";
import { abi, address } from "~/_config/ai-prediction-v1";
import { useQuery } from "@tanstack/vue-query";


export interface UsePlaceBetOptions {
    onSuccess?: (data?: Hash) => void
}

export const useTagsIndex = (options: UsePlaceBetOptions) => {


    const response = useQuery({
        queryKey:['tagsIndex'],
        queryFn:()=>$fetch('/api/tags')
    })

    return response
    
}