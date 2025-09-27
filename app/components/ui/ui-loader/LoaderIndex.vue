<script setup lang="ts">
const { text } = defineProps<{
  text?: string;
}>();
</script>

<template>
  <div class="flex justify-center items-center w-full h-full">
    <div
      class="text-xl font-bold whitespace-nowrap flex animate-pulse justify-center items-center line-clamp-none text-center"
    >
      <CommonAppLogo />
      <div
        class="animate-spin w-5 h-5 border-2 border-foreground rounded-full border-dashed m-2"
      ></div>

      <span>{{ text ?? $t("Loading") + "..." }}</span>
    </div>
    <slot />
  </div>
</template>
