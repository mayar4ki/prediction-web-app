<script lang="ts" setup>
import { statsContent } from "~/_constants";
</script>

<template>
  <section class="px-6 container-wrapper py-32">
    <div class="container">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold md:text-4xl">
          {{ statsContent.heading }}
        </h2>
        <p>{{ statsContent.description }}</p>
      </div>
      <div class="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="stat in statsContent.stats"
          :key="stat.id"
          class="flex flex-col gap-5"
        >
          <div class="text-6xl font-bold">{{ stat.value }}</div>
          <p>{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
