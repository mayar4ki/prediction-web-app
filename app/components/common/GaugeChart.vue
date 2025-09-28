<script lang="ts" setup>
import { cn } from "~/lib/utils";

const { percent = 0, variant = "success" } = defineProps<{
  percent?: number;
  variant?: "success" | "destructive";
}>();

const rotate = computed(() => (percent * 180) / 100);
</script>
<template>
  <div
    :class="
      cn(
        'relative flex aspect-[2] items-center justify-center rounded-t-full overflow-hidden  w-11',

        `   bg-${variant} `
      )
    "
  >
    <div
      :key="rotate"
      :class="
        cn(
          'absolute top-0 w-full aspect-[1]  bg-gradient-to-tr from-transparent from-50% to-white to-0% ',
          `rotate-[calc(${rotate}deg-45deg)] transition-transform duration-500 `
        )
      "
    ></div>

    <div
      class="absolute top-3/12 w-9/12 aspect-square rounded-full bg-background"
    ></div>
    <div
      class="absolute bottom-0 w-full text-center leading-none text-[10px] mb-[2px] font-medium"
    >
      {{ percent.toFixed(0) }}%
    </div>
  </div>
</template>
