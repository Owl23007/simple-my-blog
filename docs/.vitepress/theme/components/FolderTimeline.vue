<template>
  <Timeline :items="timelineItems" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

// 硬编码的数据，演示用
const timelineItems = computed((): TimelineItem[] => {
  return [
    {
      title: '网站开发日志 I - 支持系列文章和分类导航',
      date: '2025-11-03',
      description: '重新设计博客的文件夹结构和导航系统，更好地支持系列文章和分类浏览',
      tags: ['建站', 'VitePress', '网站结构'],
      link: '/building/网站建站日志%20I',
      type: 'success'
    },
    {
      title: 'CI/CD配置',
      description: '本站使用的CI/CD配置',
      tags: ['CI/CD', 'GitHub Actions'],
      link: '/building/CICD配置'
    },
    {
      title: '分支策略',
      description: '项目的版本控制与分支管理策略',
      tags: ['Git', '开发流程'],
      link: '/building/分支策略'
    },
    {
      title: '网站建站日志 II',
      description: '博客的持续优化与功能迭代',
      tags: ['建站', 'VitePress'],
      link: '/building/网站建站日志%20II'
    }
  ]
})
</script>
