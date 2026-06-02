<template>
  <DefaultLayout>
    <template #home-hero-before>
      <div class="home-wrapper">
        <!-- Hero Section -->
        <section class="hero-section">
          <!-- Background Image -->
          <div class="hero-bg">
            <img src="../assets/bg.webp" alt="" />
          </div>

          <div class="hero-content">
            <div class="hero-inner">
              <!-- Text Content -->
              <div class="hero-text">
                <h1 class="title">
                  如果人生只剩22分钟，<br>不如烤个棉花糖吧。
                </h1>

                <p class="description">
                  保持好奇，赤忱如初
                </p>

                <div class="actions">
                  <a href="/posts/" class="btn btn-primary">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    开始阅读
                  </a>
                  <a href="/pages/about" class="btn btn-secondary">
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    关于我
                  </a>
                </div>
              </div>

              <!-- Hero Image/Avatar -->
              <div class="hero-avatar">
                <div class="avatar-wrapper">
                  <div class="avatar-bg"></div>
                  <div class="avatar-img-box">
                    <img src="/avatar.png" alt="Avatar" />
                  </div>
                  <!-- Floating Badge -->
                  <div class="floating-badge">
                    <span class="emoji">📍</span>
                    <span class="text">武汉</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Posts Section -->
        <section class="featured-section">
          <div class="container">
            <div class="featured-layout">
              <div class="featured-main">
                <div class="section-header">
                  <div>
                    <h2 class="section-title">最新文章</h2>
                    <div class="title-underline"></div>
                  </div>
                  <a href="/posts/" class="view-all">
                    查看全部
                    <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3">
                      </path>
                    </svg>
                  </a>
                </div>

                <div class="posts-grid">
                  <ArticleCard v-for="(article, index) in featuredPosts" :key="article.link" :article="article"
                    class="post-card" :style="{ animationDelay: `${index * 100}ms` }" />
                </div>

                <div class="mobile-view-all">
                  <a href="/posts/">查看全部文章 →</a>
                </div>

                <!-- Series Section -->
                <div class="series-wrapper">
                  <div class="section-header">
                    <div>
                      <h2 class="section-title">系列专栏</h2>
                      <div class="title-underline"></div>
                    </div>
                  </div>
                  <SeriesList />
                </div>
              </div>

              <!-- Sidebar -->
              <div class="featured-sidebar">
                <div class="status-card">
                  <h3 class="status-title">网站状态</h3>
                  <div class="status-list">
                    <div class="status-item">
                      <span class="label">文章总数</span>
                      <span class="value">{{ totalPosts }}</span>
                    </div>
                    <div class="status-item">
                      <span class="label">系列专栏</span>
                      <span class="value">{{ totalSeries }}</span>
                    </div>
                    <div class="status-item">
                      <span class="label">标签数量</span>
                      <span class="value">{{ totalTags }}</span>
                    </div>
                    <div class="status-item">
                      <span class="label">运行天数</span>
                      <span class="value">{{ runDays }} 天</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import ArticleCard from '../components/ArticleCard.vue'
import SeriesList from '../components/SeriesList.vue'
import { data as allPosts } from '../data/posts.data'
import { data as allSeries } from '../data/series.data'

const { Layout: DefaultLayout } = DefaultTheme

// 获取最近的3篇文章
const featuredPosts = computed(() => {
  return allPosts.slice(0, 4)
})

// 计算统计数据
const totalPosts = computed(() => allPosts.length)
const totalSeries = computed(() => allSeries.length)
const totalTags = computed(() => {
  const tags = new Set<string>()
  allPosts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return tags.size
})

// 运行时间
const startDate = new Date('2025-10-19')
const runDays = computed(() => {
  const diff = new Date().getTime() - startDate.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
})
</script>

<style scoped>
.home-wrapper {
  width: 100%;
}

.hero-section {
  position: relative;
  width: 100%;
  min-height: 52vh;
  padding-bottom: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f8fafc;
  transition: background-color 0.5s;
  margin-top: calc(var(--vp-nav-height) * -1);
  padding-top: calc(var(--vp-nav-height) + 1rem);

  .dark & {
    background-color: #050812;
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  top: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.18;
    transition: opacity 0.5s;

    .dark & {
      opacity: 0.16;
      filter: brightness(0.45);
    }
  }
}

.hero-content {
  position: relative;
  max-width: 72rem;
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  z-index: 10;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 5rem;
  }
}

.hero-text {
  flex: 1;
  text-align: center;
  min-width: 0;

  @media (min-width: 768px) {
    text-align: left;
  }
}

.title {
  font-size: 1.75rem !important;
  font-weight: 800;
  letter-spacing: 0;
  color: #111827; /* gray-900 */
  margin-bottom: 1.5rem;
  line-height: 1.3 !important;
  transition: color 0.5s;
  animation: slide-up 0.8s ease-out forwards;
  animation-delay: 100ms;

  .dark & {
    color: #fff;
  }

  @media (min-width: 768px) {
    font-size: 2.4rem !important;
    line-height: 1.15 !important;
  }
}

