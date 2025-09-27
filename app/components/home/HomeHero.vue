<script lang="ts" setup></script>

<template>
  <section class="relative py-32 px-6 container-wrapper">
    <div class="container relative z-10">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div
          class="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <h1 class="relative my-6 text-pretty text-4xl font-bold lg:text-6xl">
            {{ $t("Predict. Bet. Play. With") }}
            <br />
            {{ $t("AI & Smart Contracts.") }}
          </h1>

          <p class="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            {{
              $t(
                "Bet on sports, politics, pop culture, and more. AI settles the outcome."
              )
            }}
            <span class="font-semibold">No Human</span>
            {{
              $t("intervention required. Smart contracts guarantee the payout.")
            }}
          </p>

          <div
            class="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start"
          >
            <Button
              class="w-full sm:w-auto"
              @click="
                () => navigateTo({ path: '/bet', query: { category: 'all' } })
              "
            >
              {{ $t("Bet Now") }}
            </Button>

            <Button
              variant="outline"
              class="w-full sm:w-auto"
              @click="() => navigateTo('/info/documentation')"
            >
              {{ $t("Learn more") }}
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
          <NuxtImg
            src="img/hero.png"
            :alt="$t('Hero Image')"
            class="max-h-96 w-full rounded-(--radius) object-contain"
          />
        </div>
      </div>
    </div>
    <InteractiveGridPattern
      :class="[
        '[mask-image:radial-gradient(350px_circle_at_center,white,transparent)] ',
        'inset-0 h-[200%] skew-y-12  ',
      ]"
      class-name=" z-0 "
    />
  </section>
</template>
