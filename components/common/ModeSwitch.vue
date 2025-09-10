<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { Switch } from "../ui/switch";

const mode = useColorMode();

const toggleMode = () => {
  mode.value = mode.value === "dark" ? "light" : "dark";
};

defineExpose({
  mode,
  toggleMode,
});
</script>

<template>
  <Switch :model-value="mode === 'dark'" @update:model-value="toggleMode">
    <template #thumb>
      <div class="flex items-center justify-center flex-1 h-full">
        <Icon v-if="mode === 'dark'" name="lucide:moon" class="size-3" />
        <Icon v-else name="lucide:sun" class="size-3" size="12" />
      </div>
    </template>
  </Switch>
</template>
