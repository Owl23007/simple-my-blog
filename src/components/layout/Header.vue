<template>
  <header class="header">
    <div class="header-container">
      <div class="header-logo">
        <router-link to="/" class="logo-link">
          <h1>{{ contentStore.personalInfo.name }}</h1>
          <span class="title">{{ contentStore.personalInfo.title }}</span>
        </router-link>
      </div>

      <!-- Mobile menu button -->
      <button class="mobile-menu-button" @click="toggleMobileMenu" aria-label="菜单">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <!-- Navigation links -->
      <nav class="main-nav" :class="{ 'mobile-open': mobileMenuOpen }">
        <router-link to="/" @click="mobileMenuOpen = false">首页</router-link>
        <router-link to="/about" @click="mobileMenuOpen = false">关于</router-link>
        <router-link to="/projects" @click="mobileMenuOpen = false">项目</router-link>
        <router-link to="/blog" @click="mobileMenuOpen = false">博客</router-link>
        <router-link to="/contact" @click="mobileMenuOpen = false">联系</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useContentStore } from '@/stores/contentStore';

const contentStore = useContentStore();
const mobileMenuOpen = ref(false);
const windowWidth = ref(window.innerWidth);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value >= 768) {
    mobileMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});
</script>

<style scoped>
.header {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
}

.header-logo {
  display: flex;
  align-items: center;
}

.logo-link {
  text-decoration: none;
  color: #333;
  display: flex;
  flex-direction: column;
}

.logo-link h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.title {
  font-size: 0.9rem;
  color: #666;
}

.main-nav {
  display: flex;
  gap: 1.5rem;
}

.main-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.main-nav a:hover {
  color: #42b883;
}

.main-nav a.router-link-active {
  color: #42b883;
}

.main-nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #42b883;
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .mobile-menu-button {
    display: block;
  }

  .main-nav {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    transition: transform 0.3s ease-in-out;
    z-index: 90;
  }

  .main-nav.mobile-open {
    transform: translateY(0);
  }

  .main-nav a {
    padding: 0.8rem 0;
    border-bottom: 1px solid #eaeaea;
  }

  .main-nav a:last-child {
    border-bottom: none;
  }
}
</style>
