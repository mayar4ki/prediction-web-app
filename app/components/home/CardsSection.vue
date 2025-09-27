<script lang="ts" setup>
const cards = [
  {
    id: "card-1",
    title: "Bet on Future Events with Blockchain",
    summary:
      "Predict future events. Harness the power of collective intelligence and blockchain technology to make informed decisions.",
    image: "/img/blockchain.png",
  },
  {
    id: "card-2",
    title:
      "No Human Involved, AI will answer your predictions, according to most trusted sources",
    summary:
      "AI will check the facts, analyze the data, and give the best possible answer.",
    image: "/img/openai.png",
  },
  {
    id: "card-3",
    title: "No Signup Just Connect Your Wallet.",
    summary:
      "Connect your wallet and start using our platform without the hassle of creating an account.",
    image: "/img/wallet.png",
  },
];
</script>

<template>
  <section class="relative py-32 px-6 container-wrapper">
    <div
      class="container mx-auto flex flex-col items-center gap-16 lg:px-16 z-50"
    >
      <div class="text-center z-40">
        <Badge variant="secondary" class="mb-6">
          {{ $t("Latest Updates") }}
        </Badge>
        <h2
          class="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl"
        >
          {{ $t("What we work on") }}
        </h2>
        <p
          class="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg"
        >
          {{
            $t(
              "Transparent, Decentralized, open source applications that leverage the power of blockchain technology to provide secure and efficient solutions for users worldwide."
            )
          }}
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 z-40">
        <Card
          v-for="item in cards"
          :key="item.id"
          class="grid grid-rows-[auto_auto_1fr_auto] pt-0 overflow-hidden bg-background opacity-100"
        >
          <div class="aspect-16/9 w-full">
            <NuxtImg
              :src="item.image"
              :alt="$t(item.title)"
              class="h-full w-full object-contain object-center"
            />
          </div>
          <CardHeader>
            <h3 class="text-lg font-semibold md:text-xl">
              {{ $t(item.title) }}
            </h3>
          </CardHeader>
          <CardContent>
            <p class="text-muted-foreground">{{ $t(item.summary) }}</p>
          </CardContent>
        </Card>
      </div>
    </div>
    <InteractiveGridPattern
      :class="[
        '[mask-image:radial-gradient(420px_circle_at_center,white,transparent)]',
        'inset-0 h-[200%] skew-y-12 top-25 ',
      ]"
      squares-class-name="stroke-brand"
      :width="50"
    />
  </section>
</template>
