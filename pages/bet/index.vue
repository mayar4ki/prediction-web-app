<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import type { Bet } from "@/types/common";

const tmp: Bet[] = [
  {
    id: 1,
    img: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcT0nCVAkm3ui5aY_h5clCn_vHx2iFlUfsjDuTnjWBtZc_bqHFcPNlGXnEkxUIf7-pTOQleO1UFG5zofBPeQ-3oLbmG3TJ5neyGnYNbw1dvwCVmNz9I0qcRXT1aCpnwEZudHLhuU0TWeXw",
    prompt: "Will Donal Trump win the 2024 presidential election?",
    noBetsVolume: 800,
    yesBetsVolume: 1100,
    result: "",
    lockTimestamp: new Date("2026-11-05T12:00:00Z"),
    endTimestamp: new Date("2026-11-05T18:00:00Z"),
    master: "0x12344868abcd0000000000000000000000000",
    commentCount: 5,
    likeCount: 20,
  },
  {
    id: 2,
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHDex0rc6GsaGcCB8dQb0vglYV9kvCkfT3rw&s",
    prompt: "Will France win on Germany in tomorrow match?",
    noBetsVolume: 600,
    yesBetsVolume: 1900,
    result: "",
    lockTimestamp: new Date("2026-11-05T12:00:00Z"),
    endTimestamp: new Date("2026-11-05T18:00:00Z"),
    master: "0x12344868abcd0000000000000000000000000",
    commentCount: 12,
    likeCount: 34,
  },
];

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
</script>

<template>
  <section class="py-32 px-6 container-wrapper">
    <div class="container mx-auto">
      <div class="flex flex-col gap-6 text-center">
        <h2 class="text-4xl font-medium md:text-5xl">Todays Trending Bets</h2>
      </div>

      <div class="flex flex-col justify-center gap-4 mt-10">
        <NuxtLink
          v-for="id in ids"
          :key="id"
          class="btn-primary btn mt-10"
          :to="`/bet/show/${id}`"
        >
          Navigate to SWR {{ id }}
        </NuxtLink>
      </div>

      <div class="flex flex-col justify-center gap-4 mt-10">
        <NuxtLink
          v-for="id in ids"
          :key="id"
          class="btn-primary btn mt-10"
          :to="`/bet/show2/${id}`"
        >
          Navigate to ISR {{ id }}
        </NuxtLink>
      </div>

      <div class="mt-20">
        <template v-for="(item, index) in tmp" :key="item.id">
          <BetCard :item="item" />
          <Separator v-if="index < tmp.length - 1" class="my-12" />
        </template>
      </div>
    </div>
  </section>
</template>
