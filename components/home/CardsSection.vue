<script lang="ts" setup>
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { homeCards } from "@/constants";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
</script>

<template>
  <section class="relative py-32 px-6 container-wrapper">
    <div
      class="container mx-auto flex flex-col items-center gap-16 lg:px-16 z-50"
    >
      <div class="text-center z-40">
        <Badge variant="secondary" class="mb-6">
          {{ homeCards.tagline }}
        </Badge>
        <h2
          class="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl"
        >
          {{ homeCards.heading }}
        </h2>
        <p
          class="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg"
        >
          {{ homeCards.description }}
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 z-40">
        <Card
          v-for="item in homeCards.cards"
          :key="item.id"
          class="grid grid-rows-[auto_auto_1fr_auto] pt-0 overflow-hidden bg-background opacity-100"
        >
          <div class="aspect-16/9 w-full">
            <img
              :src="item.image"
              :alt="item.title"
              class="h-full w-full object-contain object-center"
            />
          </div>
          <CardHeader>
            <h3 class="text-lg font-semibold md:text-xl">
              {{ item.title }}
            </h3>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ item.summary }}</p>
          </CardContent>
        </Card>
      </div>
    </div>
    <InteractiveGridPattern
      :class="[
        '[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]',
        'inset-0 h-[200%] skew-y-12 top-25 ',
      ]"
      squaresClassName="stroke-brand"
      :width="50"
    />
  </section>
</template>
