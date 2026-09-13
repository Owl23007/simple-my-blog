---
title: 配置 Giscus 评论
description: 启用 GitHub Discussions 评论，并使用博客的自定义主题
comments: false
---

# 配置 Giscus 评论

评论使用 Giscus 官方 Vue 组件，内容保存在 GitHub Discussions。读者在文章底部通过
GitHub 登录，即可评论、回复和回应；首次评论时 Giscus 会自动创建讨论，无需逐篇绑定编号。

## 1. 准备 GitHub 仓库

1. 使用公开仓库，默认是 `Owl23007/simple-my-blog`，也可以使用独立的评论仓库。
2. 在仓库 **Settings → General → Features** 中启用 **Discussions**。
3. [安装 Giscus GitHub App](https://github.com/apps/giscus)，授予该仓库权限。
4. 在 Discussions 中准备一个公告类型（Announcements）的分类，例如 `Comments`。
5. 打开 [Giscus 配置页](https://giscus.app/zh-CN)，填写仓库并选择该分类。

## 2. 填写配置

编辑 `docs/.vitepress/comments.ts`，从 Giscus 生成的 script 中复制对应字段：

| 项目字段 | Giscus 字段 |
| --- | --- |
| `repo` | `data-repo` |
| `repoId` | `data-repo-id` |
| `category` | `data-category` |
| `categoryId` | `data-category-id` |

这些是公开标识，不是密钥。不要在前端配置 Token、Client Secret 或个人访问令牌。
当前已配置 `Owl23007/simple-my-blog` 的 `Announcements` 分类。复制此项目时应替换成自己的配置；
ID 留空时，页面会显示“评论区正在准备中”，不会向 Giscus 发起评论请求。

配置后运行 `pnpm dev` 或重新构建部署，即可看到真实评论区。

## 3. 自定义 UI 和主题托管

外层标题、容器、加载提示由 `theme/components/GiscusComments.vue` 控制；iframe 内部
通过 Giscus 官方的自定义主题功能加载下面两个独立 CSS 文件：

- `docs/public/giscus/light.css`：浅色背景、蓝色按钮。
- `docs/public/giscus/dark.css`：深色背景、橙色按钮。

字体、圆角、输入框、评论卡片、回复区域和按钮都做了定制。两份 CSS 包含相同的布局规则，
修改布局时需要同步；深色文件末尾覆盖颜色。保留原有登录、回复、Markdown、表情和管理入口。
这属于样式重写；如果要改变 iframe 内部的组件结构或交互流程，需要 fork 并自托管 Giscus。

默认从当前网站的 `/giscus/` 目录加载主题，自动兼容 VitePress 的 `base`。
主题文件必须通过 HTTPS 公开访问，返回 `Content-Type: text/css`，并允许 Giscus 跨域读取：

```http
Access-Control-Allow-Origin: *
```

GitHub Pages 部署后需检查主题文件响应头。自行部署 Nginx 时，可为该目录添加：

```nginx
location /giscus/ {
    add_header Access-Control-Allow-Origin "*" always;
}
```

将该 location 合并到现有站点配置，并保留原本的 root / alias / MIME 配置；如果使用子路径
部署，需要相应调整 location。不要在代码中关闭浏览器的跨域检查。

也可以在 `comments.ts` 的 `themeBaseUrl` 填写托管主题的 HTTPS 目录地址，例如把本次代码
推送到 master 后，使用 `https://cdn.jsdelivr.net/gh/Owl23007/simple-my-blog@master/docs/public/giscus`。
CDN 可能缓存旧文件，更新样式后可改用新的提交 SHA 替换 `master`。

本地 HTTP 开发环境默认退回 Giscus 内置浅色／深色主题，避免 HTTPS iframe 加载 HTTP 样式失败。
要检查真实 iframe 中的自定义主题，请填写可公开访问的 HTTPS `themeBaseUrl`。

## 文章开关与讨论标识

默认在 `posts/`、`series/` 和 `building/` 下的文章展示，目录页 `index.md` 不展示。
首页、404 和自定义布局不展示评论；其他普通文档可以手动开启。

```yaml
---
comments: true
commentId: my-stable-article-id
---
```

- `comments: false`：关闭该页评论。
- `commentId`：可选稳定标识，不同文章不要重复使用。
- 不填写 `commentId` 时，使用源文件相对路径去掉 `.md`，如 `posts/我的文章`。
- 文章移动或重命名时，将 `commentId` 设为原标识，以继续关联已有讨论。
- `comments.ts` 中的 `enabled: false` 关闭全站评论。

实现使用 `mapping="specific"` 和严格匹配，两个部署域名共享同一篇文章的讨论。
滚动到评论区附近才加载；路由切换销毁旧组件，切换明暗主题时保留当前输入内容。

## 验证和排错

1. 完成配置后打开一篇文章，滚动到底部，确认出现 GitHub 登录入口。
2. 使用测试文章登录并手动发表评论，确认 Discussions 中创建对应讨论。
3. 切换另一篇文章，确认评论不串页；返回原文章检查评论仍在。
4. 切换明暗模式，确认输入框、按钮、代码块和回复可读。
5. 在手机宽度检查登录、输入、回复按钮是否完整显示。

未找到讨论是新文章的正常状态，首次评论会自动创建。若无法登录或发布，检查 App 权限、
分类 ID 和 Discussions 开关。若只缺样式，检查 CSS 的 HTTPS 地址、跨域响应头与浏览器控制台。
20 秒未收到 iframe 尺寸消息会显示重试按钮，Giscus 后续成功加载仍会自动恢复。

参考：[Giscus 配置](https://giscus.app/zh-CN)、
[自定义主题与消息接口](https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md)、
[主题维护说明](https://github.com/giscus/giscus/blob/main/CONTRIBUTING.md#creating-new-themes)。
