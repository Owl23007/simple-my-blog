# CI/CD 配置说明

本项目使用 GitHub Actions 实现自动化的持续集成和持续部署。

## 工作流程概览

### 1. 主要工作流

#### 🚀 生产部署 (`deploy.yml`)

- **触发条件**: 推送到 `master` 分支或对 `master` 分支的 PR
- **功能**: 自动构建并部署到 GitHub Pages
- **环境**: 生产环境
- **访问地址**: <https://owl23007.github.io/simple-my-blog>

#### 🔍 代码质量检查 (`ci.yml`)

- **触发条件**: 推送到 `develop`, `feature/*`, `hotfix/*`, `release/*` 分支或对 `master`, `develop` 的 PR
- **功能**:
  - 多 Node.js 版本测试 (18, 20)
  - TypeScript 类型检查
  - Oxlint 代码规范检查
  - Markdown 格式检查
  - 构建验证
  - 基础依赖安全检查

#### 📦 版本发布 (`release.yml`)

- **触发条件**: 推送标签 (格式: `v*`)
- **功能**:
  - 自动生成变更日志
  - 创建 GitHub Release
  - 上传构建产物

## 分支策略与 CI/CD 的配合

### Master 分支

```text
推送到 master → 触发生产部署 → 自动发布到 GitHub Pages
```

### Develop 分支

```text
推送到 develop → 触发 CI 检查 → 确保代码质量
```

### Feature 分支

```text
推送到 feature/* → 触发 CI 检查 → 确保代码质量
创建 PR 到 master/develop → 触发 CI 检查 → 代码审核
```

### Release 分支

```text
推送到 release/* → 触发 CI 检查 → 准备发布
创建标签 v* → 触发 Release 工作流 → 自动发布版本
```

## 环境配置

### 必要的 Secrets

项目已配置基本的 GitHub Pages 部署，如需扩展功能可添加以下 Secrets：

```bash
# 可选：第三方部署服务
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id

# 可选：通知服务
SLACK_WEBHOOK=your_slack_webhook
DISCORD_WEBHOOK=your_discord_webhook
```

### 权限配置

确保仓库设置中启用了：

- GitHub Pages (Source: GitHub Actions)
- Actions 权限 (Read and write permissions)

## 工作流详细说明

### 生产部署工作流

1. **代码检出**: 获取最新代码
2. **环境设置**: Node.js 20 + pnpm
3. **依赖安装**: `pnpm install --frozen-lockfile`
4. **项目构建**: `pnpm build`
5. **Jekyll 构建**: 处理静态资源
6. **部署**: 发布到 GitHub Pages

### CI 检查工作流

1. **多版本测试**: Node.js 18 和 20
2. **缓存优化**: pnpm store 缓存
3. **质量检查**:
   - TypeScript 类型检查
   - ESLint 代码规范检查
   - 构建成功性验证
   - 链接有效性检查
4. **安全扫描**:
   - npm audit 依赖漏洞扫描
   - CodeQL 代码安全分析

### 预览工作流

1. **Develop 推送**: 构建预览版本
2. **PR 预览**: 在 PR 中自动评论构建状态
3. **扩展支持**: 可集成 Netlify/Vercel 预览部署

### 发布工作流

1. **标签触发**: 推送 `v*` 格式标签
2. **变更日志**: 自动生成从上个版本到当前版本的更新内容
3. **创建 Release**: 包含详细的发布信息
4. **构建产物**: 提供下载链接

## 使用方法

### 日常开发

```bash
# 在 feature 分支开发
git checkout -b feature/new-article
# ... 开发内容 ...
git push origin feature/new-article
# 自动触发 CI 检查
```

### 预览测试

```bash
# 合并到 develop 进行预览
git checkout develop
git merge feature/new-article
git push origin develop
# 自动触发预览构建
```

### 生产发布

```bash
# 通过 PR 合并到 master
git checkout master
git merge develop
git push origin master
# 自动触发生产部署

# 或创建 release 版本
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
# 自动触发版本发布
```

## 监控和通知

### 构建状态

- 每个工作流都会在 Actions 页面显示执行状态
- PR 会自动显示检查结果
- 失败时会发送邮件通知

### 部署状态

- 成功部署后可通过 GitHub Pages 访问
- Release 会自动创建并通知相关人员

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本兼容性
   - 确认依赖安装正确
   - 查看构建日志错误信息

2. **部署失败**
   - 检查 GitHub Pages 设置
   - 确认权限配置正确
   - 验证构建产物路径

3. **测试失败**
   - 查看具体的 lint 或类型检查错误
   - 修复代码规范问题
   - 更新依赖版本

### 日志查看

所有工作流的详细日志都可以在 GitHub Actions 页面查看：
`https://github.com/Owl23007/SimpleMyInfo/actions`

## 优化建议

1. **缓存策略**: 已配置 pnpm 缓存，可进一步优化构建时间
2. **并行执行**: CI 检查可以并行运行多个任务
3. **条件执行**: 根据文件变更智能触发相关检查
4. **通知集成**: 可集成 Slack 或其他通知服务
5. **性能监控**: 可添加构建时间和部署性能监控
