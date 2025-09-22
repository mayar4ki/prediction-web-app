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
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import { DatePicker } from "~/components/ui/date-picker";
import { Input } from "~/components/ui/input";
import { Alert } from "~/components/ui/alert";
import { AlertCircle } from "lucide-vue-next";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import {
  createBetAdapter,
  formSchema,
  type FormSchema,
} from "~/validation/createBetForm";
import FeesFormItem from "~/components/bet/create/FeesFormItem.vue";
import { BackdropLoader } from "~/components/ui/backdrop-loader";
import { parseEther } from "viem";

const { handleSubmit, resetForm, controlledValues } = useForm<FormSchema>({
  validationSchema: toTypedSchema(formSchema),
  initialValues: {
    prompt: "Will Nasa land humans on Mars by 2030?",
    lockDate: fromDate(new Date(), getLocalTimeZone()),
    lockTime: "03:14",
    closeDate: fromDate(new Date(), getLocalTimeZone()),
    closeTime: "03:15",
  },
});

const { trigger: writeContract, isPending } = useCreateBet();

const onSubmit = handleSubmit((values) => {
  writeContract({
    args: createBetAdapter(values),
    value: parseEther(values.fees),
  });
});
</script>

<template>
  <div class="contain-wrapper px-6 min-h-[68vh]">
    <ClientOnly v-if="isPending">
      <BackdropLoader />
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
