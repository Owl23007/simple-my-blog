<script setup lang="ts">
import { useData, useRouter } from 'vitepress'
import { computed } from 'vue'

const { site, theme } = useData()
const router = useRouter()

// 获取所有文章链接用于"随便看看"功能
const allLinks = computed(() => {
  const links: string[] = []

  // 从导航栏收集链接
  const nav = theme.value.nav || []
  nav.forEach((item: any) => {
    if (item.link) links.push(item.link)
    if (item.items) {
      item.items.forEach((subItem: any) => {
        if (subItem.link) links.push(subItem.link)
      })
    }
  })

  // 过滤掉首页
  return links.filter(link => link !== '/')
})

// 回到首页
const goHome = () => {
  router.go('/')
}

// 随便看看 - 随机跳转到一个页面
const goRandom = () => {
  if (allLinks.value.length === 0) {
    goHome()
    return
  }

  const randomIndex = Math.floor(Math.random() * allLinks.value.length)
  const randomLink = allLinks.value[randomIndex]
  router.go(randomLink)
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-quote">页面未找到</p>
      <p class="not-found-description">
        这个文章已经迷失在宇宙中了... 试试其他页面吧
      </p>

      <div class="not-found-actions">
        <button class="not-found-btn-primary" @click="goHome">
          <span class="not-found-icon">🏠</span>
          <span>回到主页</span>
        </button>
        <button class="not-found-btn-secondary" @click="goRandom">
          <span class="not-found-icon">🎲</span>
          <span>随便看看</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --bg-gradient-start: rgb(255, 250, 245);
  --bg-gradient-middle: rgb(240, 248, 255);
  --bg-gradient-end: rgb(245, 240, 255);
}

html.dark {
  --bg-gradient-start: rgb(0, 0, 0);
  --bg-gradient-middle: rgb(15, 15, 25);
  --bg-gradient-end: rgb(20, 10, 30);
}

/* 容器样式 */
.not-found-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--vp-nav-height));
  padding: 24px;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-gradient-start) 0%, var(--bg-gradient-middle) 50%, var(--bg-gradient-end) 100%);
}

/* 背景装饰圆形 */
.not-found-container::before,
.not-found-container::after {
  position: absolute;
  border-radius: 50%;
  content: '';
  filter: blur(50px);
}

.not-found-container::before {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--vp-c-brand-1) 0%, transparent 70%);
  opacity: 0.25;
  top: -150px;
  left: -150px;
  animation: float 8s ease-in-out infinite, pulse 3s ease-in-out infinite;
}

.not-found-container::after {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--vp-c-brand-2) 0%, transparent 70%);
  opacity: 0.2;
  bottom: -100px;
  right: -100px;
  animation: float 10s ease-in-out infinite reverse, pulse 4s ease-in-out infinite reverse;
}

/* 内容区域 */
.not-found-content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 560px;
  margin-top: -80px;
}

/* 标题 */
.not-found-title {
  font-size: 120px;
  font-weight: 900;
  line-height: 1;
  margin: 0 0 20px 0;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2), var(--vp-c-brand-1));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -2px;
  text-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

/* 引言文本 */
.not-found-quote {
  font-size: 24px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
  letter-spacing: 0.5px;
  animation: slideDown 0.6s ease-out 0.2s both;
}

/* 描述文本 */
.not-found-description {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 56px 0;
  line-height: 1.6;
  animation: slideDown 0.6s ease-out 0.3s both;
}

/* 按钮容器 */
.not-found-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  animation: slideDown 0.6s ease-out 0.4s both;
}

/* 主按钮 */
.not-found-btn-primary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  color: var(--vp-button-brand-text);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.not-found-btn-primary::before {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.not-found-btn-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.not-found-btn-primary:hover::before {
  transform: translateX(100%);
}

.not-found-btn-primary:active {
  transform: translateY(-2px);
}

/* 次要按钮 */
.not-found-btn-secondary {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.not-found-btn-secondary::before {
  position: absolute;
  inset: 0;
  content: '';
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s;
}

.not-found-btn-secondary:hover {
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  color: var(--vp-c-brand-1);
}

.not-found-btn-secondary:hover::before {
  transform: translateX(100%);
}

.not-found-btn-secondary:active {
  transform: translateY(-2px);
}

/* 按钮图标 */
.not-found-icon {
  display: inline-block;
  font-size: 22px;
  transition: transform 0.3s ease;
}

.not-found-btn-primary:hover .not-found-icon,
.not-found-btn-secondary:hover .not-found-icon {
  transform: scale(1.2) rotate(5deg);
}

/* 动画 */
@keyframes float {
  0% {
    transform: translateY(0px);
  }

  25% {
    transform: translateY(-30px);
  }

  50% {
    transform: translateY(-10px);
  }

  75% {
    transform: translateY(-35px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.25;
    transform: scale(1);
  }

  50% {
    opacity: 0.35;
    transform: scale(1.1);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .not-found-title {
    font-size: 80px;
  }

  .not-found-quote {
    font-size: 20px;
  }

  .not-found-description {
    font-size: 14px;
  }

  .not-found-actions {
    flex-direction: column;
    width: 100%;
  }

  .not-found-btn-primary,
  .not-found-btn-secondary {
    width: 100%;
    justify-content: center;
    padding: 12px 24px;
  }
}
</style>
