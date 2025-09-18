<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { getFormSchema, type FormSchema } from "~/validation/placeBetForm";
import { chain, nativeSymbol } from "~/config/chain";
import * as ethUsdPriceFeed from "~/config/eth-usd-price-feed";
import { useAccount, useBalance, useReadContract } from "@wagmi/vue";
import { EthToUsd } from "./helpers";
import { formatUnits, parseEther } from "viem";
import * as aiPredictionV1 from "~/config/ai-prediction-v1";
import Loader from "~/components/ui/backdrop-loader/Loader.vue";

const showForm = defineModel<"main" | "form-no" | "form-yes">();
const props = defineProps<{
  modelValue: "main" | "form-no" | "form-yes";
  id: bigint;
}>();

const { address } = useAccount();
const { data } = useBalance({ address: address });
const priceFeed = useReadContract({
  abi: ethUsdPriceFeed.abi,
  address: ethUsdPriceFeed.address,
  chainId: chain.id,
  functionName: "latestRoundData",
});

const { data: _minBetAmount } = useReadContract({
  abi: aiPredictionV1.abi,
  address: aiPredictionV1.address,
  chainId: chain.id,
  functionName: "minBetAmount",
});

const { isPending, writeContractBetNo, writeContractBetYes } = usePlaceBet({
  onSuccess() {
    showForm.value = "main";
    resetForm();
  },
});

const formBadge = computed(() => {
  switch (props.modelValue) {
    case "form-yes":
      return { text: "Betting on Yes", variant: "success" } as const;
    case "form-no":
      return { text: "Betting on No", variant: "destructive" } as const;
  }

  return { text: "", variant: null } as const;
});

const balance = computed(() =>
  Number(formatUnits(data.value?.value ?? BigInt(0), 18))
);

const minBetAmount = computed(() =>
  Number(formatUnits(_minBetAmount.value ?? BigInt(0), 18))
);

const { handleSubmit, controlledValues, setFieldValue, resetForm } =
  useForm<FormSchema>({
    validationSchema: toTypedSchema(
      getFormSchema({
        balance: balance,
        minBetAmount: minBetAmount,
      })
    ),
    initialValues: {
      amount: 0,
    },
  });

const onSubmit = handleSubmit((values) => {
  const weiAmount = parseEther(values.amount.toString());

  if (props.modelValue === "form-no") {
    writeContractBetNo({
      args: [props.id],
      value: weiAmount,
    });
    return;
  }

  if (props.modelValue === "form-yes") {
    writeContractBetYes({
      args: [props.id],
      value: weiAmount,
    });
    return;
  }
});
</script>

<template>
  <Card class="relative border-0 py-[3.5px] px-2 gap-3">
    <div
      v-if="isPending"
      class="absolute top-0 right-0 left-0 bottom-0 z-50 bg-background/75 pointer-events-none"
    >
      <Loader />
    </div>
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
            <FormLabel class="flex justify-between">
              <div>Amount</div>
              <span
                class="text-foreground font-bold flex justify-center items-center gap-1"
                >: <Icon name="cryptocurrency:eth" /> {{ nativeSymbol }}</span
              >
            </FormLabel>
            <FormControl>
              <Input type="number" v-bind="componentField" />
            </FormControl>

            <FormMessage />
          </FormItem>
        </FormField>
      </form>

      <div class="flex overflow-hidden gap-1 mt-2">
        <Button
          v-for="item in [10, 25, 50, 75, 100]"
          :key="item"
          :variant="
            (balance * item) / 100 === controlledValues.amount
              ? 'success'
              : 'secondary'
          "
          class="p-0 py-0.5 h-auto flex-1"
          @click="setFieldValue('amount', (balance * item) / 100)"
        >
          {{ item === 100 ? `Max` : `${item}%` }}
        </Button>
      </div>

      <Alert class="mt-3" variant="default">
        <AlertTitle>Attention !</AlertTitle>
        <AlertDescription>
          This can't be undone.

          <Separator />
          {{ controlledValues.amount || 0 }} {{ nativeSymbol }} =
          {{
            formatCurrency(
              EthToUsd(
                controlledValues.amount,
                priceFeed.data.value?.[1] ?? BigInt(0)
              )
            )
          }}
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
