<script setup lang="ts">
/**
 * 自动滚动演示 - 模拟流式消息添加，展示自动滚动行为
 */
import { ref, onUnmounted } from 'vue';
import MessageList from '../message-list.vue';
import MessageBubble from '../../message-bubble/message-bubble.vue';
import TextMessage from '../../text-message/text-message.vue';
import type { TextPart } from '@incremark/chat-core';
import type { MessageListExposed } from '../types';

interface DemoMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const listRef = ref<MessageListExposed | null>(null);
const messages = ref<DemoMessage[]>([
  { id: '1', role: 'user', text: '给我讲一个长故事' },
]);

let count = 1;
let timer: ReturnType<typeof setInterval> | null = null;

function startStreaming() {
  if (timer) return;
  timer = setInterval(() => {
    count++;
    messages.value.push({
      id: String(count),
      role: count % 2 === 0 ? 'assistant' : 'user',
      text: `这是第 ${count} 条消息。向上滚动后自动滚动暂停，滚回底部后恢复。`,
    });
  }, 1000);
}

function stopStreaming() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function forceScroll() {
  listRef.value?.scrollToBottom();
}

onUnmounted(() => stopStreaming());

function toPart(text: string, role: string): TextPart {
  return { type: 'text', content: text, format: role === 'user' ? 'plain' : 'markdown' };
}
</script>

<template>
  <div>
    <div style="margin-bottom: 8px; display: flex; gap: 8px;">
      <button @click="startStreaming">
        开始添加消息
      </button>
      <button @click="stopStreaming">
        停止
      </button>
      <button @click="forceScroll">
        滚动到底部
      </button>
    </div>

    <div style="height: 400px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
      <MessageList ref="listRef">
        <MessageBubble
          v-for="msg in messages"
          :key="msg.id"
          :placement="msg.role === 'user' ? 'end' : 'start'"
          :variant="msg.role === 'user' ? 'filled' : 'borderless'"
        >
          <TextMessage :part="toPart(msg.text, msg.role)" />
        </MessageBubble>
      </MessageList>
    </div>
  </div>
</template>
