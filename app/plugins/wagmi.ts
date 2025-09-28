import { defineNuxtPlugin } from "#app";
import { createConfig, http, WagmiPlugin } from "@wagmi/vue";
import { sepolia } from "@wagmi/vue/chains";
import { injected, metaMask, safe, walletConnect } from "@wagmi/vue/connectors";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const wagmiConfig = createConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(
        (import.meta.server ? config : config.public)
          .NUXT_PUBLIC_ETH_SEPOLIA_CHAIN_RPC_URL
      ),
    },
    connectors: [
      injected(),
      walletConnect({
        projectId: (import.meta.server ? config : config.public)
          .NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
      }),
      metaMask(),
      safe(),
    ],
    ssr: true,
  });

  nuxtApp.vueApp.use(WagmiPlugin, { config: wagmiConfig });
});
