<script setup lang="ts">
import { colorNameAt, siteName } from "@/constants";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.vue";
import DropdownMenuTrigger from "@/components/ui/dropdown-menu/DropdownMenuTrigger.vue";
import DropdownMenuContent from "@/components/ui/dropdown-menu/DropdownMenuContent.vue";
import DropdownMenuLabel from "@/components/ui/dropdown-menu/DropdownMenuLabel.vue";
import ModeMenu from "./ModeToggle.vue";
import NavigationMenu from "@/components/ui/navigation-menu/NavigationMenu.vue";
import NavigationMenuList from "@/components/ui/navigation-menu/NavigationMenuList.vue";
import NavigationMenuItem from "@/components/ui/navigation-menu/NavigationMenuItem.vue";
import NavigationMenuLink from "@/components/ui/navigation-menu/NavigationMenuLink.vue";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { ref } from "vue";
import UserMenu from "./UserMenu.vue";
import type { RouteLocationRaw } from "vue-router";

const paths: Array<{ name: string; to: RouteLocationRaw }> = [
  { name: "Home", to: "/" },

  { name: "Trending", to: { path: "/bet", query: { category: "all" } } },

  { name: "Sport", to: { path: "/bet", query: { category: "sport" } } },

  { name: "Politic", to: { path: "/bet", query: { category: "politic" } } },
];

const isMobileMenuOpen = ref(false);
</script>

<template>
  <header
    class="border-dashed sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container-wrapper flex h-16 items-center gap-4 px-6">
      <NuxtLink to="/" class="text-xl font-bold whitespace-nowrap">
        <span class="text-brand">{{ siteName.slice(0, colorNameAt) }}</span
        >{{ siteName.slice(colorNameAt) }}
      </NuxtLink>

      <div class="gap-4 flex-1 hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem v-for="item in paths" :key="item.name">
              <NuxtLink :to="item.to">
                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                  {{ item.name }}
                </NavigationMenuLink>
              </NuxtLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div class="flex items-center gap-2 ml-auto">
        <ClientOnly>
          <UserMenu />
        </ClientOnly>
        <DropdownMenu v-model:open="isMobileMenuOpen">
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="md:hidden">
              <Icon
                icon="radix-icons:hamburger-menu"
                class="h-[1.2rem] w-[1.2rem]"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-64 md:hidden" align="end">
            <DropdownMenuLabel
              v-for="item in paths"
              :key="item.name"
              @click="
                () => {
                  navigateTo(item.to);
                  isMobileMenuOpen = false;
                }
              "
            >
              {{ item.name }}
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeMenu />
      </div>
    </div>
  </header>
</template>
