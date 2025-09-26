<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError,
});
</script>

<template>
  <NuxtLayout :name="'default'" class="h-100vh">
    <div
      class="flex flex-col items-center justify-center p-10 gap-4 min-h-[70vh]"
    >
      <h1 class="text-4xl font-bold">
        {{ props.error?.statusCode }} - {{ props.error?.statusMessage }}
      </h1>
      <p class="text-md text-foreground/55 font-medium">
        {{ props.error?.message }}
      </p>
      <NuxtLink to="/">
        <Button> Go back to Home </Button>
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
