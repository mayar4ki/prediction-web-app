<script lang="ts" setup>
import { Button } from "@/components/ui/button";

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { GlowBorder } from "@/components/ui/glow-border";
import { useAccount } from "@wagmi/vue";

const { isDisconnected } = useAccount();
</script>

<template>
  <section class="relative py-32 px-6 container-wrapper">
    <div class="container">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div
          class="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 class="relative my-6 text-pretty text-4xl font-bold lg:text-6xl">
            Predict. Bet. Play. With
            <br />
            AI & Smart Contracts.
          </h1>

          <p class="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            Bet on sports, politics, pop culture, and more. AI settles the
            outcome.
            <span class="font-semibold">No Human</span>
            intervention required. Smart contracts guarantee the payout.
          </p>

          <div
            class="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
          >
            <Button v-if="isDisconnected" class="w-full sm:w-auto">
              Connect Wallet
            </Button>
            <Button v-else class="w-full sm:w-auto"> Go to Dashboard </Button>

            <Button variant="outline" class="w-full sm:w-auto">
              Bet Now
            </Button>
          </div>
        </div>
        <div class="max-h-96 w-full relative overflow-hidden">
          <GlowBorder
            :color="[
              'var(--color-brand)',
              'var(--color-secondary)',
              'var(--color-ring)',
            ]"
          />
          <img
            src="/img/hero.png"
            class="max-h-96 w-full rounded-(--radius) object-contain"
          />
        </div>
      </div>
    </div>
    <InteractiveGridPattern
      :class="[
        '[mask-image:radial-gradient(350px_circle_at_center,white,transparent)]',
        'inset-0 h-[200%] skew-y-12',
      ]"
    />
  </section>
</template>
