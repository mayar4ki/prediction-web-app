<script setup lang="ts">
import AppSidebar from "~/components/dashboard-layout/AppSidebar.vue";
import DashboardHeader from "~/components/dashboard-layout/DashboardHeader.vue";
</script>

<script lang="ts">
export const description = "A sidebar that collapses to icons.";
export const iframeHeight = "800px";
export const containerClass = "w-full h-full ";
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <DashboardHeader />
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
