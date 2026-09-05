<template>
  <div class="posts-list-wrapper">
    <div class="tag-search-panel">
      <div class="tag-search-bar">
        <label class="tag-search-label" for="post-tag-search">标签</label>

        <div class="tag-search-field">
          <input
            id="post-tag-search"
            v-model="tagQuery"
            class="tag-search-input"
            type="search"
            placeholder="搜索 tag"
          />
        </div>

        <div class="filter-summary">
          <span v-if="selectedTag">#{{ selectedTag }} · {{ filteredPosts.length }} 篇</span>
          <span v-else-if="tagQuery.trim()">匹配「{{ tagQuery.trim() }}」· {{ filteredPosts.length }} 篇</span>
          <span v-else>{{ filteredPosts.length }} 篇文章</span>
        </div>

        <button
          v-if="selectedTag || tagQuery"
          class="clear-tag-button"
          type="button"
          @click="clearSelectedTag"
        >
          清除
        </button>
      </div>

      <div v-if="visibleTags.length" class="tag-filter-list" aria-label="Tag 筛选">
        <button
          v-for="tag in visibleTags"
          :key="tag.name"
          class="tag-filter"
          :class="{ active: selectedTag === tag.name }"
          type="button"
          @click="selectTag(tag.name)"
        >
          <span>{{ tag.name }}</span>
          <span class="tag-count">{{ tag.count }}</span>
        </button>
      </div>
    </div>

    <Timeline :items="timelineItems" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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

const selectedTag = ref('')
const tagQuery = ref('')
const isMounted = ref(false)

const tags = computed(() => {
  const counts = new Map<string, number>()

  for (const post of allPosts) {
    for (const tag of post.tags) {
      const name = tag.trim()
      if (name) counts.set(name, (counts.get(name) || 0) + 1)
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'))
})

const filteredTags = computed(() => {
  const query = tagQuery.value.trim().toLowerCase()
  if (!query) return tags.value
  return tags.value.filter((tag) => tag.name.toLowerCase().includes(query))
})

const visibleTags = computed(() => {
  return filteredTags.value
})

const filteredPosts = computed(() => {
  const target = selectedTag.value.trim().toLowerCase()
  const query = tagQuery.value.trim().toLowerCase()

  if (target) {
    return allPosts.filter((post) =>
      post.tags.some((tag) => tag.toLowerCase() === target)
    )
  }

  if (!query) return allPosts

  return allPosts.filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().includes(query))
  )
})

const timelineItems = computed<TimelineItem[]>(() => {
  return filteredPosts.value.map((post) => ({
    title: post.title,
    date: post.date,
    description: post.description,
    link: post.link,
    tags: post.tags,
    icon: '📝',
    color: 'var(--vp-c-brand)'
  }))
})

function selectTag(tag: string) {
  const nextTag = selectedTag.value === tag ? '' : tag
  selectedTag.value = nextTag
  tagQuery.value = nextTag
}

function clearSelectedTag() {
  selectedTag.value = ''
  tagQuery.value = ''
}

function syncTagFromUrl() {
  if (typeof window === 'undefined') return
  const tag = new URLSearchParams(window.location.search).get('tag')
  selectedTag.value = tag || ''
  tagQuery.value = tag || ''
}

function syncTagToUrl(tag: string) {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  if (tag) {
    url.searchParams.set('tag', tag)
  } else {
    url.searchParams.delete('tag')
  }

  window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`)
}

onMounted(() => {
  syncTagFromUrl()
  isMounted.value = true
})

watch(selectedTag, (tag) => {
  if (isMounted.value) syncTagToUrl(tag)
})

watch(tagQuery, (query) => {
  if (selectedTag.value && selectedTag.value !== query.trim()) {
    selectedTag.value = ''
  }
})
</script>

<style scoped>
.posts-list-wrapper {
  width: 100%;
  padding: 20px 0;
}

.tag-search-panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 4px 0 22px;
  padding: 2px 0 0;
}

.tag-search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
}

.tag-search-label {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
}

.tag-search-field {
  position: relative;
  width: 220px;
  max-width: 100%;
}

.tag-search-input {
  width: 100%;
  min-width: 0;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 13px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.tag-search-input:focus {
  border-color: var(--vp-c-brand);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.filter-summary {
  flex-shrink: 0;
  margin-left: auto;
  color: var(--vp-c-text-3);
  font-size: 12px;
  white-space: nowrap;
}

.clear-tag-button,
.tag-filter {
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-tag-button {
  flex-shrink: 0;
  height: 28px;
  padding: 0 8px;
  color: var(--vp-c-brand);
  font-size: 12px;
}

.clear-tag-button:hover,
.tag-filter:hover {
  background: var(--vp-c-default-soft);
  color: var(--vp-c-brand);
}

.tag-filter-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  max-width: 100%;
  padding: 2px 0 6px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.tag-filter {
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  gap: 4px;
  min-height: 26px;
  padding: 4px 8px;
  font-size: 12px;
  line-height: 1;
}

.tag-filter.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand);
}

.tag-count {
  min-width: 0;
  padding: 0;
  color: var(--vp-c-text-3);
  font-size: 11px;
  text-align: center;
}

.tag-filter.active .tag-count,
.tag-filter:hover .tag-count {
  color: inherit;
}

@media (max-width: 640px) {
  .tag-search-panel {
    margin-top: 4px;
    padding-top: 10px;
  }

  .tag-search-bar {
    align-items: stretch;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tag-search-field,
  .filter-summary {
    width: 100%;
  }

  .clear-tag-button {
    width: 100%;
  }
}
</style>
