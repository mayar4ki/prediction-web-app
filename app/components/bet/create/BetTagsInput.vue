<script setup lang="ts">
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { cn } from "~/lib/utils";
import type { _Tag } from "~/_types/common";
import type { ComboboxRootEmits, ComboboxRootProps } from "reka-ui";
import { useForwardPropsEmits } from "reka-ui";

const props = defineProps<ComboboxRootProps<_Tag>>();
const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);

const response = useTagsIndex();
const tags = computed(() => response.data.value?.tags ?? []);

const val = computed(() => (props.modelValue as _Tag[]) ?? []);
</script>

<template>
  <FormItem>
    <FormLabel>Tags</FormLabel>
    <FormControl>
      <Combobox v-bind="forwarded" by="id" multiple>
        <ComboboxAnchor as-child>
          <ComboboxTrigger as-child>
            <Button
              variant="outline"
              class="justify-between capitalize w-full max-w-[280px]"
            >
              <div class="flex-1 text-ellipsis overflow-hidden text-start">
                {{
                  val.length > 0
                    ? val.map((el) => (el as _Tag).name).join(", ")
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
            <ComboboxItem
              v-for="tag in tags"
              :key="tag.id"
              :value="tag"
              @select.prevent="(modelValue as _Tag[])?.push(tag)"
            >
              {{ tag.name }}

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
