<script setup lang="ts">
/**
 * 基础用法 - 展示 MessageList 作为消息滚动容器
 */
import { ref } from 'vue';
import MessageList from '../message-list.vue';
import MessageBubble from '../../message-bubble/message-bubble.vue';
import TextMessage from '../../text-message/text-message.vue';
import type { TextPart } from '@incremark/chat-core';

const messages = ref([
  { id: '1', role: 'user' as const, text: '你好，请介绍一下你自己' },
  { id: '2', role: 'assistant' as const, text: '你好！我是一个 AI 助手，可以帮你回答问题、写作和编程。' },
  { id: '3', role: 'user' as const, text: '你擅长什么？' },
  { id: '4', role: 'assistant' as const, text: '我擅长自然语言处理、代码生成、文本翻译、摘要提取等任务。有什么我能帮你的吗？' },
]);

function toPart(text: string, role: string): TextPart {
  return { type: 'text', content: text, format: role === 'user' ? 'plain' : 'markdown' };
}
</script>

<template>
  <div style="height: 400px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
    <MessageList>
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
</template>
