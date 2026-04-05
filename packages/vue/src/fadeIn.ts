import type {
  FadeInClassOptions,
} from '@preferred-markdown-stream/core'
import type { VNode } from 'vue'
import {
  addFadeInClassToTreeNodes,
} from '@preferred-markdown-stream/core'

export function addFadeInToVNodes(
  childrenRaw: VNode[],
  loading: boolean,
  options?: string | FadeInClassOptions,
): VNode[] {
  return addFadeInClassToTreeNodes(
    childrenRaw as any[],
    loading,
    options,
  ) as VNode[]
}
