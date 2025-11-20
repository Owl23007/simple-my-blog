<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import NotFound from '../components/NotFound.vue'
import SeriesLayout from './SeriesLayout.vue'

const { page, frontmatter } = useData()
const { Layout } = DefaultTheme

// 部分 VitePress 版本的 PageData 不包含 isNotFound 类型定义，这里做一个兼容判断
// 方案：优先使用运行时可能存在的 page.value.isNotFound，其次回退到 relativePath / frontmatter.layout 判定
const isNotFound = computed(() => {
  const p: any = page.value
  if (typeof p.isNotFound === 'boolean') return p.isNotFound
  // 如果存在 404.md 或 frontmatter.layout === '404' 时认定为 404
  return p.relativePath === '404.md' || frontmatter.value.layout === '404'
})

// 安全获取 frontmatter.layout
const layout = computed(() => (frontmatter.value as any)?.layout)
</script>

<template>
  <Layout v-if="isNotFound">
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
  <SeriesLayout v-else-if="layout === 'series'" />
  <Layout v-else />
</template>
