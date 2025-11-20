<template>
  <router-link v-if="article.link" :to="article.link" class="article-card group">
    <!-- Hover Gradient Background -->
    <div class="card-bg-hover"></div>

    <div class="card-content">
      <!-- Header -->
      <div class="card-header">
        <h3 class="card-title">
          {{ article.title }}
        </h3>
      </div>

      <div v-if="article.date" class="card-date">
        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        {{ formatDate(article.date) }}
      </div>

      <!-- Description -->
      <p v-if="article.description" class="card-desc">
        {{ article.description }}
      </p>

      <!-- Footer: Tags & Arrow -->
      <div class="card-footer">
        <div class="card-tags">
          <span v-for="tag in article.tags?.slice(0, 2)" :key="tag" class="tag">
            #{{ tag }}
          </span>
          <span v-if="article.tags && article.tags.length > 2" class="tag-more">
            +{{ article.tags.length - 2 }}
          </span>
        </div>

        <span class="card-arrow">
          <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </span>
      </div>
    </div>
  </router-link>

  <!-- Fallback for non-link cards (if any) -->
  <div v-else class="article-card fallback">
    <h3 class="card-title">{{ article.title }}</h3>
  </div>
</template>

<script setup lang="ts">
interface Article {
  title: string
  date?: string | Date
  description?: string
  link?: string
  tags?: string[]
}

defineProps<{
  article: Article
}>()

const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}
</script>

<style scoped lang="less">
.article-card {
  display: block;
  height: 100%;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f3f4f6; // gray-100
  background-color: #fff;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;

  .dark & {
    border-color: #1f2937; // gray-800
    background-color: rgba(31, 41, 55, 0.5); // gray-800/50
  }

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    border-color: #bfdbfe; // blue-200
    transform: translateY(-0.25rem);

    .dark & {
      border-color: #1e40af; // blue-800
    }
  }
}

.card-bg-hover {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(239, 246, 255, 0.5), rgba(250, 245, 255, 0.5));
  opacity: 0;
  transition: opacity 0.5s;

  .group:hover & {
    opacity: 1;
  }

  .dark & {
    background: linear-gradient(to bottom right, rgba(30, 58, 138, 0.1), rgba(88, 28, 135, 0.1));
  }
}

.card-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.card-title {
  font-size: 1.25rem; // text-xl
  font-weight: 700;
  color: #111827; // gray-900
  transition: color 0.3s;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  .dark & {
    color: #fff;
  }

  .group:hover & {
    color: #2563eb; // blue-600

    .dark & {
      color: #60a5fa; // blue-400
    }
  }
}

.card-date {
  display: flex;
  align-items: center;
  font-size: 0.875rem; // text-sm
  color: #6b7280; // gray-500
  transition: color 0.3s;

  .dark & {
    color: #9ca3af; // gray-400
  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-right: 0.25rem;
  }
}

.card-desc {
  font-size: 0.875rem; // text-sm
  color: #4b5563; // gray-600
  line-height: 1.625;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
  transition: color 0.3s;

  .dark & {
    color: #d1d5db; // gray-300
  }
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  margin-top: auto;
  border-top: 1px solid #f3f4f6; // gray-100
  transition: border-color 0.3s;

  .dark & {
    border-color: rgba(55, 65, 81, 0.5); // gray-700/50
  }
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem; // text-xs
  font-weight: 500;
  background-color: #f3f4f6; // gray-100
  color: #4b5563; // gray-600
  border-radius: 0.375rem;
  transition: all 0.3s;

  .dark & {
    background-color: rgba(55, 65, 81, 0.5); // gray-700/50
    color: #d1d5db; // gray-300
  }

  .group:hover & {
    background-color: #eff6ff; // blue-50
    color: #2563eb; // blue-600

    .dark & {
      background-color: rgba(30, 58, 138, 0.3); // blue-900/30
      color: #93c5fd; // blue-300
    }
  }
}

.tag-more {
  font-size: 0.75rem; // text-xs
  color: #9ca3af; // gray-400
  align-self: center;
}

.card-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background-color: #f9fafb; // gray-50
  color: #9ca3af; // gray-400
  transition: all 0.3s;

  .dark & {
    background-color: rgba(55, 65, 81, 0.5); // gray-700/50
  }

  .group:hover & {
    background-color: #2563eb; // blue-600
    color: #fff;
    transform: rotate(45deg);
  }

  .icon {
    width: 1rem;
    height: 1rem;
  }
}
</style>
