<template>
  <Timeline :items="timelineItems" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { data as buildingLogs } from '../data/building.data'
import Timeline from './Timeline.vue'

interface TimelineItem {
  title: string
  date?: string | Date
  description?: string
  tags?: string[]
  link?: string
  icon?: string | object
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger'
  color?: string
  size?: 'large' | 'normal'
  category?: string
}

const timelineItems = computed((): TimelineItem[] => {
  return buildingLogs.map((log, index) => ({
    title: log.title,
    date: log.date,
    description: log.description,
    tags: log.tags,
    link: log.link,
    type: index % 2 === 0 ? 'success' : 'primary'
  }))
})
</script>
