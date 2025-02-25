正在收集工作区信息# 个人网站项目文档

## 项目概述

这个项目是一个基于Vue 3和TypeScript开发的个人网站，包含多种常见的个人展示页面，如个人介绍、技能展示、项目作品集、博客文章和联系方式等。网站采用响应式设计，适配各种设备屏幕。

## 技术栈

- **前端框架**: Vue 3
- **开发语言**: TypeScript, JavaScript
- **构建工具**: Vite
- **状态管理**: Pinia
- **路由管理**: Vue Router
- **样式**: 自定义CSS (采用CSS变量实现主题)

## 项目结构

```
├── public/                 # 静态资源
│   ├── css/                # 公共CSS
│   └── index.html          # 公共HTML模板
├── src/                    # 源代码
│   ├── assets/             # 项目资源(图片等)
│   ├── components/         # 通用组件
│   │   └── layout/         # 布局组件
│   ├── router/             # 路由配置
│   ├── stores/             # Pinia存储
│   ├── styles/             # 全局样式
│   ├── views/              # 页面视图
│   ├── App.vue             # 根组件
│   └── main.js             # 入口文件
├── .gitignore              # Git忽略配置
├── index.html              # 入口HTML
├── package.json            # 项目依赖
├── vite.config.js          # Vite配置
└── vite.config.ts          # Vite TypeScript配置
```

## 功能模块

### 1. 页面布局

- 响应式头部导航栏，支持移动端菜单
- 内容区域
- 信息丰富的页脚

### 2. 首页(Home)

- 个人简介和头像展示
- 技能进度条展示
- 精选项目展示
- 最新博客文章预览
- 联系方式CTA(Call to Action)区域

### 3. 关于页(About)

- 详细个人信息展示
- 技能详情和水平展示
- 教育背景时间线

### 4. 项目展示(Projects)

- 项目卡片展示
- 项目标签过滤功能
- 项目详情和链接

### 5. 博客(Blog)

- 文章列表展示
- 文章标签和发布日期
- 文章详情页

### 6. 联系页(Contact)

- 联系信息展示
- 联系表单
- 响应式布局设计

## 路由结构

```javascript
routes: [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/projects', name: 'projects', component: ProjectsView },
  { path: '/blog', name: 'blog', component: BlogView },
  { path: '/blog/:id', name: 'article', component: ArticleView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/demo-page', name: 'DemoPage', component: DemoPage }
]
```

## 数据管理

项目使用Pinia进行状态管理，主要存储以下内容：

- 个人信息(personalInfo)
- 技能列表(skills)
- 项目列表(projects)
- 博客文章(articles)

## 如何运行项目

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目特点

1. **模块化设计**：组件化开发，代码结构清晰
2. **响应式布局**：适配各种屏幕尺寸的设备
3. **主题定制**：使用CSS变量实现主题颜色的统一管理
4. **交互体验**：添加了过渡动画，提升用户体验
5. **TypeScript支持**：部分组件使用TypeScript提高代码质量
6. **按需加载**：路由组件采用懒加载方式，提高首屏加载速度

## 后续优化方向

1. 完善文章详情页面，支持Markdown渲染
2. 添加深色模式支持
3. 增加国际化支持
4. 优化图片加载性能
5. 添加页面过渡动画
6. 集成单元测试

---

## 项目介绍

本项目为个人作品展示网站，使用Vue 3 + TypeScript + Vite技术栈构建，具有完整的个人展示功能模块，响应式设计适配多种设备。
    