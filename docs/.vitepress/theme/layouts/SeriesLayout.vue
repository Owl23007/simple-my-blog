<template>
  <Layout>
    <template #doc-before>
      <div class="series-header">
        <h1>{{ title }}</h1>
        <p class="series-subtitle">{{ description }}</p>
      </div>

      <div class="series-grid">
        <a v-for="series in seriesItems" :key="series.name" :href="series.link" class="series-card">
          <div class="series-card-content">
            <h2 class="series-card-title">{{ series.title }}</h2>
            <p class="series-card-description">{{ series.description }}</p>
            <div class="series-card-meta">
              <span class="series-card-link">了解更多 →</span>
            </div>
          </div>
        </a>
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'

const Layout = DefaultTheme.Layout

interface Series {
  name: string
  title: string
  description: string
  link: string
}

const title = '📚 系列文章'
const description = '成体系的技术学习专栏，按照主题深入展开'

const seriesItems = computed((): Series[] => {
  return [
    {
      name: '软件设计体系结构',
      title: '🧭 软件设计与体系结构',
      description: '介绍设计原则、UML 建模与12种常用设计模式。',
      link: '/series/软件设计体系结构/'
    }
  ]
})
</script>

<style scoped>
.series-header {
  text-align: center;
  margin-bottom: 3rem;
}

.series-header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.series-subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.series-card {
  display: block;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--vp-c-bg-soft);
}

.series-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
}

.series-card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.series-card-title {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  line-height: 1.3;
}

.series-card-description {
  margin: 0 0 auto 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
}

.series-card-meta {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
}

.series-card-link {
  color: var(--vp-c-brand);
  font-weight: 500;
  transition: opacity 0.3s;
}

.series-card:hover .series-card-link {
  opacity: 0.7;
}

@media (max-width: 768px) {
  .series-header h1 {
    font-size: 2rem;
  }

  .series-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
