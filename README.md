# simple-my-blog 我的博客

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)  ![VitePress](https://img.shields.io/badge/VitePress-42b883?style=flat&logo=vue.js&logoColor=white)     ![Blog](https://img.shields.io/badge/Blog-FF6B6B?style=flat&logo=blogger&logoColor=white)  ![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=flat&logo=github&logoColor=white)  [![GitHub stars](https://img.shields.io/github/stars/Owl23007/simple-my-blog?style=social)](https://github.com/Owl23007/simple-my-blog)

> 基于 [VitePress](https://vitepress.dev/) 构建的个人博客

## 写在开头

如果你想快速的搭建一个博客,先略过我的碎碎念,直接看下面的步骤 [快速开始](#快速开始)

### 这个博客怎么来的

最初，我只是想找一个简单的方式，记录自己的学习笔记与生活琐事，搭建一个真正属于自己的博客网站。市面上虽有不少现成的博客系统，但它们要么配置繁琐，要么对非技术用户不够友好，又或者难以按自己的喜好自由定制样式。我不仅希望拥有一个自己能用的网站，更希望它能成为一个别人也能轻松上手、快速搭建的工具。

于是，我尝试从零开始开发一个博客系统：用 Vue 3 构建静态页面，搭配 Pinia 管理状态，再通过 GitHub Pages 或其他静态托管服务部署上线。虽然做出了一个雏形，但要实现完整的功能——比如主题定制、插件集成、文章管理、评论系统等——工作量远超预期，效果也不尽如人意。而我真正想做的，其实是专注写作，而不是深陷于繁琐的技术细节中。

这个想法一度被我搁置。直到某次交完课设后，我陷入了一段低动力期，迫切希望能梳理每日进展、记录遇到的问题。就在这时，
我接触到了 VitePress —— 一个基于 Vue 3 的轻量级静态站点生成器。初期，我使用了粥里有勺糖大大（@ATQQ）开发的
@sugarat/theme 主题。这个主题功能丰富、开箱即用，让我能快速启动博客项目。

随着项目的发展，我逐渐意识到：

1. **依赖耦合** - 依赖第三方主题，当需要深度定制时，往往受限于主题的架构
2. **升级复杂** - 主题更新可能引入不兼容变化，增加维护成本
3. **学习价值** - 从零构建自定义主题，能更深入地理解 VitePress 的设计理念

基于这些考量，我决定按照 VitePress 官方推荐，采用自定义主题方案，这样既能保持完全的控制权，
又能专注于内容创作。

## 快速开始

感谢 [@ATQQ](https://github.com/ATQQ) 创建的 [Sugar Blog](https://github.com/ATQQ/sugar-blog) 为我提供了最初的
博客模板和灵感，让我能够快速启动博客项目。现已升级至自定义主题方案，进一步提升了项目的灵活性和可维护性。

### 环境要求

- Node.js 22.18+（CI 使用 22 / 24）
- pnpm 10.20.0

### 安装依赖

```bash
# 全局安装 pnpm
npm install -g pnpm@10.20.0

# 安装项目依赖
pnpm install
```

### 本地开发

```bash
pnpm dev
```

启动后访问 <http://localhost:5173> 即可预览博客。

### 构建生产版本

```bash
pnpm build
```

构建产物会生成在 `docs/.vitepress/dist` 目录下，并自动生成 Pagefind 搜索索引。

### 预览构建结果

```bash
pnpm serve
```

## 项目结构

```plaintext
├── .github/                # GitHub 配置目录
│   └── workflows/          # GitHub Actions 工作流
├── docs/                   # 文档根目录
│   ├── .vitepress/         # VitePress 配置目录
│   │   ├── config.mts      # 站点配置文件
│   │   ├── comments.ts     # Giscus 仓库、分类和主题地址
│   │   └── theme/          # 主题配置
│   │       ├── index.ts        # 主题入口
│   │       ├── style.css       # 自定义样式
│   │       ├── layouts/        # 首页、文章、系列和 404 布局
│   │       ├── components/     # 列表、卡片和 Giscus 评论组件
│   │       ├── data/           # 构建时文章数据加载器
│   │       ├── utils/          # 侧边栏与评论标识工具
│   │       └── assets/         # 主题资源文件
│   ├── index.md            # 首页
│   ├── posts/              # 随写文章
│   ├── series/             # 系列文章
│   ├── building/           # 建站日记
│   ├── pages/              # 关于与组件页面
│   ├── public/             # 静态资源目录
│   │   ├── giscus/         # iframe 内浅色、深色自定义主题
│   │   └── robots.txt      # 搜索引擎爬虫配置
│   └── sop/                # 文档目录
│       └── comments.md     # 评论配置与部署说明
├── tests/                 # 评论显示规则与主题地址测试
└── package.json            # 项目配置
```

## 写作指南

### 创建新文章

在 `docs/posts/`、`docs/series/` 或 `docs/building/` 下创建 `.md` 文件即可：

```bash
# 创建随写文章，再补充下面的 Front Matter
echo "# 我的第一篇文章" > docs/posts/my-first-post.md
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

主要配置文件为 `docs/.vitepress/config.mts`，你可以在此修改：

- 站点标题、描述
- 导航菜单
- 侧边栏
- 主题配置
- 社交链接

### 评论系统

使用 **Giscus + GitHub Discussions**，读者直接在文章底部登录、评论和回复。
外层 UI 与 iframe 内部主题均适配博客配色，支持浅色蓝色和深色橙色。

当前已配置 `Owl23007/simple-my-blog` 的 `Announcements` 分类。复制此项目时，先在自己的
GitHub 仓库启用 Discussions、安装 Giscus App，再将生成的仓库和分类 ID 填入
`docs/.vitepress/comments.ts`。未配置时显示准备中的提示，不会加载评论服务。

详见 [Giscus 配置、文章开关与自定义主题托管](docs/sop/comments.md)。

### 本地检查

```bash
pnpm type-check
pnpm lint
pnpm test:comments
pnpm build
```

详细配置请参考：

- [VitePress 官方文档](https://vitepress.dev/)
- [VitePress 自定义主题指南](https://vitepress.dev/zh/guide/custom-theme)
- [VitePress 扩展默认主题](https://vitepress.dev/zh/guide/extending-default-theme)

## 部署

### 部署到 GitHub Pages

1. 在 `docs/.vitepress/config.mts` 中设置正确的 `base` 路径
2. 构建项目

   ```bash
   pnpm build
   ```

3. 将 `docs/.vitepress/dist` 目录部署到 GitHub Pages

## 参考资源

- [VitePress 官方文档](https://vitepress.dev/)
- [VitePress 自定义主题指南](https://vitepress.dev/zh/guide/custom-theme)
- [VitePress 扩展默认主题](https://vitepress.dev/zh/guide/extending-default-theme)

## 致谢

感谢 [@ATQQ](https://github.com/ATQQ) 和 [Sugar Blog](https://github.com/ATQQ/sugar-blog) 项目提供的灵感和指导。

## License

[MIT License](https://opensource.org/licenses/MIT) © 2025 [Owl23007](License)

## 致谢与贡献者

感谢 [@ATQQ](https://github.com/ATQQ) 提供的优秀 VitePress 主题。

[![Contributors](https://contrib.rocks/image?repo=Owl23007/simple-my-blog)](https://github.com/Owl23007/simple-my-blog/graphs/contributors)
