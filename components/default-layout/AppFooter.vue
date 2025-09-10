<script setup lang="ts">
import {
  colorNameAt,
  footerMenuItems,
  siteName,
  siteSubName,
} from "@/constants";
import { RouterLink } from "vue-router";
</script>

<template>
  <footer
    v-if="!$route.path.startsWith('/dashboard')"
    class="border-dashed z-50 w-full border-y"
  >
    <section class="py-24 container-wrapper px-6">
      <div class="container">
        <div class="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div class="col-span-2 mb-8 lg:mb-0">
            <div class="flex items-center gap-2 lg:justify-start">
              <RouterLink to="/" class="text-xl font-bold">
                <span class="text-brand">{{
                  siteName.slice(0, colorNameAt)
                }}</span
                >{{ siteName.slice(colorNameAt) }}
              </RouterLink>
            </div>
            <p class="mt-4 font-bold">{{ siteSubName }}</p>
          </div>
          <div
            v-for="(section, sectionIdx) in footerMenuItems"
            :key="sectionIdx"
          >
            <h3 class="mb-4 font-bold">{{ section.title }}</h3>
            <ul class="text-muted-foreground space-y-4">
              <li
                v-for="(link, linkIdx) in section.links"
                :key="linkIdx"
                class="hover:text-primary font-medium"
              >
                <RouterLink v-if="link.to" :to="link.to">{{
                  link.text
                }}</RouterLink>
                <a
                  v-if="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ link.text }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <div class="container-wrapper border-t flex h-16 items-center gap-4 px-6">
      <div
        class="flex gap-4 flex-1 text-neutral-600 dark:text-neutral-500 text-sm font-medium"
      >
        &copy; {{ new Date().getFullYear() }} Built by {{ siteName }}. All
        rights reserved.
      </div>
    </div>
  </footer>
</template>
