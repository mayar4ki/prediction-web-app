<script setup lang="ts">
import { useAccount, useChainId, useConnect, useDisconnect } from "@wagmi/vue";

const chainId = useChainId();
const { disconnect } = useDisconnect();

const { connectors, connect } = useConnect();
const {
  address,
  connector,
  isConnected,
  isDisconnected,
  isConnecting,
  isReconnecting,
} = useAccount();

const isLoading = isConnecting || isReconnecting;

const getName = () => {
  if (isLoading.value) {
    return $t("Connecting") + "...";
  }

  if (isConnected.value) {
    return "0x..." + address?.value?.slice(-4);
  } else {
    return $t("Connect Wallet");
  }
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child :disabled="isLoading">
      <Button variant="default" class="px-3 rounded-full">
        <span
          class="hidden sm:block max-w-18 md:max-w-22 text-ellipsis overflow-hidden whitespace-nowrap"
          >{{ getName() }}</span
        >

        <Icon name="mdi:wallet-bifold-outline" class="scale-140" />
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

      <template v-if="isConnected">
        <DropdownMenuLabel
          >{{ $t("Connection") }}: {{ connector?.name }}
        </DropdownMenuLabel>
        <!-- <DropdownMenuLabel v-if="data">ESN Name: {{ data }} </DropdownMenuLabel>
        <DropdownMenuSeparator v-if="data" /> -->
        <DropdownMenuLabel>
          <span class="break-words whitespace-normal w-full">
            {{ address }}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <NuxtLinkLocale as-child href="/profile">
          <DropdownMenuItem> {{ $t("Profile") }} </DropdownMenuItem>
        </NuxtLinkLocale>

        <NuxtLinkLocale as-child href="/bet/create">
          <DropdownMenuItem> {{ $t("Create New Bet") }} </DropdownMenuItem>
        </NuxtLinkLocale>

        <NuxtLinkLocale as-child :href="`/bet/created-bets/${address}`">
          <DropdownMenuItem> {{ $t("Owned Bets History") }} </DropdownMenuItem>
        </NuxtLinkLocale>

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" @click="disconnect()">
          {{ $t("Disconnect") }}
        </DropdownMenuItem>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
