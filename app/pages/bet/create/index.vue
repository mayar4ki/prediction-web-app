<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-vue-next";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import {
  createBetAdapter,
  formSchema,
  type FormSchema,
} from "~/_validation/createBetForm";
import FeesFormItem from "@/components/bet/create/FeesFormItem.vue";
import { BackdropLoader } from "@/components/ui/backdrop-loader";
import { parseEther } from "viem";

import Card from "~/components/ui/card/Card.vue";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import AlertTitle from "@/components/ui/alert/AlertTitle.vue";
import AlertDescription from "@/components/ui/alert/AlertDescription.vue";
import { useAccount, useSignMessage } from "@wagmi/vue";
import { useMutation } from "@tanstack/vue-query";

const pp = (added: number) => {
  const now = new Date(new Date().getTime() + added);

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const hhmm = `${hours}:${minutes}`;
  console.log(hhmm); // e.g., "03:29"

  return hhmm;
};
const { handleSubmit, resetForm, controlledValues } = useForm<FormSchema>({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    prompt: "Will Nasa land humans on Mars by 2030?",
    lockDate: fromDate(new Date(), getLocalTimeZone()),
    lockTime: pp(1000 * 60 * 2),
    closeDate: fromDate(new Date(), getLocalTimeZone()),
    closeTime: pp(1000 * 60 * 3),
  },
});

const {
  trigger: writeContract,
  isPending,
  isConfirming,
  isWaitingEvent,
  isPendingPhoto,
  isPendingSignature,
  filesStorage: { clearFiles, files, handleFileInput },
} = useCreateBet();

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
    return "Confirming...";
  }

  if (isPendingSignature.value) {
    return "Waiting Photo Signature...";
  }

  if (isPendingPhoto.value) {
    return "Uploading Photo...";
  }

  if (isWaitingEvent.value) {
    return "Waiting event...";
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
        isWaitingEvent ||
        isPendingPhoto ||
        isPendingSignature
      "
    >
      <BackdropLoader :text="loadingText" />
    </ClientOnly>

    <Card class="max-w-3xl mx-auto my-10">
      <CardHeader>
        <CardTitle>Create Bet</CardTitle>
        <CardDescription>Deploy your new bet in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-8" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="prompt">
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Will Nasa land humans on Mars by 2030?"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>
                <ul class="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>stick with 10-240 characters</li>
                  <li>no offensive words, don't ask anything illegal</li>
                  <li>be clear and short</li>
                </ul>
              </FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
          <div>
            <div class="flex flex-col md:flex-row gap-2">
              <FormField v-slot="{ componentField }" name="lockDate">
                <FormItem>
                  <FormLabel>Lock In Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      v-bind="componentField"
                      placeholder="Select date"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="lockTime">
                <FormItem>
                  <FormLabel>Lock In Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Select time"
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
                  This represents the date and time when no more bets can be
                  placed.
                </li>
                <li>
                  Claiming or refunding will be available after close time pass.
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div class="flex flex-col md:flex-row gap-2">
              <FormField v-slot="{ componentField }" name="closeDate">
                <FormItem>
                  <FormLabel>Close Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      v-bind="componentField"
                      placeholder="Select date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField v-slot="{ componentField }" name="closeTime">
                <FormItem>
                  <FormLabel>Close Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Select time"
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
                  This represents the date and time when the oracle will decide
                  the outcome.
                </li>
                <li>
                  Claiming or refunding will be available after oracle response.
                </li>
              </ul>
            </div>
          </div>

          <FormField v-slot="{ componentField }" name="fees">
            <FeesFormItem
              placeholder="Loading Fees..."
              v-bind="componentField"
            />
          </FormField>

          <div class="flex flex-col gap-2">
            <Label for="picture"> Photo </Label>
            <NuxtImg
              :src="files?.[0]?.content?.toString() ?? '/img/blockchain.png'"
              alt="no photo"
              class="aspect-29/35 h-full w-60 border rounded-2xl object-cover self-center sm:self-auto"
            />

            <div class="flex gap-2">
              <Input
                id="picture"
                type="file"
                @input="handleFileInput"
                accept=".jpg,.jpeg,.png,.webp"
              />
              <Button
                variant="destructive"
                v-if="files?.[0]"
                type="button"
                @click="clearFiles"
              >
                Remove Photo
              </Button>
            </div>
          </div>
        </form>

        <Alert class="mt-4" variant="destructive">
          <AlertCircle class="w-4 h-4" />
          <AlertTitle>Attention !</AlertTitle>
          <AlertDescription>
            You can not change the prompt, lock time or close time after
            deployment to blockchain.
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter class="flex justify-between px-6">
        <Button variant="outline" @click="resetForm"> Reset </Button>

        <BetCreateConfirmationDialog
          :controlled-values="controlledValues"
          @submit="onSubmit"
        >
          <Button>Create</Button>
        </BetCreateConfirmationDialog>
      </CardFooter>
    </Card>
  </div>
</template>
