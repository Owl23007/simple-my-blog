# simple-my-blog 我的博客

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)  ![VitePress](https://img.shields.io/badge/VitePress-42b883?style=flat&logo=vue.js&logoColor=white)     ![Blog](https://img.shields.io/badge/Blog-FF6B6B?style=flat&logo=blogger&logoColor=white)![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat&logo=github&logoColor=white)  [![GitHub stars](https://img.shields.io/github/stars/Owl23007/simple-my-blog?style=social)](https://github.com/Owl23007/simple-my-blog)

> 基于 [VitePress](https://vitepress.dev/) 和 [@sugarat/theme](https://theme.sugarat.top/) 构建的个人博客

## 写在开头

如果你想快速的搭建一个博客,先略过我的碎碎念,直接看下面的步骤 [快速开始](#快速开始)

### 注意

我的博客项目尚处于初期开发中，如果你有更好的建议，请提issue或者PR，并优先使用 [@sugarat/sugar-blog](https://github.com/ATQQ/sugar-blog) 创建的你的博客。

### 这个博客怎么来的

最初，我只是想找一个简单的方式，记录自己的学习笔记与生活琐事，搭建一个真正属于自己的博客网站。市面上虽有不少现成的博客系统，但它们要么配置繁琐，要么对非技术用户不够友好，又或者难以按自己的喜好自由定制样式。我不仅希望拥有一个自己能用的网站，更希望它能成为一个别人也能轻松上手、快速搭建的工具。

于是，我尝试从零开始开发一个博客系统：用 Vue 3 构建静态页面，搭配 Pinia 管理状态，再通过 GitHub Pages 或其他静态托管服务部署上线。虽然做出了一个雏形，但要实现完整的功能——比如主题定制、插件集成、文章管理、评论系统等——工作量远超预期，效果也不尽如人意。而我真正想做的，其实是专注写作，而不是深陷于繁琐的技术细节中。

这个想法一度被我搁置。直到某次交完课设后，我陷入了一段低动力期，迫切希望能梳理每日进展、记录遇到的问题。就在这时，看到其他项目美观的md生成的文档，我接触到了 VitePress —— 一个基于 Vue 3 的轻量级静态站点生成器。更让我惊喜的是，偶然发现了粥里有勺糖大大（@ATQQ）开发的 @sugarat/theme 。这个主题不仅功能丰富、开箱即用，而且设计理念与我理想中的博客高度契合。

就这样，我的博客之旅，真正开始了。

## 快速开始

再次感谢 [@ATQQ](https://github.com/ATQQ) 创建的 [Sugar Blog](https://github.com/ATQQ/sugar-blog) 为我提供了博客模板，让我可以专注于样式的二次开发，而不是从零开始搭建博客系统。

### 环境要求

- Node.js 18+
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
# 全局安装 pnpm
npm install -g pnpm

# (可选) 在项目中安装 pnpm
npm install pnpm

# 安装项目依赖
pnpm install
```

### 本地开发

```bash
npm run dev
```

启动后访问 <http://localhost:5173> 即可预览博客。

### 构建生产版本

```bash
npm run build
```

构建产物会生成在 `.vitepress/dist` 目录下。

### 预览构建结果

```bash
npm run preview
```

## 项目结构

```plaintext
├── .github/                # GitHub 配置目录
│   └── workflows/          # GitHub Actions 工作流
├── docs/                   # 文档根目录
│   ├── .vitepress/         # VitePress 配置目录
│   │   ├── config.mts      # 站点配置文件
│   │   ├── blog-theme.ts   # 博客主题配置
│   │   └── theme/          # 主题配置
│   │       ├── index.ts        # 主题入口
│   │       ├── style.scss      # 自定义样式
│   │       ├── user-theme.css  # 用户自定义主题
│   │       └── assets/         # 主题资源文件
│   ├── index.md            # 首页
│   ├── about.md            # 关于页面
│   ├── public/             # 静态资源目录
│   │   └── robots.txt      # 搜索引擎爬虫配置
│   └── sop/                # 文档目录
│       ├── quickStart.md   # 快速开始
│       ├── component.md    # 组件文档
│       ├── style.md        # 样式文档
│       └── more.md         # 更多文档
└── package.json            # 项目配置
```

## 写作指南

### 创建新文章

在 `docs/` 目录或其子目录（如 `docs/sop/`）下创建 `.md` 文件即可：

```bash
# 在 docs 目录创建文章
echo "# 我的第一篇文章" > docs/my-first-post.md

# 或在 sop 目录创建文章
echo "# 我的第一篇文章" > docs/sop/my-first-post.md
```

### 文章 Front Matter

在 Markdown 文件顶部添加 Front Matter 来配置文章信息：

```yaml
---
title: 文章标题
date: 2024-10-18
tags:
  - 标签1
  - 标签2
categories:
  - 分类
description: 文章描述
---
```

## 配置

主要配置文件为 `.vitepress/config.ts`，你可以在此修改：

- 站点标题、描述
- 导航菜单
- 侧边栏
- 主题配置
- 社交链接
- 评论系统等

详细配置请参考：

- [VitePress 官方文档](https://vitepress.dev/)
- [@sugarat/theme 文档](https://theme.sugarat.top/)

## 自定义样式

尚在探索中...

## 部署

### 部署到 GitHub Pages

1. 在 `.vitepress/config.ts` 中设置正确的 `base` 路径
2. 构建项目

   ```bash
   npm run build
   ```

3. 将 `.vitepress/dist` 目录部署到 GitHub Pages

## 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [@sugarat/theme 主题文档](https://theme.sugarat.top/)
- [Sugar Blog](https://github.com/ATQQ/sugar-blog)

## License

[MIT License](https://opensource.org/licenses/MIT) © 2025 [Owl23007](License)

## 致谢与贡献者

感谢 [@ATQQ](https://github.com/ATQQ) 提供的优秀 VitePress 主题。

[![Contributors](https://contrib.rocks/image?repo=Owl23007/simple-my-blog)](https://github.com/Owl23007/simple-my-blog/graphs/contributors)
