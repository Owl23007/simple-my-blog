<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import HomeLayout from './layouts/HomeLayout.vue'
import SeriesLayout from './layouts/SeriesLayout.vue'

const { page, frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <div v-if="page.isNotFound">
    <!-- 404 页面 - 使用默认布局 -->
    <Layout />
  </div>
  <HomeLayout v-else-if="frontmatter.layout === 'home'" />
  <SeriesLayout v-else-if="frontmatter.layout === 'series'" />
  <Layout v-else />
</template>
