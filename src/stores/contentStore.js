import { defineStore } from 'pinia';
/*
  内容存储使用指南:
  
  1. 个人信息 (personalInfo):
     - 修改姓名、职位、简介、位置等个人基本信息
     - 更新电子邮件和社交媒体链接
     - 替换头像图片路径(确保图片放在正确的资源目录)
  
  2. 技能列表 (skills):
     - 每个技能包含name(技能名称)和level(熟练度0-100)
     - 按照熟练度排序，或者根据重要性调整顺序
     - 可以添加或删除技能项目
  
  3. 教育经历 (education):
     - 每条记录包含id、degree(学位)、major(专业)、school(学校)和year(年份)
     - 按照时间倒序排列(最近的教育经历放在前面)
     - 根据注释"修改并添加更多"添加您的实际教育背景
  
  4. 项目经验 (projects):
     - 每个项目包含id、title(标题)、description(描述)、image(图片)、tags(标签)和link(链接)
     - 图片路径应指向assets目录中的实际图片
     - 可以添加新项目或修改现有项目细节
  
  5. 文章列表 (articles):
     - 每篇文章包含id、title(标题)、summary(摘要)、date(日期)、content(内容)和tags(标签)
     - content支持Markdown格式
     - 按照发布日期排序
*/

export const useContentStore = defineStore('content', {
  state: () => ({
    personalInfo: {
      name: '你的名字',
      title: '在校学生',
      phone: '123456789',//电话
      bio: '热爱前端开发和UI/UX设计的工程师，专注于创建高效、美观的web应用。',//个人简介
      location: '中国，湖北，武汉',//地址
      email: 'xxxxxxxxxxx@163.com',//邮箱
      github: '/demo-page',//github地址
      linkedin: '/demo-page',//linkedin地址
      //图片来源于网络，仅供学习交流使用
      avatar: 'src/assets/avatar.jpg'//头像
    },

    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'UI/UX 设计', level: 65 }
    ],

    education: [
      {
        id: 1,
        degree: '高中',
        major: '理科',
        school: '武汉市第一中学',
        year: '2019 - 2023'
      },
      {
        id: 2,
        degree: '本科',
        major: '软件工程',
        school: '武汉科技大学',
        year: '2023 - 2026'
      },
      //修改并添加更多
    ],

    projects: [
      {
        id: 1,
        title: '电子商务平台',
        description: '使用Vue.js和Node.js构建的全栈电子商务网站，包含产品展示、购物车、支付集成等功能。',
        image: 'src/assets/p1.jpg',
        tags: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
        link: '/demo-page'
      },
      {
        id: 2,
        title: '任务管理应用',
        description: '响应式任务管理应用，支持任务创建、编辑、分类和提醒功能。',
        image: 'src/assets/p2.jpg',
        tags: ['Vue.js', 'Vuex', 'Firebase'],
        link: '/demo-page'
      },
      {
        id: 3,
        title: '天气预报应用',
        description: '基于地理位置的天气预报应用，提供实时天气信息和未来7天预报。',
        image: 'src/assets/p3.jpg',
        tags: ['Vue.js', 'OpenWeather API', 'Geolocation API'],
        link: '/demo-page'
      }
    ],

    articles: [
      {
        id: 1,
        title: 'Vue 3 组合式 API 的实际应用',
        summary: '探索Vue 3组合式API的强大功能，以及如何在实际项目中应用它。',
        date: '2023-07-20',
        content: `# Vue 3 组合式 API 的实际应用

组合式API是Vue 3中引入的一个重要特性，它允许开发者按照逻辑关注点组织代码，而不是根据选项类型。

## 什么是组合式API？

组合式API提供了一组函数式的API，让我们能够通过函数而非声明式的选项组织组件逻辑。它解决了Vue 2中的一些痛点，例如代码复用和类型推断。

## 基础示例

下面是一个使用组合式API的简单计数器组件：

\`\`\`vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 响应式状态
const count = ref(0)

// 方法
function increment() {
  count.value++
}
</script>
\`\`\`

## 生命周期钩子

组合式API提供了一系列生命周期钩子函数，可以在setup函数中调用：

\`\`\`javascript
import { onMounted, onUpdated, onUnmounted } from 'vue'

// 在组件挂载时执行
onMounted(() => {
  console.log('Component mounted!')
})

// 在组件更新时执行
onUpdated(() => {
  console.log('Component updated!')
})

// 在组件卸载时执行
onUnmounted(() => {
  console.log('Component unmounted!')
})
\`\`\`

## 逻辑复用

组合式API最大的优势之一是实现了更好的逻辑复用，我们可以将相关功能提取到独立的"组合式函数"中：

\`\`\`javascript
// useMousePosition.js
import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
\`\`\`

然后在组件中使用：

\`\`\`vue
<template>
  <div>鼠标位置: x: {{ x }}, y: {{ y }}</div>
</template>

<script setup>
import { useMousePosition } from './useMousePosition'

const { x, y } = useMousePosition()
</script>
\`\`\`

Vue 3的组合式API提供了更灵活的代码组织方式，特别适合构建大型应用和复杂组件。`,
        tags: ['Vue.js', '前端开发']
      },
      {
        id: 2,
        title: 'TypeScript在Vue项目中的最佳实践',
        summary: '如何在Vue项目中高效地使用TypeScript，提高代码质量和开发体验。',
        date: '2023-06-15',
        content: `# TypeScript在Vue项目中的最佳实践

TypeScript与Vue的结合为前端开发带来了类型安全和更好的开发体验。本文将分享在Vue项目中使用TypeScript的一些最佳实践。

## 项目设置

使用Vue CLI创建支持TypeScript的Vue项目：

\`\`\`bash
vue create my-ts-app
# 选择手动配置，并勾选TypeScript
\`\`\`

或者直接使用Vite：

\`\`\`bash
npm init vite@latest my-ts-app -- --template vue-ts
\`\`\`

## 定义组件Props

使用TypeScript可以为组件props提供精确的类型定义：

\`\`\`vue
<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
})
</script>
\`\`\`

## 使用组合式API

在Vue 3中使用组合式API和TypeScript：

\`\`\`vue
<script setup lang="ts">
import { ref, computed } from 'vue'

// 明确类型
const count = ref<number>(0)
const message = ref<string>('Hello')

// 推断类型
const doubleCount = computed(() => count.value * 2)

function increment(): void {
  count.value++
}
</script>
\`\`\`

## 定义响应式状态的类型

使用接口定义复杂的响应式状态：

\`\`\`typescript
import { reactive } from 'vue'

interface State {
  user: {
    name: string
    age: number
    roles: string[]
  } | null
  loading: boolean
  error: Error | null
}

const state = reactive<State>({
  user: null,
  loading: false,
  error: null
})
\`\`\`

## 类型声明文件

为自定义组件或插件创建类型声明文件：

\`\`\`typescript
// shims-vue.d.ts
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// custom-plugin.d.ts
import { App } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $myPlugin: {
      doSomething(options: { message: string }): void
    }
  }
}
\`\`\`

通过合理使用TypeScript，我们可以在Vue项目中获得更好的代码质量、开发体验和维护性。`,
        tags: ['TypeScript', 'Vue.js']
      },
      {
        id: 3,
        title: '响应式设计的核心原则',
        summary: '探讨现代网站设计中响应式设计的核心原则和实现技巧。',
        date: '2023-05-10',
        content: `# 响应式设计的核心原则

在当今多设备环境下，响应式设计已经成为网站开发的标准实践。一个好的响应式网站可以在从手机到桌面显示器的所有屏幕尺寸上提供出色的用户体验。

## 响应式设计的基本原则

### 流动网格布局

使用相对单位而非固定单位：

\`\`\`css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.column {
  float: left;
  width: 33.33%;
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .column {
    width: 50%;
  }
}

@media (max-width: 480px) {
  .column {
    width: 100%;
  }
}
\`\`\`

### 弹性图片

确保图片不会超出其容器：

\`\`\`css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
\`\`\`

### 媒体查询

针对不同屏幕尺寸应用不同样式：

\`\`\`css
/* 移动设备 */
@media (max-width: 480px) {
  .header {
    padding: 10px;
  }
  
  .nav {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
}

/* 平板设备 */
@media (min-width: 481px) and (max-width: 768px) {
  .header {
    padding: 15px;
  }
}

/* 桌面设备 */
@media (min-width: 769px) {
  .header {
    padding: 20px;
  }
  
  .mobile-menu {
    display: none;
  }
}
\`\`\`

## 现代响应式布局技术

### 使用Flexbox

Flexbox是创建响应式布局的强大工具：

\`\`\`css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.item {
  flex: 1 1 250px;
  /* 最小250px，但可以增长和收缩 */
}
\`\`\`

### 使用Grid

CSS Grid为复杂布局提供了更多可能性：

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

### 响应式排版

使用视口单位创建流畅的排版：

\`\`\`css
h1 {
  font-size: calc(1.5rem + 2vw);
  /* 基础大小 + 视口宽度的一部分 */
}

p {
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.2rem);
  /* 最小，首选，最大 */
}
\`\`\`

## 移动优先策略

从移动设备开始设计，然后逐步增强到更大屏幕：

\`\`\`css
/* 基础样式 - 适用于所有设备 */
.container {
  padding: 15px;
}

/* 中等屏幕和更大 */
@media (min-width: 768px) {
  .container {
    padding: 30px;
  }
}

/* 大屏幕 */
@media (min-width: 1200px) {
  .container {
    padding: 50px;
    max-width: 1400px;
    margin: 0 auto;
  }
}
\`\`\`

遵循这些响应式设计原则，可以创建出在任何设备上都能提供良好用户体验的现代网站。`,
        tags: ['CSS', '响应式设计', '前端开发']
      }
    ]
  })
});
