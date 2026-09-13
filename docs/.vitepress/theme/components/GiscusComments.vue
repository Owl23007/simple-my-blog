<script setup lang="ts">
import Giscus from '@giscus/vue'
import { useData, withBase } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { commentsConfig } from '../../comments'
import { commentTheme } from '../utils/comments'

defineProps<{ term: string }>()
const { isDark } = useData()
const container = ref<HTMLElement>()
const active = ref(false)
const ready = ref(false)
const failed = ref(false)
const attempt = ref(0)
const themeBaseUrl = ref(commentsConfig.themeBaseUrl)
const configured = Boolean(
  commentsConfig.repoId && commentsConfig.categoryId && commentsConfig.category,
)
const theme = computed(() => commentTheme(themeBaseUrl.value, isDark.value))
const discussionsUrl = `https://github.com/${commentsConfig.repo}/discussions`
let observer: IntersectionObserver | undefined
let timeout: ReturnType<typeof setTimeout> | undefined

function activate() {
  if (!configured) return
  active.value = true
  ready.value = false
  failed.value = false
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    failed.value = true
  }, 20000)
}

function retry() {
  attempt.value++
  activate()
}

function handleMessage(event: MessageEvent) {
  const iframe = container.value
    ?.querySelector('giscus-widget')
    ?.shadowRoot?.querySelector('iframe')
  if (
    event.origin !== 'https://giscus.app' ||
    !iframe ||
    event.source !== iframe.contentWindow
  )
    return
  const data = event.data?.giscus
  if (!data || typeof data !== 'object') return
  // resize 消息意味着界面已渲染；新文章没有 discussion 元数据也能正常就绪
  if (typeof data.resizeHeight === 'number' && data.resizeHeight > 0) {
    ready.value = true
    failed.value = false
    clearTimeout(timeout)
  }
}

onMounted(() => {
  themeBaseUrl.value ||= new URL(
    withBase('/giscus/'),
    window.location.origin,
  ).href
  window.addEventListener('message', handleMessage)
  if (!configured) return
  if (!('IntersectionObserver' in window)) return activate()
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        observer?.disconnect()
        activate()
      }
    },
    { rootMargin: '200px' },
  )
  if (container.value) observer.observe(container.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(timeout)
  window.removeEventListener('message', handleMessage)
})
</script>

<template>
  <section ref="container" class="blog-discussion" aria-labelledby="discussion-title" data-pagefind-ignore>
    <header class="discussion-heading">
      <div class="discussion-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H6l-4 3v-9.5A9.5 9.5 0 0 1 11.5 3H13a7 7 0 0 1 7 8.5Z" />
          <path d="M7 9h8M7 13h5" />
        </svg>
      </div>
      <div class="discussion-intro">
        <span class="discussion-eyebrow">留下你的回声</span>
        <h2 id="discussion-title">读到这里，聊两句吧。</h2>
        <p>一个问题、一点共鸣，或是另一个角度，都很欢迎。</p>
      </div>
      <a v-if="configured" class="discussion-link" :href="discussionsUrl" target="_blank"
        rel="noopener noreferrer">GitHub Discussions ↗</a>
      <span v-else class="discussion-badge">即将开放</span>
    </header>

    <div class="discussion-content">
      <div v-if="!configured" class="discussion-empty">
        <span class="empty-mark" aria-hidden="true">“</span>
        <p>这里为你的想法留了一个位置</p>
        <span>评论区正在准备中，欢迎下次再来。</span>
      </div>
      <template v-else>
        <div v-if="!ready && !failed" class="discussion-loading" role="status">
          <span class="loading-dot" />{{
            active ? '正在连接评论区…' : '评论区准备就绪，滚动即可加载。'
          }}
        </div>
        <div v-if="failed" class="discussion-error" role="status">
          <p>评论区连接有些慢，你可以重试，或在 GitHub 查看讨论。</p>
          <button type="button" @click="retry">重新加载</button>
        </div>
        <Giscus v-if="active" :key="attempt" :repo="commentsConfig.repo" :repo-id="commentsConfig.repoId"
          :category="commentsConfig.category" :category-id="commentsConfig.categoryId" mapping="specific" :term="term"
          strict="1" reactions-enabled="1" emit-metadata="0" input-position="top" :theme="theme" lang="zh-CN"
          loading="eager" />
      </template>
    </div>
    <footer class="discussion-footer">
      <span>友善交流 · 尊重不同的声音</span>
      <a href="https://giscus.app/zh-CN" target="_blank" rel="noopener noreferrer">由 Giscus 提供支持</a>
    </footer>
  </section>
</template>

<style scoped>
.blog-discussion {
  margin-top: 56px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
}

.discussion-heading {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  padding: 28px;
  background: linear-gradient(120deg, var(--vp-c-brand-soft), transparent 85%);
}

.discussion-icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  box-shadow: 0 3px 12px #00000006;
}

.discussion-icon svg {
  width: 23px;
  height: 23px;
}

.discussion-intro {
  flex: 1;
  min-width: 180px;
}

.discussion-eyebrow {
  color: var(--vp-c-brand-1);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
}

.discussion-intro h2 {
  margin: 5px 0 8px;
  padding: 0;
  border: 0;
  font-size: 21px;
  line-height: 1.5;
  font-weight: 650;
}

.discussion-intro p {
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.discussion-link,
.discussion-badge {
  margin-top: 5px;
  font-size: 11px;
  color: var(--vp-c-text-2);
}

.discussion-badge {
  padding: 2px 9px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  background: var(--vp-c-bg);
}

.discussion-content {
  padding: 24px 28px;
  min-height: 180px;
}

.discussion-empty {
  padding: 8px 0 28px;
  text-align: center;
}

.empty-mark {
  display: block;
  height: 52px;
  color: var(--vp-c-brand-1);
  font:
    72px Georgia,
    serif;
  opacity: 0.5;
}

.discussion-empty p {
  margin: 12px 0 8px;
  font-size: 15px;
  font-weight: 500;
}

.discussion-empty>span:last-child {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.discussion-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin: 0 28px;
  padding: 15px 0;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-size: 11px;
}

.discussion-loading,
.discussion-error {
  padding: 16px 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.discussion-loading {
  display: flex;
  gap: 10px;
  align-items: center;
}

.loading-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
}

.discussion-error p {
  margin: 0 0 8px;
}

.discussion-error button,
a:hover {
  color: var(--vp-c-brand-1);
}

.discussion-error button {
  cursor: pointer;
}

a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 4px;
  border-radius: 3px;
}

@media (max-width: 640px) {
  .blog-discussion {
    margin-top: 36px;
    border-radius: 14px;
  }

  .discussion-heading {
    padding: 20px;
    gap: 12px;
  }

  .discussion-intro h2 {
    font-size: 19px;
  }

  .discussion-icon {
    display: none;
  }

  .discussion-link {
    width: 100%;
  }

  .discussion-content {
    padding: 20px 16px;
  }

  .discussion-footer {
    margin: 0 20px;
  }
}
</style>
