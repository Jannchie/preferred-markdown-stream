import type { VNode } from 'vue'
import { addFadeInClassToTreeNodes } from '@preferred-markdown-stream/core'

export function addFadeInToVNodes(
  childrenRaw: VNode[],
  loading: boolean,
  fadeInClass = 'fade-in',
): VNode[] {
  return addFadeInClassToTreeNodes(
    childrenRaw as any[],
    loading,
    fadeInClass,
  ) as VNode[]
}
