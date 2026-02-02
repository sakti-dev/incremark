<script setup lang="ts">
/**
 * MessageList - 消息列表滚动容器
 *
 * 封装 AutoScrollContainer，提供自动滚动与手动滚动检测。
 * 消息渲染由外部通过默认 slot 决定。
 */

import { useTemplateRef } from 'vue';
import { createImBem } from '@incremark/shared';
import { AutoScrollContainer } from '@incremark/vue';
import type { MessageListProps, MessageListExposed } from './types';

withDefaults(defineProps<MessageListProps>(), {
  autoScroll: true,
  autoScrollThreshold: 50,
  scrollBehavior: 'instant',
});

const bem = createImBem('message-list');

const containerRef = useTemplateRef<InstanceType<typeof AutoScrollContainer>>('container');

function scrollToBottom(): void {
  containerRef.value?.scrollToBottom();
}

function isUserScrolledUp(): boolean {
  return containerRef.value?.isUserScrolledUp() ?? false;
}

defineExpose<MessageListExposed>({
  scrollToBottom,
  isUserScrolledUp,
});
</script>

<template>
  <AutoScrollContainer
    ref="container"
    :enabled="autoScroll"
    :threshold="autoScrollThreshold"
    :behavior="scrollBehavior"
    :class="bem()"
  >
    <slot />
  </AutoScrollContainer>
</template>
