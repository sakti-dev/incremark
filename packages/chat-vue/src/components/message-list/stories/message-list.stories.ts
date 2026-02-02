/**
 * message-list.stories.ts
 *
 * MessageList 组件的 Storybook 注册文件
 */

import type { Meta, StoryObj } from '@storybook/vue3';
import MessageList from '../message-list.vue';
import BasicStory from './basic.story.vue';
import AutoScrollStory from './auto-scroll.story.vue';

const meta = {
  title: 'Chat-UI/MessageList',
  component: MessageList,
  argTypes: {
    autoScroll: {
      control: 'boolean',
      description: '是否启用自动滚动',
    },
    autoScrollThreshold: {
      control: { type: 'number', min: 0, max: 200 },
      description: '触发自动滚动的底部阈值（像素）',
    },
    scrollBehavior: {
      control: 'select',
      options: ['instant', 'smooth', 'auto'],
      description: '滚动行为',
    },
  },
} satisfies Meta<typeof MessageList>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基础用法
export const Basic: Story = {
  render: () => ({
    components: { BasicStory },
    template: '<BasicStory />',
  }),
};

// 自动滚动演示
export const AutoScroll: Story = {
  render: () => ({
    components: { AutoScrollStory },
    template: '<AutoScrollStory />',
  }),
};
