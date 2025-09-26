<script setup lang="ts">
import { Toaster } from "~/components/ui/ui-sonner";
import "vue-sonner/style.css";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <Toaster />
  </NuxtLayout>
</template>
