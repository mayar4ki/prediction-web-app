<script setup lang="ts">
import ModeToggle from "../common/ModeToggle.vue";
import UserMenu from "../common/UserMenu.vue";
</script>

<template>
  <header
    class="border-dashed sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container-wrapper !ml-0 flex h-16 items-center gap-4 pr-6">
      <div class="flex items-center gap-2 px-4">
        <SidebarTrigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink href="#">
                Building Your Application
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator class="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div class="flex items-center gap-2 ml-auto">
        <ClientOnly>
          <UserMenu />
        </ClientOnly>
        <ModeToggle />
      </div>
    </div>
  </header>
</template>
