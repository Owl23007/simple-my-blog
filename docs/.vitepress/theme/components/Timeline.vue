<template>
  <div class="timeline-wrapper">
    <el-timeline>
      <el-timeline-item v-for="(item, index) in sortedItems" :key="index"
        :timestamp="item.date ? formatDate(item.date) : ''" placement="top" :icon="item.icon" :type="item.type"
        :color="item.color" :size="item.size || 'normal'">
        <a v-if="item.link" :href="item.link" class="timeline-content-link">
          <div class="timeline-content">
            <div class="timeline-header">
              <div class="timeline-item-title">
                {{ item.title }}
                <span class="icon-arrow">→</span>
              </div>
              <div v-if="item.tags && item.tags.length" class="timeline-tags">
                <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>

            <p v-if="item.description" class="timeline-item-description">
              {{ item.description }}
            </p>

            <div v-if="item.category" class="timeline-category">
              {{ item.category }}
            </div>
          </div>
        </a>
        <div v-else class="timeline-content">
          <div class="timeline-header">
            <div class="timeline-item-title">
              {{ item.title }}
            </div>
            <div v-if="item.tags && item.tags.length" class="timeline-tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>

          <p v-if="item.description" class="timeline-item-description">
            {{ item.description }}
          </p>

          <div v-if="item.category" class="timeline-category">
            {{ item.category }}
          </div>
        </div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { ElTimeline, ElTimelineItem } from 'element-plus'
import { computed } from 'vue'

interface TimelineItem {
  title: string
  date?: string | Date
  description?: string
  link?: string
  icon?: string | object
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  color?: string
  size?: 'large' | 'normal'
  tags?: string[]
  category?: string
}

const props = defineProps<{
  items: TimelineItem[]
}>()

const sortedItems = computed(() => {
  return [...props.items].sort((a, b) => {
    if (!a.date || !b.date) return 0
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
})

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped lang="scss">
.timeline-wrapper {
  width: 100%;
  padding: 20px 0;

  :deep(.el-timeline) {
    padding: 0;
  }

  :deep(.el-timeline-item__content) {
    padding: 0 0 0 16px;
  }

  :deep(.el-timeline-item__timestamp) {
    font-size: 14px;
    font-weight: 600;
    color: var(--vp-c-brand);
    letter-spacing: 0.5px;
    min-width: 120px;
  }

  :deep(.el-timeline-item__node) {
    background: linear-gradient(135deg, var(--vp-c-brand), #5dade2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
      transform: scale(1.1);
    }
  }

  :deep(.el-timeline-item__line) {
    border-left: 2px solid var(--vp-c-divider);
    transition: border-color 0.3s ease;
  }

  :deep(.el-timeline-item:last-child .el-timeline-item__line) {
    border-left: 2px solid transparent;
  }
}

.timeline-content-link {
  display: block;
  text-decoration: none;
  color: inherit;

  &:hover .timeline-content {
    border-color: var(--vp-c-brand);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &:hover .timeline-item-title {
    color: var(--vp-c-brand);

    .icon-arrow {
      transform: translateX(4px);
    }
  }
}

.timeline-content {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 12px 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  cursor: pointer;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 6px;
}

.timeline-item-title {
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: all 0.3s ease;
  word-break: break-word;
}

.icon-arrow {
  margin-left: 6px;
  display: inline-block;
  transition: transform 0.3s ease;
  opacity: 0.7;
}

.timeline-item-description {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 6px;
}

.timeline-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  background: linear-gradient(135deg, var(--vp-c-brand-light), var(--vp-c-brand-lighter));
  color: var(--vp-c-brand-dark);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: var(--vp-c-brand);
    color: white;
    transform: translateY(-1px);
  }
}

.timeline-category {
  display: inline-block;
  padding: 4px 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }
}

@media (max-width: 768px) {
  .timeline-wrapper {
    :deep(.el-timeline-item__timestamp) {
      font-size: 12px;
      min-width: 100px;
    }
  }

  .timeline-content {
    padding: 10px 12px;
  }

  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .timeline-item-title {
    font-size: 14px;
  }

  .timeline-item-description {
    font-size: 13px;
  }

  .tag {
    font-size: 10px;
    padding: 2px 6px;
  }
}
</style>
