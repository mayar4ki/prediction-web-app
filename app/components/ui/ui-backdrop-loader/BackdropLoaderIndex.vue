<script lang="ts" setup>
import { useScrollLock } from "@vueuse/core";

useScrollLock(document, true);

const props = defineProps<{
  text?: string;
}>();
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed pointer-events-none z-[9999] top-0 bottom-0 right-0 left-0 backdrop-blur-[3px] backdrop-brightness-40 overflow-hidden border flex-1"
    >
      <Loader v-bind="props" />
    </div>
  </Teleport>
</template>
