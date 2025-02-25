<script setup>
import { useContentStore } from '@/stores/contentStore';

const contentStore = useContentStore();
</script>

<template>
  <div class="about">
    <h1 class="page-title">关于我</h1>
    
    <!-- Personal Info Section -->
    <section class="about-section">
      <div class="about-grid">
        <div class="about-image">
          <img :src="contentStore.personalInfo.avatar" alt="个人头像" />
        </div>
        <div class="about-content">
          <h2>{{ contentStore.personalInfo.name }}</h2>
          <h3>{{ contentStore.personalInfo.title }}</h3>
          <p class="bio">{{ contentStore.personalInfo.bio }}</p>
          
          <div class="about-info">
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ contentStore.personalInfo.location }}</span>
            </div>
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a :href="`mailto:${contentStore.personalInfo.email}`">{{ contentStore.personalInfo.email }}</a>
            </div>
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <a :href="contentStore.personalInfo.github" target="_blank" rel="noopener noreferrer">
                {{ contentStore.personalInfo.github.replace('https://', '') }}
              </a>
            </div>
            <div class="info-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <a :href="contentStore.personalInfo.linkedin" target="_blank" rel="noopener noreferrer">
                {{ contentStore.personalInfo.linkedin.replace('https://', '') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Skills Section -->
    <section class="about-section">
      <h2 class="section-title">专业技能</h2>
      <div class="skills-grid">
        <div v-for="skill in contentStore.skills" :key="skill.name" class="skill-card">
          <div class="skill-header">
            <h3>{{ skill.name }}</h3>
            <span class="skill-level">{{ skill.level }}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Education & Experience Section -->
    <section class="about-section">
      <h2 class="section-title">教育背景</h2>
      <div class="timeline">
        <div v-for="edu in contentStore.education" :key="edu.id" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h3>{{ edu.school }}</h3>
            <p class="timeline-period">{{ edu.year }}</p>
            <p>{{ edu.degree }} - {{ edu.major }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  color: var(--text-color);
}

.page-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background-color: var(--primary-color);
}

.about-section {
  margin-bottom: 4rem;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: center;
}

.about-image img {
  width: 100%;
  max-width: 300px;
  border-radius: 50%;
  box-shadow: var(--shadow-lg);
}

.about-content h2 {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
}

.about-content h3 {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0 0 1rem 0;
  color: var(--light-text);
}

.bio {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.about-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-item svg {
  color: var(--primary-color);
}

.info-item a {
  color: var(--text-color);
  transition: color 0.3s;
}

.info-item a:hover {
  color: var(--primary-color);
}

.section-title {
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;
  color: var(--text-color);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
}

.skills-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.skill-card {
  padding: 1.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.skill-header h3 {
  margin: 0;
  font-size: 1.2rem;
}

.skill-level {
  font-weight: 500;
  color: var(--primary-color);
}

.skill-bar {
  height: 8px;
  background-color: #eaeaea;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: var(--primary-color);
}

/* Timeline styles */
.timeline {
  position: relative;
  margin: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 16px;
  height: 100%;
  width: 2px;
  background-color: #eaeaea;
}

.timeline-item {
  position: relative;
  padding-left: 3rem;
  padding-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  top: 4px;
  left: 10px;
  width: 14px;
  height: 14px;
  background-color: var(--primary-color);
  border-radius: 50%;
  z-index: 1;
}

.timeline-content {
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.timeline-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.timeline-period {
  color: var(--light-text);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .about-image {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }
  
  .about-info {
    grid-template-columns: 1fr;
  }
  
  .info-item {
    justify-content: center;
  }
  
  .section-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .page-title {
    text-align: center;
  }
  
  .page-title::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
