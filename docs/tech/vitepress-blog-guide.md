---
title: 'VitePress 博客搭建指南'
date: 2025-10-26
tags:
  - VitePress
  - 博客
  - 前端
category: 技术笔记
description: '详细介绍如何使用 VitePress 搭建个人博客，包括主题配置、部署等内容。'
author: 沃以
publish: true
---

## 前言

VitePress 是一个基于 Vite 的静态网站生成器，特别适合用来搭建技术博客和文档网站。本文将介绍如何从零开始搭建一个个人博客。

## 快速开始

### 安装依赖

```bash
# 使用 pnpm
pnpm add -D vitepress

# 或使用 npm
npm install -D vitepress
```

### 初始化项目

```bash
npx vitepress init
```

## 主题选择

推荐使用 `@sugarat/theme` 主题，它提供了博客所需的各种功能：

- 文章列表
- 标签分类
- 搜索功能
- RSS 订阅
- 响应式设计

## 部署到 GitHub Pages

配置 GitHub Actions 实现自动部署...

## 总结

通过本文的介绍，相信你已经可以快速搭建自己的博客了。
