<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { useQuery } from "@tanstack/vue-query";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "~/lib/utils";
import type { _Tag } from "~/_types/common";

const modelValue = defineModel<_Tag[]>();

const response = useQuery({
  queryKey: ["tagsIndex"],
  queryFn: () => $fetch("/api/tags"),
});

const tags = computed(() =>(response.data.value?.tags ?? []));

</script>

<template>
  <FormItem>
    <FormLabel>Tags</FormLabel>
    <FormControl>
      <Combobox multiple v-model="modelValue" by="id">
        <ComboboxAnchor as-child>
          <ComboboxTrigger as-child>
            <Button
              variant="outline"
              class="justify-between capitalize w-full max-w-[280px]"
            >
              <div class="flex-1 text-ellipsis overflow-hidden text-start">
                {{
                  (modelValue??[]).length > 0
                    ? modelValue?.map((el) => el.name).join(", ")
                    : "Select Tags..."
                }}
              </div>

              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </ComboboxTrigger>
        </ComboboxAnchor>

        <ComboboxList>
          <ComboboxEmpty> No tags found. </ComboboxEmpty>

          <ComboboxGroup>
            <ComboboxItem v-for="tags in tags" :key="tags.id" :value="tags">
              {{ tags.name }}

              <ComboboxItemIndicator>
                <Check :class="cn('ml-auto h-4 w-4')" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    </FormControl>
    <FormDescription>
      <div class="text-muted-foreground">Select tag or more.</div>
    </FormDescription>
    <FormMessage />
  </FormItem>
</template>
