<script setup lang="ts">
import AppFooter from "~/components/default-layout/AppFooter.vue";
import AppHeader from "~/components/default-layout/AppHeader.vue";
</script>

<template>
  <div class="relative flex min-h-svh flex-col bg-background">
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
