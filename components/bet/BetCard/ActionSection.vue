<script setup lang="ts">
import { chain, nativeSymbol } from "~/config/chain";
import { cn } from "~/lib/utils";
import { BetOptions, type RoundData } from "~/types/common";
import { calculatePayout, calculatePrizePool } from "./helpers";
import { useReadContract } from "@wagmi/vue";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { Button } from "~/components/ui/button";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { formSchema, type FormSchema } from "~/validation/placeBetForm";
import { Input } from "~/components/ui/input";

const { item } = defineProps<{ item: RoundData }>();

const closerAtCounter = useDateCountDown({
  targetDate: new Date(Number(item.closeTimestamp) * 1000),
});

const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  chainId: chain.id,
  functionName: "latestRoundData",
});

const totalVolume = computed(() =>
  calculatePrizePool(item, priceFeed.data.value?.[1] ?? BigInt("0"))
);
const payout = computed(() => calculatePayout(item));

const withinLockTime = computed(
  () => item.lockTimestamp < new Date().getTime() / 1000
);

const showForm = ref<"main" | "form-no" | "form-yes">("main");

const formBadge = computed(() => {
  switch (showForm.value) {
    case "form-yes":
      return { text: "Betting on Yes", variant: "success" } as const;
    case "form-no":
      return { text: "Betting on No", variant: "destructive" } as const;
  }

  return { text: "", variant: null } as const;
});

const { handleSubmit, errors } = useForm<FormSchema>({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    amount: "0",
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>
<template>
  <div v-show="showForm === 'main'" class="flex flex-col gap-4 lg:flex-col">
    <Badge
      :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
      :class="
        cn('text-sm font-semibold', {
          'opacity-50': withinLockTime,
        })
      "
    >
      {{ payout.yes.toFixed(2) }}x Payout
    </Badge>

    <Button
      :variant="item.result === BetOptions.NO ? 'outline' : 'success'"
      size="lg"
      :disabled="withinLockTime"
      @click="showForm = 'form-yes'"
    >
      Bet Yes
    </Button>

    <Button
      :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
      size="lg"
      :disabled="withinLockTime"
      @click="showForm = 'form-no'"
    >
      Bet No
    </Button>

    <Badge
      :variant="item.result === BetOptions.YES ? 'outline' : 'destructive'"
      :class="
        cn('text-sm font-semibold', {
          'opacity-50': withinLockTime,
        })
      "
    >
      {{ payout.no.toFixed(2) }}x Payout
    </Badge>

    <p
      class="text-muted-foreground text-sm font-medium flex items-center gap-1"
    >
      Betting Stop at:
      {{ formatDateTime(new Date(Number(item.lockTimestamp) * 1000)) }}
    </p>
    <p
      v-if="!closerAtCounter.finished"
      class="text-muted-foreground text-sm font-medium flex items-center gap-1"
    >
      <Icon name="radix-icons:clock" class="h-[1rem] w-[1rem]" />
      Time left: {{ closerAtCounter.days }}D, {{ closerAtCounter.hours }}H,
      {{ closerAtCounter.minutes }}m, {{ closerAtCounter.seconds }}s
    </p>

    <div class="flex flex-col gap-2">
      <p class="text-3xl font-medium text-primary">
        {{ totalVolume.eth.toFixed(2) }} {{ nativeSymbol }} =
        {{ formatCurrency(totalVolume.usd) }}
      </p>
      <p class="font-semibold text-primary">Pool Total Volume</p>
    </div>
  </div>
  <Card v-show="showForm !== 'main'" class="border-0 px-2 gap-3">
    <CardHeader class="px-0 border-0">
      <CardTitle class="flex justify-between items-center">
        <div class="flex justify-center items-center gap-1">
          <Button variant="ghost" size="icon" @click="showForm = 'main'">
            <Icon name="radix-icons:arrow-left" size="22" />
          </Button>
        </div>
        <Badge :variant="formBadge.variant" class="text-sm font-semibold">
          {{ formBadge.text }}
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent class="border-0 px-0">
      <form @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="amount">
          <FormItem>
            <FormLabel>Amount ( {{ nativeSymbol }} )</FormLabel>
            <FormControl>
              <Input placeholder="0.0" v-bind="componentField" />
            </FormControl>
            <FormDescription v-if="!errors.amount">
              Enter value you want to bet with.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </FormField>
      </form>

      <Alert class="mt-3" variant="default">
        <AlertTitle>Attention !</AlertTitle>
        <AlertDescription>
          You won’t be able to remove or change your bet once you place it.
        </AlertDescription>
      </Alert>
    </CardContent>

    <CardFooter class="flex justify-between px-0">
      <Button class="w-full" variant="default" @click="onSubmit">
        Place Bet
      </Button>
    </CardFooter>
  </Card>
</template>
