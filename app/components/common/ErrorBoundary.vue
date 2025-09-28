<script setup>
import { AlertCircle } from "lucide-vue-next";
import { ref, onErrorCaptured } from "vue";

const hasError = ref(false);
const error = ref(null);

onErrorCaptured((err, instance, info) => {
  hasError.value = true;
  error.value = err;
  // You can also log the error to an error tracking service here
  console.error("Error captured by ErrorBoundary:", err, info);
  // Return false to stop the error from propagating further up the component tree
  return false;
});

const clearError = () => {
  hasError.value = false;
  error.value = null;
};
</script>

<template>
  <div v-if="hasError">
    <div class="flex flex-col justify-center items-center gap-6">
      <NuxtImg
        src="./img/error.png"
        width="155"
        height="200"
        class="opacity-40"
      />
      <Alert variant="destructive" class="max-w-lg">
        <AlertCircle class="w-4 h-4" />
        <AlertTitle>{{ $t("Something went wrong") }} !</AlertTitle>
        <AlertDescription> {{ error.message }} </AlertDescription>
      </Alert>
      <Button @click="clearError" variant="outline">Try again</Button>
    </div>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>
