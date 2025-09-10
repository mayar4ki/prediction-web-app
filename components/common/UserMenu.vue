<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useEnsName,
} from "@wagmi/vue";

const chainId = useChainId();
const { disconnect } = useDisconnect();

const { connectors, connect } = useConnect();
const {
  address,
  connector,
  chain,
  isConnected,
  isDisconnected,
  isConnecting,
  isReconnecting,
} = useAccount();

const { data } = useEnsName({ address });

const isLoading = isConnecting || isReconnecting;

const getName = () => {
  if (isLoading.value) {
    return "Connecting...";
  }

  if (isConnected.value) {
    return `${chain?.value?.name} ${address.value}`;
  } else {
    return "Connect Wallet";
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child :disabled="isLoading">
      <Button variant="default" class="px-3">
        <span
          class="hidden md:block max-w-28 md:max-w-36 text-ellipsis overflow-hidden whitespace-nowrap"
          >{{ getName() }}</span
        >
        <Icon name="mdi:wallet-bifold-outline" class="scale-140" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <template v-if="isDisconnected">
        <DropdownMenuLabel>Connectors </DropdownMenuLabel>
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

      <template v-if="isConnected">
        <DropdownMenuLabel
          >Connection: {{ connector?.name }}
        </DropdownMenuLabel>
        <DropdownMenuLabel v-if="data">ESN Name: {{ data }} </DropdownMenuLabel>
        <DropdownMenuSeparator v-if="data" />
        <DropdownMenuLabel>
          <span class="break-words whitespace-normal w-full">
            {{ address }}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem @click="navigateTo('/profile')">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem @click="navigateTo('/bet/create')">
          Create Bet
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" @click="disconnect()">
          Disconnect
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
