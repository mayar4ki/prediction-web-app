<script setup lang="ts">
import { useAccount, useChainId, useConnect, useSwitchChain } from "@wagmi/vue";

const chainId = useChainId();

const { connectors, connect } = useConnect();

const { isDisconnected, isConnecting, isReconnecting, chain } = useAccount();

const { chains, switchChain } = useSwitchChain();

const isLoading = isConnecting || isReconnecting;
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child :disabled="isLoading">
      <Button variant="default" class="px-2 rounded-full">
        <span class="hidden sm:block"> {{ chain?.name }}</span>
        <Icon name="cryptocurrency:eth" size="20" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <template v-if="isDisconnected">
        <DropdownMenuLabel>{{ $t("Connectors") }} </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            v-for="_connector in connectors"
            :key="_connector.id"
            @click="connect({ connector: _connector, chainId })"
          >
            <span>{{ _connector.name }}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </template>

      <DropdownMenuItem
        v-for="chain in chains"
        :key="chain.id"
        @click="switchChain({ chainId: chain.id })"
      >
        {{ chain.name }}
        <Icon v-if="chain.id === chainId" name="radix-icons:check" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