.description {
  font-size: 1.125rem; /* text-lg */
  color: #4b5563; /* gray-600 */
  margin-bottom: 1.5rem;
  line-height: 1.625;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.5s;
  animation: slide-up 0.8s ease-out forwards;
  animation-delay: 200ms;

  .dark & {
    color: #d1d5db; /* gray-300 */
  }

  @media (min-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  animation: slide-up 0.8s ease-out forwards;
  animation-delay: 300ms;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-0.25rem);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

.btn-primary {
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: #fff;
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);

  &:hover {
    background: linear-gradient(to right, #1d4ed8, #1e40af);
    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.6);
  }
}

.btn-secondary {
  background-color: #fff;
  color: #111827;
  border: 2px solid #e5e7eb;

  .dark & {
    background-color: #1f2937;
    color: #fff;
    border-color: #374151;
  }

  &:hover {
    border-color: #3b82f6;
    background-color: #eff6ff;
    color: #2563eb;

    .dark & {
      background-color: rgba(30, 58, 138, 0.3);
      border-color: #3b82f6;
      color: #60a5fa;
    }
  }
}

.hero-avatar {
  flex: 1;
  position: relative;
  animation: fade-in 0.8s ease-out forwards;
  animation-delay: 200ms;
}

.avatar-wrapper {
  position: relative;
  width: 10rem;
  height: 10rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    width: 14rem;
    height: 14rem;
  }
}

.avatar-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top right, #3b82f6, #a855f7);
  border-radius: 8px;
  transform: rotate(6deg);
  opacity: 0.2;
  filter: blur(16px);
}

.avatar-img-box {
  position: absolute;
  inset: 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border: 4px solid #fff;
  transition: all 0.5s;

  .dark & {
    background-color: #1f2937;
    border-color: #374151;
  }

  &:hover {
    transform: rotate(2deg) scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.floating-badge {
  position: absolute;
  bottom: -1rem;
  right: -2rem;
  background-color: #fff;
  padding: 0.75rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
  animation: bounce 2s infinite alternate;
  transition: background-color 0.5s;

  .dark & {
    background-color: #1f2937;
    border-color: #374151;
  }

  .text {
    margin-left: 0.5rem;
    font-weight: 700;
    font-size: 0.875rem;
    color: #1f2937;
    transition: color 0.5s;

    .dark & {
      color: #fff;
    }
  }
}

.featured-section {
  padding-top: 3rem;
  padding-bottom: 6rem;
  background-color: #f8fafc;
  transition: background-color 0.5s;

  .dark & {
    background-color: #070b14;
  }
}

.container {
  max-width: 81rem; /* max-w-6xl */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.65rem !important;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  transition: color 0.5s;

  .dark & {
    color: #fff;
  }

  @media (min-width: 768px) {
    font-size: 1.9rem;
  }
}

.title-underline {
  height: 3px;
  width: 4rem;
  background-color: #2563eb;
  border-radius: 9999px;
}

.view-all {
  display: none;
  align-items: center;
  color: #2563eb;
  font-weight: 500;
  transition: color 0.5s;

  .dark & {
    color: #60a5fa;
  }

  &:hover {
    text-decoration: underline;

    .icon {
      transform: translateX(0.25rem);
    }
  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-left: 0.25rem;
    transition: transform 0.3s;
  }

  @media (min-width: 768px) {
    display: flex;
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.featured-layout {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
  }
}

.featured-main {
  flex: 1;
  min-width: 0;
}

.featured-sidebar {
  width: 100%;

  @media (min-width: 1024px) {
    width: 300px;
    flex-shrink: 0;
    position: sticky;
    top: 100px;
  }
}

.status-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  transition: background-color 0.5s, border-color 0.5s;
  border: 1px solid transparent;

  .dark & {
    background-color: #1f2937;
    border-color: #374151;
  }
}

.status-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: #111827;
  transition: color 0.5s;

  .dark & {
    color: #fff;
  }
}

.status-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  transition: border-color 0.5s;

  .dark & {
    border-color: #374151;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.label {
  color: #6b7280;
  font-size: 0.95rem;
  transition: color 0.5s;

  .dark & {
    color: #9ca3af;
  }
}

.value {
  font-weight: 600;
  color: #111827;
  font-family: monospace;
  font-size: 1.1rem;
  transition: color 0.5s;

  .dark & {
    color: #f3f4f6;
  }
}

.mobile-view-all {
  margin-top: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    display: none;
  }

  a {
    display: inline-flex;
    align-items: center;
    color: #2563eb;
    font-weight: 500;

    .dark & {
      color: #60a5fa;
    }
  }
}

.series-wrapper {
  margin-top: 4rem;
}

.stats-section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-color: #2563eb;
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s;

  .dark & {
    background-color: #0f172a; /* slate-900 */
  }
}

.pattern-bg {
  position: absolute;
  inset: 0;
  opacity: 0.1;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: .5;
  }
}

@keyframes slide-up {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes bounce {

  0%,
  100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
</style>

<style>
/* 覆盖 VitePress 默认主题的首页底部间距 */
.VPHome {
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
</style>
