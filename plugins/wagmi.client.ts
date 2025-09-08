
import { defineNuxtPlugin } from '#app'
import { createConfig, http, WagmiPlugin } from '@wagmi/vue'
import { mainnet, sepolia } from '@wagmi/vue/chains'
import { injected, metaMask, safe, walletConnect } from '@wagmi/vue/connectors'

export const wagmiConfig = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
    connectors: [
        injected(),
        walletConnect({ projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID }),
        metaMask(),
        safe(),
    ],
    ssr: false
})

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiConfig })
})
