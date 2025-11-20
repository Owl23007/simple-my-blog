<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { data as allSeries } from '../data/series.data'

const { Layout } = DefaultTheme

interface Series {
  name: string
  title: string
  description: string
  link: string
}

const title = '📚 系列文章'
const description = '成体系的技术学习专栏，按照主题深入展开'

const seriesItems = computed((): Series[] => {
  return allSeries.map(series => ({
    name: series.name,
    title: series.title,
    description: series.description,
    link: series.link
  }))
})
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="series-page">
        <div class="series-header">
          <h1 class="series-title">{{ title }}</h1>
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
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.series-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.series-header {
  text-align: center;
  margin-bottom: 3rem;
}

.series-title {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  letter-spacing: -0.02em;
}

.series-subtitle {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  font-weight: 400;
}

/* 网格布局 */
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
  box-shadow: 0 12px 24px rgba(59, 130, 246, 0.15);
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
  transition: color 0.3s ease;
}

.series-card-description {
  margin: 0 0 auto 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.6;
  flex-grow: 1;
  transition: color 0.3s ease;
}

.series-card-meta {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--vp-c-divider);
  transition: border-color 0.3s ease;
}

.series-card-link {
  color: var(--vp-c-brand);
  font-weight: 500;
  transition: all 0.3s ease;
}

.series-card:hover .series-card-link {
  opacity: 0.8;
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .series-page {
    padding: 2rem 1rem;
  }

  .series-title {
    font-size: 2rem;
  }

  .series-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
