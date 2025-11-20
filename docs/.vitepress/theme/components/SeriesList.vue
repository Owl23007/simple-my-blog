<template>
  <div class="series-grid">
    <div v-for="series in seriesItems" :key="series.name" class="series-card group">
      <a :href="series.link" class="series-link">
        <div class="series-icon-wrapper">
          <div class="series-icon-bg"></div>
          <span class="series-icon">{{ getSeriesIcon(series.title) }}</span>
        </div>

        <div class="series-content">
          <h3 class="series-title">{{ getSeriesTitle(series.title) }}</h3>
          <p v-if="series.description" class="series-description">
            {{ series.description }}
          </p>
        </div>

        <div class="series-footer">
          <span class="series-action">
            开始阅读
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as allSeries } from '../data/series.data'

interface Series {
  name: string
  title: string
  description: string
  link: string
}

const seriesItems = computed((): Series[] => {
  return allSeries.map(series => ({
    name: series.name,
    title: series.title,
    description: series.description,
    link: series.link
  }))
})

const getSeriesIcon = (title: string) => {
  // 尝试匹配 "图标 标题" 的格式
  const match = title.match(/^(\S+)\s+(.+)/)
  if (match) return match[1]
  // 如果没有空格分隔，取第一个字符作为图标
  return title.charAt(0)
}

const getSeriesTitle = (title: string) => {
  // 尝试匹配 "图标 标题" 的格式
  const match = title.match(/^(\S+)\s+(.+)/)
  if (match) return match[2]
  // 如果没有空格分隔，返回完整标题
  return title
}
</script>

<style scoped lang="less">
.series-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.series-card {
  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid #f3f4f6;
  transition: all 0.3s;
  height: 100%;
  position: relative;
  overflow: hidden;

  .dark & {
    background-color: #1f2937;
    border-color: #374151;
  }

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #bfdbfe;

    .dark & {
      border-color: #1e40af;
    }
  }
}

.series-link {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
  text-decoration: none;
}

.series-icon-wrapper {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.series-icon-bg {
  position: absolute;
  inset: 0;
  background-color: #eff6ff;
  border-radius: 1rem;
  transform: rotate(6deg);
  transition: transform 0.3s;

  .dark & {
    background-color: rgba(30, 58, 138, 0.3);
  }

  .group:hover & {
    transform: rotate(12deg);
  }
}

.series-icon {
  position: relative;
  font-size: 1.75rem;
  z-index: 10;
}

.series-content {
  flex: 1;
}

.series-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.75rem;
  transition: color 0.3s;

  .dark & {
    color: #fff;
  }

  .group:hover & {
    color: #2563eb;

    .dark & {
      color: #60a5fa;
    }
  }
}

.series-description {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  .dark & {
    color: #9ca3af;
  }
}

.series-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;

  .dark & {
    border-color: #374151;
  }
}

.series-action {
  display: inline-flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2563eb;
  transition: all 0.3s;

  .dark & {
    color: #60a5fa;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;
    transition: transform 0.3s;
  }

  .group:hover & {
    .icon {
      transform: translateX(0.25rem);
    }
  }
}
</style>
