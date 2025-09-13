<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";

import { toTypedSchema } from "@vee-validate/yup";

import { DatePicker } from "~/components/ui/date-picker";
import { Input } from "~/components/ui/input";
import { Alert } from "~/components/ui/alert";
import { AlertCircle } from "lucide-vue-next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  DateFormatter,
  fromDate,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";
import * as yup from "yup";
import CurrentCost from "~/components/bet/CurrentCost.vue";

const df = new DateFormatter("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const formSchema = yup.object({
  prompt: yup.string().max(240).min(10).required(),
  lockDate: yup
    .mixed<DateValue>()
    .required()
    .transform((item) => (Object.keys(item ?? {}).length === 0 ? null : item)),
  lockTime: yup.string().required(),
  closeDate: yup
    .mixed<DateValue>()
    .required()
    .transform((item) => (Object.keys(item ?? {}).length === 0 ? null : item)),
  closeTime: yup.string().required(),
});

const { handleSubmit, resetForm, controlledValues } = useForm({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    prompt: "Will Nasa land humans on Mars by 2030?",
    lockDate: fromDate(new Date(), getLocalTimeZone()),
    lockTime: "09:00",
    closeDate: fromDate(new Date(), getLocalTimeZone()),
    closeTime: "17:00",
  },
});

console.log(controlledValues.value);

const onSubmit = handleSubmit((values) => {
  toast("Event has been created", {
    description: "Sunday, December 03, 2023 at 9:00 AM",
    position: "top-right",
  });

  console.log(values);
});
</script>

<template>
  <div class="contain-wrapper px-6 min-h-[68vh]">
    <Card class="max-w-3xl mx-auto my-10">
      <CardHeader>
        <CardTitle>Create Bet</CardTitle>

        <ClientOnly>
          <CurrentCost />
        </ClientOnly>
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

        <AlertDialog>
          <AlertDialogTrigger as-child>
            <Button>Create</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. Read the summary below carefully
                before proceeding.

                <div class="mt-4">
                  <div class="px-2 space-y-1">
                    <h4
                      class="text-sm font-medium leading-none text-foreground"
                    >
                      Prompt:
                    </h4>
                    <p class="text-sm text-muted-foreground">
                      {{ controlledValues.prompt }}
                    </p>
                  </div>
                  <Separator class="my-4" />
                  <div class="px-2 space-y-1">
                    <h4
                      class="text-sm font-medium leading-none text-foreground"
                    >
                      Locked At:
                    </h4>
                    <p class="text-sm text-muted-foreground">
                      {{
                        controlledValues.lockDate?.toDate &&
                        df.format(
                          controlledValues?.lockDate?.toDate?.(
                            getLocalTimeZone()
                          )
                        )
                      }}
                      - {{ controlledValues.lockTime }} {{ getLocalTimeZone() }}
                    </p>
                  </div>
                  <Separator class="my-4" />
                  <div class="px-2 space-y-1">
                    <h4
                      class="text-sm font-medium leading-none text-foreground"
                    >
                      Closes At:
                    </h4>
                    <p class="text-sm text-muted-foreground">
                      {{
                        controlledValues.closeDate?.toDate &&
                        df.format(
                          controlledValues?.closeDate?.toDate?.(
                            getLocalTimeZone()
                          )
                        )
                      }}
                      - {{ controlledValues.closeTime }}
                      {{ getLocalTimeZone() }}
                    </p>
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel class="self-left">Cancel</AlertDialogCancel>
              <AlertDialogAction @click="onSubmit">Deploy</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  </div>
</template>
