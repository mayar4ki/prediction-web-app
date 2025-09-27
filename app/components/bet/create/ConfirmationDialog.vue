<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
import type { useForm } from "vee-validate";
import type { FormSchema } from "~/_validation/createBetForm";

interface ConfirmationDialogProps {
  controlledValues: ReturnType<
    typeof useForm<FormSchema>
  >["controlledValues"]["value"];
  onSubmit: () => void;
}

defineProps<ConfirmationDialogProps>();

const df = new DateFormatter("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle
          >{{ $t("Are you absolutely sure") }}?</AlertDialogTitle
        >
        <AlertDialogDescription>
          {{
            $t(
              "This action cannot be undone. Read the summary below carefully before proceeding."
            )
          }}

          <div class="mt-4">
            <div class="px-2 space-y-1">
              <h4 class="text-sm font-medium leading-none text-foreground">
                {{ $t("Prompt") }}:
              </h4>
              <p class="text-sm text-muted-foreground">
                {{ controlledValues.prompt }}
              </p>
            </div>
            <Separator class="my-4" />
            <div class="px-2 space-y-1">
              <h4 class="text-sm font-medium leading-none text-foreground">
                {{ $t("Locked At") }}:
              </h4>
              <p class="text-sm text-muted-foreground">
                {{
                  controlledValues.lockDate?.toDate &&
                  df.format(
                    controlledValues?.lockDate?.toDate?.(getLocalTimeZone())
                  )
                }}
                - {{ controlledValues.lockTime }} {{ getLocalTimeZone() }}
              </p>
            </div>
            <Separator class="my-4" />
            <div class="px-2 space-y-1">
              <h4 class="text-sm font-medium leading-none text-foreground">
                {{ $t("Closes At") }}:
              </h4>
              <p class="text-sm text-muted-foreground">
                {{
                  controlledValues.closeDate?.toDate &&
                  df.format(
                    controlledValues?.closeDate?.toDate?.(getLocalTimeZone())
                  )
                }}
                - {{ controlledValues.closeTime }}
                {{ getLocalTimeZone() }}
              </p>
              <Separator class="my-4" />
              <div class="px-2 space-y-1">
                <h4 class="text-sm font-medium leading-none text-foreground">
                  {{ $t("Fees Gwei") }}:
                </h4>
                <p class="text-sm text-muted-foreground">
                  {{ controlledValues.fees }}
                </p>
              </div>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel class="self-left">{{
          $t("Cancel")
        }}</AlertDialogCancel>
        <AlertDialogAction @click="onSubmit">{{
          $t("Deploy")
        }}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
