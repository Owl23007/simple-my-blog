<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-info">
          <h3>{{ contentStore.personalInfo.name }}</h3>
          <p>{{ contentStore.personalInfo.bio }}</p>
        </div>
        
        <div class="footer-links">
          <h4>导航</h4>
          <nav>
            <router-link to="/">首页</router-link>
            <router-link to="/about">关于</router-link>
            <router-link to="/projects">项目</router-link>
            <router-link to="/blog">博客</router-link>
            <router-link to="/contact">联系</router-link>
          </nav>
        </div>
        
        <div class="footer-contact">
          <h4>联系方式</h4>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <a :href="`mailto:${contentStore.personalInfo.email}`">{{ contentStore.personalInfo.email }}</a>
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <a :href="contentStore.personalInfo.github" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <a :href="contentStore.personalInfo.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} {{ contentStore.personalInfo.name }}. 保留所有权利。</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useContentStore } from '@/stores/contentStore';

const contentStore = useContentStore();
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  background-color: #f9f9f9;
  border-top: 1px solid #eaeaea;
  padding: 2rem 0;
  margin-top: 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
}

.footer-info p {
  color: #666;
  line-height: 1.6;
}

.footer-links nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a, .footer-contact a {
  color: #555;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover, .footer-contact a:hover {
  color: #42b883;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.footer-contact svg {
  color: #42b883;
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eaeaea;
  color: #888;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
