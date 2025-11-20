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
  <div class="NotFound">
    <div class="content">
      <h1 class="title">404</h1>
      <p class="quote">页面未找到</p>
      <p class="description">
        你访问的页面不存在或已被移除
      </p>

      <div class="actions">
        <button class="action-button primary" @click="goHome">
          <span class="icon">🏠</span>
          <span>回到主页</span>
        </button>
        <button class="action-button secondary" @click="goRandom">
          <span class="icon">🎲</span>
          <span>随便看看</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.NotFound {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--vp-nav-height));
  padding: 24px;
}

.content {
  text-align: center;
  max-width: 560px;
}

.title {
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  background: linear-gradient(120deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

.quote {
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 24px 0 12px;
}

.description {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin: 0 0 48px;
}

.actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.action-button .icon {
  font-size: 20px;
}

.action-button.primary {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-button-brand-text);
}

.action-button.primary:hover {
  background-color: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.action-button.secondary {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.action-button.secondary:hover {
  background-color: var(--vp-c-bg-mute);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-button:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .title {
    font-size: 80px;
  }

  .quote {
    font-size: 20px;
  }

  .description {
    font-size: 14px;
  }

  .actions {
    flex-direction: column;
    width: 100%;
  }

  .action-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
