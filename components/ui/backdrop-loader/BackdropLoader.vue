<script lang="ts" setup>
import { useScrollLock } from "@vueuse/core";

useScrollLock(document, true);
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed pointer-events-none z-[9999] top-0 bottom-0 right-0 left-0 backdrop-blur-[3px] backdrop-brightness-40 overflow-hidden border flex-1"
    >
      <div class="flex justify-center items-center w-full h-full">
        <div
          class="text-xl font-bold whitespace-nowrap flex animate-pulse justify-center items-center line-clamp-none text-center"
        >
          <CommonAppLogo />
          <div
            class="animate-spin w-5 h-5 border-2 border-foreground rounded-full border-dashed m-2"
          ></div>

          Loading...
        </div>
      </div>
    </div>
  </Teleport>
</template>
