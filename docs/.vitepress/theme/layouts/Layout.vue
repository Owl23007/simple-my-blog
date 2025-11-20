<script setup lang="ts">
import mermaid from 'mermaid'
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, watch } from 'vue'
import HomeLayout from './HomeLayout.vue'
import NotFound from './NotFound.vue'
import SeriesLayout from './SeriesLayout.vue'

// ============ Data & Router ============
const { page, frontmatter, isDark } = useData()
const router = useRouter()
const { Layout } = DefaultTheme

// ============ Computed ============
const isNotFound = computed(() => {
  const p: any = page.value
  if (typeof p.isNotFound === 'boolean') return p.isNotFound
  return p.relativePath === '404.md' || frontmatter.value.layout === '404'
})

const layout = computed(() => (frontmatter.value as any)?.layout)

const isHomePage = computed(() => {
  const p: any = page.value
  return p.relativePath === 'index.md' || p.filePath?.endsWith('index.md')
})

// ============ Dark Mode ============
function updateDarkMode() {
  const html = document.documentElement
  isDark.value ? html.classList.add('dark') : html.classList.remove('dark')
}

onMounted(() => updateDarkMode())
watch(isDark, () => updateDarkMode())

// ============ Mermaid ============
async function renderMermaid() {
  await new Promise(resolve => setTimeout(resolve, 100))
  try {
    await mermaid.run()
  } catch (e) {
    console.error('Failed to render mermaid:', e)
  }
}

watch(() => router.route.path, renderMermaid)
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
