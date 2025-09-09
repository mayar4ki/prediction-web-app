<script setup lang="ts">
const route = useRoute();
const tx = computed(() => route.params.tx);

const {
  data: product,
  pending,
  error,
} = await useFetch(() => `https://dummyjson.com/products/${tx.value}`, {
  lazy: true,
}).then((res) => {
  //
  console.log("OMG", res.data.value?.title);
  return res;
});
</script>

<template>
  <div>
    <h1>Product Details</h1>

    <p>{{ $route.params.tx }}</p>

    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">{{ error }}</pre>
    <pre v-else>{{ product }}</pre>
  </div>
</template>
