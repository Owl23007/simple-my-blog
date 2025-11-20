<template>
  <div class="posts-list-wrapper">
    <Timeline :items="timelineItems" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Timeline from './Timeline.vue'

interface TimelineItem {
  title: string
  date?: string | Date
  description?: string
  link?: string
  icon?: string
  color?: string
  tags?: string[]
}

// 硬编码的 posts 数据，从 docs/posts 目录中的 .md 文件元数据提取
const postsData = [
  {
    title: '操作系统调度的机制',
    date: '2025-11-03',
    description: '两级调度、抢占性与多级反馈队列的解析',
    link: '/posts/操作系统调度的机制',
    tags: ['操作系统', '调度算法', 'CPU调度']
  },
  {
    title: 'Java 中的位运算',
    date: '2025-10-31',
    description: '深入理解 Java 中的位运算符及其常见应用场景，包括按位与、或、异或、取反、左移、右移等操作。',
    link: '/posts/位运算',
    tags: ['Java', '位运算']
  },
  {
    title: '我的第一篇博客',
    date: '2025-10-25',
    description: '这是我的第一篇博客文章，介绍如何使用VitePress搭建个人博客。',
    link: '/posts/我的第一篇博客',
    tags: ['博客', 'VitePress', '技术']
  }
]

const timelineItems = computed<TimelineItem[]>(() => {
  return postsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((post) => ({
      title: post.title,
      date: post.date,
      description: post.description,
      link: post.link,
      tags: post.tags,
      icon: '📝',
      color: 'var(--vp-c-brand)'
    }))
})
</script>

<style scoped>
.posts-list-wrapper {
  width: 100%;
  padding: 20px 0;
}
</style>
