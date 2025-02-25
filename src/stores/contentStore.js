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
