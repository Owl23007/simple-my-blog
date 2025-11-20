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

          <!-- Abstract Background Shapes -->
          <div class="hero-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
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
                    <span class="emoji">🚀</span>
                    <span class="text">探索中...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Posts Section -->
        <section class="featured-section">
          <div class="container">
            <div class="section-header">
              <div>
                <h2 class="section-title">最新文章</h2>
                <div class="title-underline"></div>
              </div>
              <a href="/posts/" class="view-all">
                查看全部
                <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3">
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
          </div>
        </section>

        <!-- Series Section -->
        <section class="series-section">
          <div class="container">
            <div class="section-header-center">
              <h2 class="section-title">系列专栏</h2>
              <p class="section-desc">
                系统性的知识整理，构建完整的知识体系
              </p>
            </div>

            <SeriesList />
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

const { Layout: DefaultLayout } = DefaultTheme

// 文章数据
const allPosts = [
  {
    title: '操作系统调度的机制',
    date: '2025-11-03',
    description: '两级调度、抢占性与多级反馈队列的解析，深入探讨操作系统核心机制。',
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
    description: '这是我的第一篇博客文章，介绍如何使用VitePress搭建个人博客，开启技术写作之旅。',
    link: '/posts/我的第一篇博客',
    tags: ['博客', 'VitePress', '技术']
  }
]

// 获取最近的3篇文章
const featuredPosts = computed(() => {
  return allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
})

// 计算统计数据
const totalPosts = computed(() => allPosts.length)
const totalSeries = computed(() => 1)
const totalTags = computed(() => {
  const tags = new Set<string>()
  allPosts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag))
  })
  return tags.size
})
</script>

<style scoped lang="less">
.home-wrapper {
  width: 100%;
}

.hero-section {
  position: relative;
  width: 100%;
  min-height: 45vh;
  padding-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #fff;
  transition: background-color 0.5s;
  margin-top: calc(var(--vp-nav-height) * -1);
  padding-top: calc(var(--vp-nav-height) + 1rem);

  .dark & {
    background-color: #030712; // gray-950
  }
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  top: -150%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.3;
    transition: opacity 0.5s;

    .dark & {
      opacity: 0.2;
      filter: brightness(0.5);
    }
  }
}

.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;

  .shape {
    position: absolute;
    border-radius: 9999px;
    filter: blur(100px);
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  .shape-1 {
    top: -20%;
    left: -10%;
    width: 50%;
    height: 50%;
    background-color: rgba(96, 165, 250, 0.2); // blue-400
  }

  .shape-2 {
    top: 20%;
    right: -10%;
    width: 40%;
    height: 40%;
    background-color: rgba(192, 132, 252, 0.2); // purple-400
    animation-delay: 700ms;
  }

  .shape-3 {
    bottom: -10%;
    left: 20%;
    width: 30%;
    height: 30%;
    background-color: rgba(45, 212, 191, 0.2); // teal-400
    animation-delay: 1000ms;
  }
}

.hero-content {
  position: relative;
  max-width: 64rem; // max-w-5xl
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  z-index: 10;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 4rem;
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
  font-size: 1.6rem !important; // text-3xl
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #111827; // gray-900
  margin-bottom: 1.5rem;
  line-height: 1.3 !important;
  transition: color 0.5s;
  animation: slide-up 0.8s ease-out forwards;
  animation-delay: 100ms;

  .dark & {
    color: #fff;
  }

  @media (min-width: 768px) {
    font-size: 1.785rem !important; // text-5xl
    line-height: 1.15 !important;
  }
}

.description {
  font-size: 1.125rem; // text-lg
  color: #4b5563; // gray-600
  margin-bottom: 1.5rem;
  line-height: 1.625;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.5s;
  animation: slide-up 0.8s ease-out forwards;
  animation-delay: 200ms;

  .dark & {
    color: #d1d5db; // gray-300
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
  border-radius: 0.75rem;
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
  border-radius: 1rem;
  transform: rotate(6deg);
  opacity: 0.2;
  filter: blur(16px);
}

.avatar-img-box {
  position: absolute;
  inset: 0;
  background-color: #fff;
  border-radius: 1rem;
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
  right: -1rem;
  background-color: #fff;
  padding: 0.75rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
  animation: bounce 1s infinite;
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
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: #f9fafb; // gray-50
  transition: background-color 0.5s;

  .dark & {
    background-color: rgba(3, 7, 18, 0.8); // gray-950/80
  }
}

.container {
  max-width: 72rem; // max-w-6xl
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.875rem; // text-3xl
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  transition: color 0.5s;

  .dark & {
    color: #fff;
  }

  @media (min-width: 768px) {
    font-size: 2.25rem; // text-4xl
  }
}

.title-underline {
  height: 0.25rem;
  width: 5rem;
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
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
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

.series-section {
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: #fff;
  transition: background-color 0.5s;

  .dark & {
    background-color: #030712;
  }
}

.section-header-center {
  text-align: center;
  margin-bottom: 4rem;
}

.section-desc {
  color: #4b5563;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.5s;

  .dark & {
    color: #9ca3af;
  }
}

.stats-section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-color: #2563eb;
  position: relative;
  overflow: hidden;
  transition: background-color 0.5s;

  .dark & {
    background-color: #0f172a; // slate-900
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
