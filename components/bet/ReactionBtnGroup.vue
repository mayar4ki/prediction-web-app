<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface ReactionBtnGroupProps {
  commentsCount?: number;
  likesCount?: number;
}

const { commentsCount, likesCount } = defineProps<ReactionBtnGroupProps>();
</script>

<template>
  <div class="flex flex-row items-center">
    <Button
      variant="ghost"
      class="text-primary text-sm font-normal flex items-center gap-1"
    >
      <Icon name="radix-icons:chat-bubble" class="scale-105" />
      {{ commentsCount && formatCompactNumber(commentsCount) }}
    </Button>
    <Separator orientation="vertical" />
    <Button
      variant="ghost"
      class="text-primary text-sm font-normal flex items-center gap-1"
    >
      <Icon name="radix-icons:heart" class="scale-105" />
      {{ likesCount && formatCompactNumber(likesCount) }}
    </Button>
    <Separator orientation="vertical" />
    <Button
      variant="ghost"
      class="text-primary text-sm font-normal flex items-center gap-1"
    >
      <Icon name="radix-icons:link-2" class="scale-105" />
    </Button>
  </div>
</template>
