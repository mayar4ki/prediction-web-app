<script setup lang="ts">
import {
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "~/components/ui/ui-navigation-menu";
import { ref } from "vue";
import type { RouteLocationRaw } from "vue-router";
import AppLogo from "~/components/common/AppLogo.vue";
import ModeToggle from "../common/ModeToggle.vue";
import UserMenu from "../common/UserMenu.vue";
import ModeSwitch from "../common/ModeSwitch.vue";
import ChainsMenu from "../common/ChainsMenu.vue";

const paths: Array<{ name: string; to: RouteLocationRaw }> = [
  { name: "Latest", to: { path: "/bet/search-meta" } },

  {
    name: "Politic",
    to: { path: "/bet/search-meta", query: { tag: "politic" } },
  },
  {
    name: "Sport",
    to: { path: "/bet/search-meta", query: { tag: "sport" } },
  },
  {
    name: "Finance",
    to: { path: "/bet/search-meta", query: { tag: "finance" } },
  },
  {
    name: "Crypto",
    to: { path: "/bet/search-meta", query: { tag: "crypto" } },
  },
  {
    name: "Business",
    to: { path: "/bet/search-meta", query: { tag: "business" } },
  },
  { name: "Pop", to: { path: "/bet/search-meta", query: { tag: "pop" } } },
  {
    name: "Science",
    to: { path: "/bet/search-meta", query: { tag: "science" } },
  },
];

const isMobileMenuOpen = ref(false);

const modeSwitchRef = ref();

const toggleMode = () => {
  modeSwitchRef.value.toggleMode();
};

const needMore = computed(() => paths.length > 4);
</script>

<template>
  <header
    class="border-dashed sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container-wrapper flex h-16 items-center gap-4 px-6">
      <AppLogo />

      <div class="gap-4 flex-1 hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList class="gap-0">
            <NavigationMenuItem
              v-for="item in paths.slice(0, 3)"
              :key="item.name"
            >
              <NuxtLink
                :as="NavigationMenuLink"
                :class="navigationMenuTriggerStyle()"
                :to="item.to"
              >
                {{ item.name }}
              </NuxtLink>
            </NavigationMenuItem>

            <NavigationMenuItem
              v-for="item in paths.slice(3)"
              :key="item.name"
              class="hidden lg:block"
            >
              <NuxtLink
                :as="NavigationMenuLink"
                :class="navigationMenuTriggerStyle()"
                :to="item.to"
              >
                {{ item.name }}
              </NuxtLink>
            </NavigationMenuItem>

            <NavigationMenuItem v-if="needMore" class="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <div
                    :class="
                      navigationMenuTriggerStyle() +
                      ' flex flex-row items-center justify-center cursor-pointer'
                    "
                  >
                    More <Icon name="radix-icons:caret-down" size="18" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    v-for="item in paths.slice(3)"
                    :key="item.name"
                    @click="navigateTo(item.to)"
                  >
                    {{ item.name }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div class="flex items-center gap-3 md:gap-2 ml-auto">
        <ClientOnly>
          <ChainsMenu />
          <UserMenu />
        </ClientOnly>

        <DropdownMenu v-model:open="isMobileMenuOpen">
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon" class="md:hidden">
              <Icon
                name="radix-icons:hamburger-menu"
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

            <DropdownMenuSeparator />
            <DropdownMenuLabel
              class="items-center flex gap-4"
              @click="
                () => {
                  toggleMode();
                  isMobileMenuOpen = false;
                }
              "
            >
              Toggle Mode: <ModeSwitch ref="modeSwitchRef" />
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>

        <div class="hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </div>
  </header>
</template>
