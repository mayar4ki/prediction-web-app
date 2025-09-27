<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <Icon
          name="radix-icons:moon"
          size="1.2em"
          class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          name="radix-icons:sun"
          size="1.2em"
          class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">{{ $t("Toggle theme") }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        {{ $t("Light") }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        {{ $t("Dark") }}
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        {{ $t("System") }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
