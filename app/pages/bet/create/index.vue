<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { AlertCircle } from "lucide-vue-next";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import {
  createBetAdapter,
  formSchema,
  type FormSchema,
} from "~/_validation/createBetForm";
import FeesFormItem from "@/components/bet/create/FeesFormItem.vue";
import { parseEther } from "viem";

import BetTagsInput from "~/components/bet/create/BetTagsInput.vue";
import { useAccount, useSignMessage, useWatchContractEvent } from "@wagmi/vue";
import { abi, address } from "~/_config/ai-prediction-v1";
import { toast } from "vue-sonner";
import { useMutation } from "@tanstack/vue-query";

const pp = (added: number) => {
  const now = new Date(new Date().getTime() + added);

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const hhmm = `${hours}:${minutes}`;
  console.log(hhmm); // e.g., "03:29"

  return hhmm;
};
const { handleSubmit, controlledValues } = useForm<FormSchema>({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    prompt: $t("Will Nasa land humans on Mars by 2030?"),
    lockDate: fromDate(new Date(), getLocalTimeZone()),
    lockTime: pp(1000 * 60 * 2),
    closeDate: fromDate(new Date(), getLocalTimeZone()),
    closeTime: pp(1000 * 60 * 3),
    tags: [],
  },
});

const { handleFileInput, files, clearFiles } = useFileStorage();

const tags = computed(() =>
  (controlledValues.value.tags ?? [])?.map((el) => el.id)
);

const { address: myAddress } = useAccount();
const { isPending: isPendingSignature, signMessageAsync } = useSignMessage();

const enableUseWatchContractEvent = ref<boolean>(false);

const { mutateAsync, isPending: isPendingMeta } = useMutation({
  mutationFn: (body: {
    signature: `0x${string}`;
    files: unknown;
    itemId: string;
    tags: number[];
  }) => $fetch<unknown>("/api/bet/create", { method: "POST", body }),
});

useWatchContractEvent({
  address: address,
  abi: abi,
  eventName: "CreateNewRound",
  args: {
    master: myAddress,
  },
  enabled: enableUseWatchContractEvent,
  onLogs: async (logs) => {
    enableUseWatchContractEvent.value = false;
    toast.success(translate("Event has been received."));
    const roundId = logs[0]?.args?.roundId;

    if (roundId) {
      const signature = await signMessageAsync({
        message: roundId.toString() + tags.value.join(", "),
      });

      await mutateAsync({
        files: files.value,
        signature: signature,
        itemId: roundId.toString(),
        tags: tags.value,
      }).finally(() => {
        navigateTo(`/bet/show/${roundId.toString()}`);
      });
    } else {
      navigateTo(`/bet/created-bets/${address}`);
    }
  },
});

const {
  trigger: writeContract,
  isPending,
  isConfirming,
} = useCreateBet({
  onSuccess() {
    enableUseWatchContractEvent.value = true;
  },
});

const onSubmit = handleSubmit((values) => {
  writeContract({
    args: createBetAdapter(values),
    value: parseEther(values.fees),
  });
});

const loadingText = computed(() => {
  if (isPending.value) {
    return undefined;
  }

  if (isConfirming.value) {
    return $t("Confirming") + "...";
  }

  if (isPendingSignature.value) {
    return $t("Waiting Meta Signature") + "...";
  }

  if (isPendingMeta.value) {
    return $t("Uploading Meta") + "...";
  }

  if (enableUseWatchContractEvent.value) {
    return $t("Waiting event") + "...";
  }

  return undefined;
});
</script>

