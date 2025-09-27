<script lang="ts" setup>
const stats = [
  {
    id: "stat-1",
    value: "100%",
    label: "Blockchain-verified predictions",
  },
  {
    id: "stat-2",
    value: "0.1%",
    label: "Platform transaction fee",
  },
  {
    id: "stat-3",
    value: "24/7",
    label: "Automated AI prediction resolution",
  },
  {
    id: "stat-4",
    value: "100K+",
    label: "Predictions processed",
  },
];
</script>

<template>
  <section class="px-6 container-wrapper py-32">
    <div class="container">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold md:text-4xl">
          {{ $t("Platform Statistics") }}
        </h2>
        <p>{{ $t("Transparent and reliable blockchain-based predictions") }}</p>
      </div>
      <div class="mt-14 grid gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.id" class="flex flex-col gap-5">
          <div class="text-6xl font-bold">{{ stat.value }}</div>
          <p>{{ $t(stat.label) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
