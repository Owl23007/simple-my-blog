import { defineStore } from 'pinia';

export const useContentStore = defineStore('content', {
  state: () => ({
    personalInfo: {
      name: '管瑞强',
      title: '在校学生',
      bio: '热爱前端开发和UI/UX设计的工程师，专注于创建高效、美观的web应用。',
      location: '中国，湖北，武汉',
      email: 'zhangsan@example.com',
      github: '/demo-page',
      linkedin: '/demo-page',
      //图片来源于网络，仅供学习交流使用
      avatar: 'https://www.zootu.cn/wp-content/uploads/setting/1/setting_1586389370.jpg'
    },
    
    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'JavaScript', level: 90 },
      { name: 'HTML/CSS', level: 85 },
      { name: 'Node.js', level: 75 },
      { name: 'UI/UX 设计', level: 65 }
    ],
    
    projects: [
      {
        id: 1,
        title: '电子商务平台',
        description: '使用Vue.js和Node.js构建的全栈电子商务网站，包含产品展示、购物车、支付集成等功能。',
        image: 'src/assets/1920-1080-sample.jpg',
        tags: ['Vue.js', 'Node.js', 'MongoDB', 'Express'],
        link: '/demo-page'
      },
      {
        id: 2,
        title: '任务管理应用',
        description: '响应式任务管理应用，支持任务创建、编辑、分类和提醒功能。',
        image: 'src/assets/dall-e-gratuit-intelligence-artificielle-2.jpg',
        tags: ['Vue.js', 'Vuex', 'Firebase'],
        link: '/demo-page'
      },
      {
        id: 3,
        title: '天气预报应用',
        description: '基于地理位置的天气预报应用，提供实时天气信息和未来7天预报。',
        image: 'src/assets/Moeraki-Boulders-New-Zealand.jpg',
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
        content: '# Vue 3 组合式 API 的实际应用\n\n组合式API是Vue 3中引入的一个重要特性，它允许开发者按照逻辑关注点组织代码...',
        tags: ['Vue.js', '前端开发']
      },
      {
        id: 2,
        title: 'TypeScript在Vue项目中的最佳实践',
        summary: '如何在Vue项目中高效地使用TypeScript，提高代码质量和开发体验。',
        date: '2023-06-15',
        content: '# TypeScript在Vue项目中的最佳实践\n\nTypeScript与Vue的结合为前端开发带来了类型安全和更好的开发体验...',
        tags: ['TypeScript', 'Vue.js']
      },
      {
        id: 3,
        title: '响应式设计的核心原则',
        summary: '探讨现代网站设计中响应式设计的核心原则和实现技巧。',
        date: '2023-05-10',
        content: '# 响应式设计的核心原则\n\n在当今多设备环境下，响应式设计已经成为网站开发的标准实践...',
        tags: ['CSS', '响应式设计', '前端开发']
      }
    ]
  })
});
