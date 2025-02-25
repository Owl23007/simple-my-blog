<template>
  <div class="blog">
    <div class="container">
      <h1 class="page-title">我的博客</h1>
      <div class="articles-grid">
        <article v-for="article in articles" :key="article.id" class="article-card">
          <h2 class="article-title">
            <router-link :to="`/blog/${article.id}`">{{ article.title }}</router-link>
          </h2>
          <div class="article-meta">
            <span class="article-date">{{ article.date }}</span>
            <div class="article-tags">
              <span v-for="(tag, index) in article.tags" :key="index" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
          <p class="article-summary">{{ article.summary }}</p>
          <router-link :to="`/blog/${article.id}`" class="read-more">
            阅读更多 &rarr;
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useContentStore } from '../stores/contentStore';

const contentStore = useContentStore();
const { articles } = contentStore;
</script>

<style scoped>
.blog {
  padding: 2rem 0;
}

.page-title {
  margin-bottom: 2rem;
  text-align: center;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.article-card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-title {
  margin-top: 0;
  font-size: 1.5rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0 1rem;
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

.article-summary {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  font-weight: 500;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>