<template>
  <div class="contain-wrapper px-6 min-h-[68vh] relative">
    <ClientOnly
      v-if="
        isPending ||
        isConfirming ||
        enableUseWatchContractEvent ||
        isPendingMeta ||
        isPendingSignature
      "
    >
      <BackdropLoader :text="loadingText" />
    </ClientOnly>

    <Card class="max-w-3xl mx-auto my-10">
      <CardHeader>
        <CardTitle>{{ $t("Create Bet") }}</CardTitle>
        <CardDescription>{{
          $t("Deploy your new bet in one-click.")
        }}</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-8" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="prompt">
            <FormItem>
              <FormLabel>{{ $t("Prompt") }}</FormLabel>
              <FormControl>
                <Textarea
                  :placeholder="$t('Will Nasa land humans on Mars by 2030?')"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>
                <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>{{ $t("stick with 10-240 characters") }}</li>
                  <li>
                    {{ $t("no offensive words, don't ask anything illegal") }}
                  </li>
                  <li>{{ $t("be clear and short") }}</li>
                </ul>
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <div>
            <div class="flex flex-col md:flex-row gap-2">
              <FormField v-slot="{ componentField }" name="lockDate">
                <FormItem>
                  <FormLabel>{{ $t("Lock In Date") }}</FormLabel>
                  <FormControl>
                    <DatePicker
                      v-bind="componentField"
                      :placeholder="$t('Select date')"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="lockTime">
                <FormItem>
                  <FormLabel>{{ $t("Lock In Time") }}</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      :placeholder="$t('Select time')"
                      class="max-w-[150px]"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="text-muted-foreground text-sm mt-1">
              <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  {{
                    $t(
                      "This represents the date and time when no more bets can be placed."
                    )
                  }}
                </li>
                <li>
                  {{
                    $t(
                      "Claiming or refunding will be available after close time pass."
                    )
                  }}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div class="flex flex-col md:flex-row gap-2">
              <FormField v-slot="{ componentField }" name="closeDate">
                <FormItem>
                  <FormLabel>{{ $t("Close Date") }}</FormLabel>
                  <FormControl>
                    <DatePicker
                      v-bind="componentField"
                      :placeholder="$t('Select date')"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="closeTime">
                <FormItem>
                  <FormLabel>{{ $t("Close Time") }}</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      :placeholder="$t('Select time')"
                      class="max-w-[150px]"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
            <div class="text-muted-foreground text-sm mt-1">
              <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  {{
                    $t(
                      "This represents the date and time when the oracle will decide the outcome."
                    )
                  }}
                </li>
                <li>
                  {{
                    $t(
                      "Claiming or refunding will be available after oracle response."
                    )
                  }}
                </li>
              </ul>
            </div>
          </div>

          <FormField v-slot="{ componentField }" name="tags">
            <BetTagsInput v-bind="componentField" />
          </FormField>

          <FormField v-slot="{ componentField }" name="fees">
            <FeesFormItem
              :placeholder="$t('Loading Fees') + '...'"
              v-bind="componentField"
            />
          </FormField>

          <div class="flex flex-col gap-2">
            <Label for="picture"> {{ $t("Photo") }} </Label>
            <NuxtImg
              :src="files?.[0]?.content?.toString() ?? '/img/blockchain.png'"
              :alt="$t('no photo')"
              class="aspect-29/35 h-full w-60 border rounded-2xl object-cover self-center sm:self-auto"
            />

            <div class="flex gap-2">
              <Input
                id="picture"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                @input="handleFileInput"
              />
              <Button
                v-if="files?.[0]"
                variant="destructive"
                type="button"
                @click="clearFiles"
              >
                {{ $t("Remove Photo") }}
              </Button>
            </div>
          </div>
        </form>

        <Alert class="mt-4" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>{{ $t("Attention") }} !</AlertTitle>
          <AlertDescription>
            {{
              $t(
                "You can not change the prompt, lock time or close time after deployment to blockchain."
              )
            }}
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter class="flex justify-end px-6">
        <BetCreateConfirmationDialog
          :controlled-values="controlledValues"
          @submit="onSubmit"
        >
          <Button class="w-full">{{ $t("Create New Bet") }}</Button>
        </BetCreateConfirmationDialog>
      </CardFooter>
    </Card>
  </div>
</template>
