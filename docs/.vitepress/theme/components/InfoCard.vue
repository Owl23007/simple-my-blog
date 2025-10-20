<template>
  <div class="info-card" :class="type">
    <div class="icon" v-if="icon">{{ icon }}</div>
    <div class="content">
      <h3 v-if="title">{{ title }}</h3>
      <p>{{ content }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'info' | 'success' | 'warning' | 'error'
  icon?: string
  title?: string
  content: string
}>()
</script>

< style scoped>
  .info - card {
  padding: 16px;
  margin: 16px 0;
  border - radius: 8px;
  border: 1px solid var(--vp - c - divider);
  background: var(--vp - c - bg - soft);
  display: flex;
  gap: 12px;
  }

  .info - card.icon {
  font - size: 24px;
  }

  .info - card.info {
  border - left: 4px solid var(--vp - c - brand);
  }

  .info - card.success {
  border - left: 4px solid var(--vp - c - green);
  }

  .info - card.warning {
  border - left: 4px solid var(--vp - c - yellow);
  }

  .info - card.error {
  border - left: 4px solid var(--vp - c - red);
  }
  </style>
