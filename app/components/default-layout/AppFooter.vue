<script setup lang="ts">
import { colorNameAt, siteName } from "~/_constants";

import type { RouteLocationRaw } from "vue-router";
type FooterMenuItem = {
  title: string;
  links: Array<{
    text: string;
    url?: string;
    to?: RouteLocationRaw;
  }>;
};

const footerMenuItems: FooterMenuItem[] = [
  {
    title: "Product",
    links: [
      { text: "Overview", to: "/" },
      // { text: 'Pricing', url: '#' },
      // { text: 'Marketplace', url: '#' },
      // { text: 'Features', url: '#' },
      // { text: 'Integrations', url: '#' },
      // { text: 'Pricing', url: '#' },
    ],
  },
  // {
  //   title: "POl",
  //   links: [
  //     // { text: "About", url: "#" },
  //     // { text: "Team", url: "#" },
  //     // { text: "Blog", url: "#" },
  //     // { text: "Careers", url: "#" },
  //     // { text: "Contact", url: "#" },
  //     // { text: "Privacy", url: "#" },
  //   ],
  // },
  {
    title: "Resources",
    links: [
      { text: "Documentation", to: "/info/documentation" },
      { text: "GitHub", url: "https://github.com/" },
      // { text: 'Advertise', url: '#' },
    ],
  },
  // {
  //   title: 'Social',
  //   links: [
  //     { text: 'Twitter', url: '#' },
  //     { text: 'Instagram', url: '#' },
  //     { text: 'LinkedIn', url: '#' },
  //   ],
  // },
];
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
              <NuxtLinkLocale to="/" class="text-xl font-bold">
                <span class="text-brand">{{
                  siteName.slice(0, colorNameAt)
                }}</span
                >{{ siteName.slice(colorNameAt) }}
              </NuxtLinkLocale>
            </div>
            <p class="mt-4 font-bold">
              {{ $t("Predict, Bet & Play with Blockchain") }}
            </p>
          </div>
          <div
            v-for="(section, sectionIdx) in footerMenuItems"
            :key="sectionIdx"
          >
            <h3 class="mb-4 font-bold">{{ $t(section.title) }}</h3>
            <ul class="text-muted-foreground space-y-4">
              <li
                v-for="(link, linkIdx) in section.links"
                :key="linkIdx"
                class="hover:text-primary font-medium"
              >
                <NuxtLinkLocale v-if="link.to" :to="link.to">{{
                  $t(link.text)
                }}</NuxtLinkLocale>
                <a
                  v-if="link.url"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ $t(link.text) }}</a
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
        &copy;
        {{
          $t("{year} Built by {siteName}. All rights reserved.", {
            year: new Date().getFullYear(),
            siteName,
          })
        }}
      </div>
    </div>
  </footer>
</template>
