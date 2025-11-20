<template>
  <div class="series-list">
    <div v-for="series in seriesItems" :key="series.name" class="series-item">
      <a :href="series.link" class="series-link">
        <h3 class="series-title">{{ series.title }}</h3>
        <p v-if="series.description" class="series-description">
          {{ series.description }}
        </p>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Series {
  name: string
  title: string
  description: string
  link: string
}

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
.series-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.series-item {
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.series-item:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.series-link {
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
}

.series-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand);
}

.series-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}
</style>
