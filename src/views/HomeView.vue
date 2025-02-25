<script setup>
import { useContentStore } from '@/stores/contentStore';
import { computed } from 'vue';

const contentStore = useContentStore();
const projects = computed(() => contentStore.projects.slice(0, 3));
const articles = computed(() => contentStore.articles.slice(0, 2));
</script>

<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>你好, 我是 <span class="highlight">{{ contentStore.personalInfo.name }}</span></h1>
          <h2>{{ contentStore.personalInfo.title }}</h2>
          <p>{{ contentStore.personalInfo.bio }}</p>
          <div class="hero-buttons">
            <router-link to="/projects" class="btn primary-btn">查看我的作品</router-link>
            <router-link to="/contact" class="btn secondary-btn">联系我</router-link>
          </div>
        </div>
        
        <div class="hero-image">
          <img :src="contentStore.personalInfo.avatar" alt="个人头像" />
        </div>
      </div>
    </section>
    
    <!-- Skills Section -->
    <section class="skills section">
      <h2 class="section-title">我的技能</h2>
      <div class="skills-grid">
        <div v-for="skill in contentStore.skills" :key="skill.name" class="skill-item">
          <div class="skill-header">
            <h3>{{ skill.name }}</h3>
            <span>{{ skill.level }}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Featured Projects Section -->
    <section class="featured-projects section">
      <h2 class="section-title">精选项目</h2>
      <div class="projects-grid">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
          </div>
          <div class="project-content">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <a :href="project.link" target="_blank" rel="noopener noreferrer" class="btn project-btn">查看项目</a>
          </div>
        </div>
      </div>
      <div class="view-all">
        <router-link to="/projects" class="btn secondary-btn">查看所有项目</router-link>
      </div>
    </section>
    
    <!-- Latest Articles -->
    <section class="latest-articles section">
      <h2 class="section-title">最新文章</h2>
      <div class="articles-grid">
        <div v-for="article in articles" :key="article.id" class="article-card">
          <div class="article-content">
            <div class="article-date">{{ article.date }}</div>
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
            <router-link :to="`/blog/${article.id}`" class="read-more">阅读更多 →</router-link>
          </div>
        </div>
      </div>
      <div class="view-all">
        <router-link to="/blog" class="btn secondary-btn">浏览所有文章</router-link>
      </div>
    </section>
    
    <!-- Contact CTA -->
    <section class="contact-cta">
      <div class="cta-content">
        <h2>准备好一起合作了吗？</h2>
        <p>我随时欢迎新的项目和机会。让我们一起来实现您的想法。</p>
        <router-link to="/contact" class="btn primary-btn">联系我</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 4rem 0;
  background: linear-gradient(to right, #f9f9f9, #f5f5f5);
  margin-bottom: 2rem;
}

.hero-content {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero-text h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-text h2 {
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--light-text);
  margin-bottom: 1.5rem;
}

.highlight {
  color: var(--primary-color);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.primary-btn {
  background-color: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: var(--transition);
}

.primary-btn:hover {
  background-color: #3aa876;
  transform: translateY(-2px);
  text-decoration: none;
}

.secondary-btn {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: var(--transition);
}

.secondary-btn:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  text-decoration: none;
}

.hero-image {
  text-align: center;
}

.hero-image img {
  max-width: 100%;
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
}

/* Skills Section */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.skill-item {
  margin-bottom: 1.5rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-header h3 {
  font-size: 1.1rem;
  margin: 0;
}

.skill-bar {
  height: 10px;
  background-color: #e1e1e1;
  border-radius: 5px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: var(--primary-color);
  border-radius: 5px;
}

/* Projects Section */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.project-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.project-image {
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.project-tags {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background-color: #f0f0f0;
  color: var(--light-text);
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.project-btn {
  display: inline-block;
  margin-top: 1rem;
  font-size: 0.9rem;
}

/* Articles Section */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.article-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  transition: var(--transition);
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.article-content {
  padding: 1.5rem;
}

.article-date {
  font-size: 0.9rem;
  color: var(--lighter-text);
  margin-bottom: 0.5rem;
}

.article-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.read-more {
  display: inline-block;
  margin-top: 1rem;
  font-weight: 500;
}

/* CTA Section */
.contact-cta {
  background-color: var(--secondary-color);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-top: 4rem;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
}

.cta-content .btn {
  margin-top: 2rem;
}

.view-all {
  text-align: center;
  margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-image {
    grid-row: 1;
    margin-bottom: 2rem;
  }
  
  .hero-text {
    grid-row: 2;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .skills-grid, .projects-grid, .articles-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 2rem;
  }
  
  .hero-text h2 {
    font-size: 1.5rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
