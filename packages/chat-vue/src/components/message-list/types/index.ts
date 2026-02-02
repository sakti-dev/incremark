/**
 * MessageList 组件类型定义
 */

/**
 * MessageList 组件 Props
 *
 * 纯滚动容器，封装 AutoScrollContainer，向外暴露 auto-scroll 相关 props 和 scrollToBottom 方法。
 */
export interface MessageListProps {
  /** 是否启用自动滚动（默认 true） */
  autoScroll?: boolean;
  /** 触发自动滚动的底部阈值（像素，默认 50） */
  autoScrollThreshold?: number;
  /** 滚动行为 */
  scrollBehavior?: ScrollBehavior;
}

/**
 * MessageList 暴露的方法
 */
export interface MessageListExposed {
  /** 强制滚动到底部 */
  scrollToBottom: () => void;
  /** 是否用户手动向上滚动了 */
  isUserScrolledUp: () => boolean;
}
