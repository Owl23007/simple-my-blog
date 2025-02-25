<template>
  <div class="blog-detail">
    <div class="container">
      <div v-if="article" class="article">
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <div class="article-tags">
              <span v-for="(tag, index) in article.tags" :key="index" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        <div class="article-content" v-html="renderedContent"></div>
        <div class="article-footer">
          <router-link to="/blog" class="back-to-blog">
            &larr; 返回博客列表
          </router-link>
        </div>
      </div>
      <div v-else class="not-found">
        <h2>文章未找到</h2>
        <router-link to="/blog" class="back-to-blog">
          返回博客列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useContentStore } from '../stores/contentStore';
import { computed, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';

// 配置markdown-it，添加代码高亮功能
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
      } catch (__) {}
    }
    // 默认使用自动检测语言
    return `<pre class="hljs"><code>${hljs.highlightAuto(str).value}</code></pre>`;
  }
});

const route = useRoute();
const contentStore = useContentStore();
const articleId = parseInt(route.params.id as string);

const article = computed(() => {
  return contentStore.articles.find(a => a.id === articleId);
});

const renderedContent = computed(() => {
  if (article.value) {
    return md.render(article.value.content);
  }
  return '';
});

// 在组件挂载后执行一些DOM操作（如果需要）
onMounted(() => {
  // 可以在这里添加一些代码，比如复制按钮或其他增强功能
});
</script>

<style scoped>
.blog-detail {
  padding: 2rem 0;
}

.article {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  margin-bottom: 2rem;
}

.article-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-light);
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: var(--tag-bg);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.article-content {
  line-height: 1.8;
  font-size: 1.1rem;
}

.article-content :deep(h1) {
  font-size: 1.6rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.article-content :deep(h2) {
  font-size: 1.4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3rem;
}

.article-content :deep(h3) {
  font-size: 1.3rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.article-content :deep(h4) {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

.article-content :deep(p) {
  margin-bottom: 1.2rem;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin-bottom: 1.2rem;
  padding-left: 1.5rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-content :deep(pre) {
  margin: 1.5rem 0;
  border-radius: 6px;
  overflow: auto;
}

.article-content :deep(.hljs) {
  padding: 1rem;
  border-radius: 6px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  tab-size: 2;
}

.article-content :deep(code:not(.hljs code)) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  background-color: rgba(27, 31, 35, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9rem;
}

.article-content :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  background-color: rgba(0, 0, 0, 0.03);
  padding: 0.8rem 1rem;
  color: #6a737d;
  margin: 1.5rem 0;
  border-radius: 0 3px 3px 0;
}

.article-content :deep(blockquote p:last-child) {
  margin-bottom: 0;
}

.article-content :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.back-to-blog {
  display: inline-block;
  color: var(--primary-color);
  font-weight: 500;
}

.not-found {
  text-align: center;
  padding: 3rem 0;
}

@media (max-width: 768px) {
  .article {
    padding: 0 1rem;
  }
}
</style>
