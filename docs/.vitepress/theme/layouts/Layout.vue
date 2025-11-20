<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, watch } from 'vue'
import HomeLayout from './HomeLayout.vue'
import NotFound from './NotFound.vue'
import SeriesLayout from './SeriesLayout.vue'

const { page, frontmatter, isDark } = useData()
const { Layout } = DefaultTheme

// 部分 VitePress 版本的 PageData 不包含 isNotFound 类型定义，这里做一个兼容判断
const isNotFound = computed(() => {
  const p: any = page.value
  if (typeof p.isNotFound === 'boolean') return p.isNotFound
  return p.relativePath === '404.md' || frontmatter.value.layout === '404'
})

// 安全获取 frontmatter.layout
const layout = computed(() => (frontmatter.value as any)?.layout)

// 检查是否是首页
const isHomePage = computed(() => {
  const p: any = page.value
  return p.relativePath === 'index.md' || p.filePath?.endsWith('index.md')
})

// 手动处理暗色模式类
onMounted(() => {
  updateDarkMode()
})

watch(isDark, () => {
  updateDarkMode()
})

function updateDarkMode() {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

</script>

<template>
  <Layout v-if="isNotFound">
    <template #not-found>
      <NotFound />
    </template>
  </Layout>
  <HomeLayout v-else-if="layout === 'home' && isHomePage" />
  <SeriesLayout v-else-if="layout === 'series'" />
  <Layout v-else />
</template>
