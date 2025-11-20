<template>
  <div class="posts-list-wrapper">
    <Timeline :items="timelineItems" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as allPosts } from '../data/posts.data'
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

const timelineItems = computed<TimelineItem[]>(() => {
  return allPosts
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
