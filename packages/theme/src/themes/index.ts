/**
 * 主题导出
 */

import type { DesignTokens } from '../tokens'
import { generateColorSystem } from '@incremark/colors'
import { defaultTheme as baseDefaultTheme } from './default'
import { darkTheme as baseDarkTheme } from './dark'

/**
 * 创建自定义主题
 *
 * @param brandColor 品牌主色（hex 格式），如果不提供则使用默认的 indigo
 * @returns 自定义主题
 *
 * @example
 * ```typescript
 * // 使用默认主题（indigo）
 * import { defaultTheme } from '@incremark/theme'
 *
 * // 自定义品牌色
 * import { createTheme } from '@incremark/theme'
 * const purpleTheme = createTheme('#a855f7')
 *
 * // 运行时切换
 * const myTheme = createTheme(userSettings.brandColor)
 * ```
 */
export function createTheme(brandColor?: string): DesignTokens {
  // 如果没有提供颜色，使用默认的 indigo（从 defaultTheme 中获取）
  const colorSystem = brandColor
    ? generateColorSystem(brandColor)
    : baseDefaultTheme.baseColors.indigo

  return {
    ...baseDefaultTheme,
    color: {
      ...baseDefaultTheme.color,
      brand: {
        1: colorSystem[1],
        2: colorSystem[2],
        3: colorSystem[3],
        4: colorSystem[4],
        5: colorSystem[5],
        6: colorSystem[6],
        7: colorSystem[7],
        8: colorSystem[8],
        9: colorSystem[9],
        10: colorSystem[10],
        primary: colorSystem.primary,
        primaryHover: colorSystem.hover,
        primaryActive: colorSystem.active,
        primaryLight: colorSystem.light
      },
      // 同步更新 link 颜色
      interactive: {
        ...baseDefaultTheme.color.interactive,
        link: colorSystem.primary,
        linkHover: colorSystem.hover
      }
    }
  }
}

/**
 * 创建深色主题
 *
 * @param brandColor 品牌主色（hex 格式），如果不提供则使用默认的较亮 indigo
 * @returns 深色主题
 */
export function createDarkTheme(brandColor?: string): DesignTokens {
  // 深色模式默认使用较亮的品牌色
  const defaultDarkColor = brandColor
    ? generateColorSystem(brandColor)
    : baseDarkTheme.baseColors.indigo

  return {
    ...baseDarkTheme,
    color: {
      ...baseDarkTheme.color,
      brand: {
        1: defaultDarkColor[1],
        2: defaultDarkColor[2],
        3: defaultDarkColor[3],
        4: defaultDarkColor[4],
        5: defaultDarkColor[5],
        6: defaultDarkColor[6],
        7: defaultDarkColor[7],
        8: defaultDarkColor[8],
        9: defaultDarkColor[9],
        10: defaultDarkColor[10],
        primary: defaultDarkColor.primary,
        primaryHover: defaultDarkColor.hover,
        primaryActive: defaultDarkColor.active,
        primaryLight: defaultDarkColor[9]
      },
      interactive: {
        ...baseDarkTheme.color.interactive,
        link: defaultDarkColor.primary,
        linkHover: defaultDarkColor.hover
      }
    }
  }
}

// 导出默认主题（indigo）
export { defaultTheme } from './default'

// 导出深色主题（indigo）
export { darkTheme } from './dark'

// 导出类型
export type { DesignTokens } from '../tokens'
