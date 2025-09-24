<script setup lang="ts">
import { colorNameAt, siteName } from "~/_constants";
</script>

<template>
  <NuxtLink to="/" class="text-xl font-bold whitespace-nowrap">
    <span class="text-brand">{{ siteName.slice(0, colorNameAt) }}</span
    >{{ siteName.slice(colorNameAt) }}
  </NuxtLink>
</template>
