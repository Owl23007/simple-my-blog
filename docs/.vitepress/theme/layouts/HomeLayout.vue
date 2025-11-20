<template>
  <Layout>
    <template #home-hero-before>

      <!-- Hero 部分 -->
      <section class="hero">
        <div class="hero-container">
          <div class="hero-avatar">
            <img :src="avatar" :alt="name" class="avatar-img" />
          </div>
          <h1 class="hero-title">{{ name }}</h1>
          <p class="hero-tagline">{{ tagline }}</p>
          <div class="hero-buttons">
            <a href="/posts/" class="btn btn-primary">开始阅读</a>
            <a href="/series/" class="btn btn-secondary">系列文章</a>
          </div>
        </div>
      </section>

      <!-- 引言轮播 -->
      <section class="inspiring-section">
        <div class="inspiring-container">
          <div class="inspiring-content">
            <p class="inspiring-text">{{ currentInspiring }}</p>
          </div>
        </div>
      </section>

      <!-- 快速导航 -->
      <section class="quick-nav">
        <div class="nav-container">
          <h2>快速导航</h2>
          <div class="nav-grid">
            <a href="/posts/" class="nav-card">
              <span class="nav-icon">📝</span>
              <span class="nav-title">博客文章</span>
            </a>
            <a href="/series/" class="nav-card">
              <span class="nav-icon">📚</span>
              <span class="nav-title">系列文章</span>
            </a>
            <a href="/building/" class="nav-card">
              <span class="nav-icon">🏗️</span>
              <span class="nav-title">建站日记</span>
            </a>
            <a href="/life/" class="nav-card">
              <span class="nav-icon">🎨</span>
              <span class="nav-title">生活点滴</span>
            </a>
            <a href="/pages/about" class="nav-card">
              <span class="nav-icon">👤</span>
              <span class="nav-title">关于我</span>
            </a>
            <a href="https://github.com/Owl23007/simple-my-blog" class="nav-card">
              <span class="nav-icon">🔗</span>
              <span class="nav-title">GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, ref } from 'vue'

const Layout = DefaultTheme.Layout

const name = '沃以的小站'
const tagline = '如果人生只剩22分钟，不如烤个棉花糖吧'
const avatar = '/avatar.png'

const inspiringList = [
  '千万不要因为走得太久，而忘记了我们为什么出发',
  '人生就像一场修行，你不可能一开始就修成正果',
  '无论多么沉重的负担，也不要忘记微笑；无论多么漫长的路程，也不要忘记坚持',
  '生活的真谛不在繁华，而在于淡泊'
]

const currentIndex = ref(0)
const currentInspiring = computed(() => inspiringList[currentIndex.value])

onMounted(() => {
  // 自动轮播
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % inspiringList.length
  }, 3000)
})
</script>

<style scoped>
/* 隐藏 VPDoc 容器（仅在首页） */
:deep(.vp-doc) {
  display: none !important;
}

/* Hero 部分 */
.hero {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, var(--vp-c-bg-mute) 0%, var(--vp-c-bg-soft) 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
}

/* Hero 背景装饰 */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/bg.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
}

/* Hero 遮罩层 */
.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(ellipse at center, transparent 0%, rgba(var(--vp-c-bg-rgb), 0.6) 100%);
  z-index: 1;
  pointer-events: none;
}

.hero-container {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-avatar {
  margin-bottom: 2rem;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--vp-c-brand);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.hero-title {
  margin: 0 0 1rem 0;
  font-size: 3rem;
  font-weight: 900;
  color: var(--vp-c-text-1);
}

.hero-tagline {
  margin: 0 0 2rem 0;
  font-size: 1.2rem;
  color: var(--vp-c-text-2);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background-color: var(--vp-c-brand);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: var(--vp-c-brand);
  border: 2px solid var(--vp-c-brand);
}

.btn-secondary:hover {
  background-color: var(--vp-c-bg-soft);
}

/* 引言部分 */
.inspiring-section {
  padding: 3rem 2rem;
  background-color: var(--vp-c-bg-mute);
}

.inspiring-container {
  max-width: 800px;
  margin: 0 auto;
}

.inspiring-content {
  text-align: center;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inspiring-text {
  margin: 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-2);
  font-style: italic;
  animation: fadeInOut 0.5s ease-in-out;
}

@keyframes fadeInOut {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* 快速导航 */
.quick-nav {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-container h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  background-color: var(--vp-c-bg);
}

.nav-card:hover {
  border-color: var(--vp-c-brand);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.nav-icon {
  font-size: 2.5rem;
}

.nav-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* 页脚 */
.footer {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-3);
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

/* 引言部分背景 */
.inspiring-section {
  position: relative;
  background: linear-gradient(135deg,
      rgba(var(--vp-c-brand-rgb), 0.05) 0%,
      rgba(var(--vp-c-brand-rgb), 0.02) 100%);
}

.inspiring-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(var(--vp-c-brand-rgb), 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(var(--vp-c-brand-rgb), 0.08) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}

.inspiring-container {
  position: relative;
  z-index: 1;
}

/* 快速导航背景 */
.quick-nav {
  position: relative;
  background: linear-gradient(to bottom, transparent 0%, var(--vp-c-bg-soft) 50%);
}

/* 响应式 */
@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-tagline {
    font-size: 1rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn {
    width: 100%;
  }

  .nav-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
  }

  .nav-card {
    padding: 1.5rem 1rem;
  }

  .nav-icon {
    font-size: 2rem;
  }
}
</style>
