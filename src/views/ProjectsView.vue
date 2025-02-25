<script setup>
import { useContentStore } from '@/stores/contentStore';
import { ref } from 'vue';

const contentStore = useContentStore();
const projects = ref(contentStore.projects);

// 所有唯一标签的列表
const allTags = ref([]);
// 选中的筛选标签
const selectedTag = ref('全部');

// 提取所有唯一的标签
projects.value.forEach(project => {
  project.tags.forEach(tag => {
    if (!allTags.value.includes(tag)) {
      allTags.value.push(tag);
    }
  });
});

// 根据标签筛选项目
const filteredProjects = () => {
  if (selectedTag.value === '全部') {
    return projects.value;
  }
  return projects.value.filter(project => project.tags.includes(selectedTag.value));
};

// 选择标签
const selectTag = (tag) => {
  selectedTag.value = tag;
};
</script>

<template>
  <div class="projects">
    <h1 class="page-title">我的项目</h1>
    
    <!-- Filter Tags -->
    <div class="filter-tags">
      <button 
        class="filter-tag" 
        :class="{ active: selectedTag === '全部' }"
        @click="selectTag('全部')"
      >
        全部
      </button>
      <button 
        v-for="tag in allTags" 
        :key="tag" 
        class="filter-tag" 
        :class="{ active: selectedTag === tag }"
        @click="selectTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
    
    <!-- Projects Grid -->
    <div class="projects-grid">
      <div v-for="project in filteredProjects()" :key="project.id" class="project-card">
        <div class="project-image">
          <img :src="project.image" :alt="project.title" />
        </div>
        <div class="project-content">
          <h2>{{ project.title }}</h2>
          <p>{{ project.description }}</p>
          <div class="project-tags">
            <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <a :href="project.link" class="btn primary-btn" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            查看项目
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects {
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

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin: 2rem 0;
}

.filter-tag {
  background-color: transparent;
  border: 1px solid #ddd;
  color: var(--text-color);
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-tag:hover {
  background-color: #f5f5f5;
}

.filter-tag.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
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
}

.project-content {
  padding: 1.5rem;
}

.project-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.project-content p {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: var(--text-color-light);
}

.project-tags {
  margin-bottom: 1.5rem;
}

.project-tags .tag {
  display: inline-block;
  background-color: var(--primary-color-light);
  color: var(--primary-color);
  padding: 0.3rem 0.6rem;
  border-radius: 30px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
}

.primary-btn:hover {
  background-color: var(--primary-color-dark);
}

.primary-btn svg {
  margin-right: 0.5rem;
}
</style>
