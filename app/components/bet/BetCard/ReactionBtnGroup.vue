<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
export interface ReactionBtnGroupProps {
  commentsCount?: number;
  likesCount?: number;
}
</script>

<template>
  <div class="flex flex-row items-center gap-1">
    <Button size="icon" variant="ghost" class="w-auto gap-1 px-2 h-auto py-1">
      <Icon name="radix-icons:thick-arrow-up" size="18" />{{
        formatCompactNumber(45648)
      }}
    </Button>
    <Separator orientation="vertical" />
    <Button size="icon" variant="ghost" class="w-auto gap-1 px-2 h-auto py-1">
      <Icon name="radix-icons:thick-arrow-down" size="18" />{{
        formatCompactNumber(155999)
      }}
    </Button>
    <Separator orientation="vertical" />
    <div class="flex items-center gap-2 px-2 h-auto py-1">
      <Icon name="radix-icons:chat-bubble" size="16" />{{
        formatCompactNumber(1212)
      }}
    </div>
  </div>
</template>
