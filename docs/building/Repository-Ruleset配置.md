# Repository Ruleset 配置指南

> GitHub Repository Ruleset 配置文件，用于保护重要分支和确保代码质量

## 📋 概览

本 Ruleset 为简约博客项目设计，提供分支保护、代码审查和质量检查等功能。

### 🎯 保护目标

- ✅ `master` 分支（生产环境）
- ✅ `main` 分支（备用主分支）
- ✅ `develop` 分支（开发环境）

## 🛡️ 规则详情

### 基础保护规则

| 规则类型 | 描述 | 状态 |
|---------|------|------|
| `deletion` | 禁止删除受保护分支 | ✅ 启用 |
| `non_fast_forward` | 禁止强制推送 | ✅ 启用 |
| `creation` | 控制分支创建 | ✅ 启用 |
| `required_linear_history` | 要求线性历史记录 | ✅ 启用 |
| `required_signatures` | 要求签名提交 | ✅ 启用 |

### Pull Request 规则

```json
{
  "type": "pull_request",
  "parameters": {
    "dismiss_stale_reviews_on_push": true,        // 新提交时取消过期审查
    "require_code_owner_review": false,           // 不强制要求代码所有者审查
    "require_last_push_approval": false,          // 不要求最后推送的审批
    "required_approving_review_count": 1,         // 需要 1 个审批
    "required_review_thread_resolution": true     // 要求解决所有讨论
  }
}
```

### 状态检查规则

**必须通过的 CI 检查**:

- `CI - Code Quality Check / lint-and-test (ubuntu-latest, 18)`
- `CI - Code Quality Check / lint-and-test (ubuntu-latest, 20)`

这些检查对应 `.github/workflows/ci.yml` 中定义的工作流。

## 🚀 配置步骤

### 方式一：通过 GitHub Web 界面

1. **进入仓库设置**
   - 导航到: `Settings` → `Rules` → `Rulesets`

2. **创建新规则集**
   - 点击 `New branch ruleset`
   - 上传本项目中的 `repository-ruleset.json` 文件

3. **配置目标分支**
   - 选择要保护的分支模式
   - 确认规则应用范围

### 方式二：通过 GitHub CLI

```bash
# 安装 GitHub CLI (如果未安装)
# Windows: winget install --id GitHub.cli
# macOS: brew install gh

# 登录 GitHub
gh auth login

# 创建规则集
gh api repos/:owner/:repo/rulesets \
  --method POST \
  --input repository-ruleset.json
```

### 方式三：手动配置

如果您希望手动配置而不使用 JSON 文件：

1. **基础设置**
   - Ruleset name: `简约博客保护规则集`
   - Enforcement status: `Active`
   - Target branches: `master`, `main`, `develop`

2. **启用保护规则**
   - ✅ Restrict deletions
   - ✅ Restrict force pushes
   - ✅ Require linear history
   - ✅ Require signed commits

3. **Pull Request 设置**
   - Required reviewers: `1`
   - Dismiss stale reviews: `启用`
   - Require conversation resolution: `启用`

4. **状态检查设置**
   - ✅ Require status checks to pass
   - ✅ Require up to date before merging
   - 添加必需的检查项目

## 🔧 自定义配置

### 修改审查要求

如果您是独立开发者，可以调整审查要求：

```json
{
  "required_approving_review_count": 0,  // 改为 0，取消审查要求
  "require_code_owner_review": false
}
```

### 添加额外的状态检查

根据您的 CI/CD 工作流，可以添加更多检查：

```json
{
  "required_status_checks": [
    {
      "context": "build",                    // 构建检查
      "integration_id": 15368
    },
    {
      "context": "security-scan",            // 安全扫描
      "integration_id": 15368
    },
    {
      "context": "deploy-preview",           // 部署预览
      "integration_id": 15368
    }
  ]
}
```

### 绕过权限设置

配置可以绕过规则的用户或团队：

```json
{
  "bypass_actors": [
    {
      "actor_id": 1,                       // Repository admin
      "actor_type": "Repository",
      "bypass_mode": "always"
    },
    {
      "actor_id": 123456,                  // 特定用户 ID
      "actor_type": "User",
      "bypass_mode": "pull_request"        // 仅在 PR 时绕过
    }
  ]
}
```

## 📊 规则集监控

### 查看规则集状态

```bash
# 列出所有规则集
gh api repos/:owner/:repo/rulesets

# 查看特定规则集
gh api repos/:owner/:repo/rulesets/:ruleset_id
```

### 监控合规性

1. **分支保护状态**
   - 在仓库 `Settings` → `Branches` 中查看保护状态

2. **Pull Request 检查**
   - PR 页面会显示所有必需的检查状态

3. **违规日志**
   - 在 `Settings` → `Rules` → `Insights` 中查看违规记录

## 🚨 故障排查

### 常见问题

#### 无法推送到保护分支

**错误信息**: `remote: error: GH013: Repository rule violations found`

**解决方案**:

1. 检查是否通过 Pull Request 流程
2. 确认所有 CI 检查通过
3. 确保有足够的审查批准

#### CI 检查失败

**解决步骤**:

1. 本地运行检查命令

   ```bash
   pnpm type-check  # TypeScript 检查
   pnpm lint        # 代码规范检查
   pnpm build       # 构建测试
   ```

2. 修复发现的问题后重新推送

#### 强制推送被拒绝

这是正常的保护行为，请：

1. 使用 `git rebase` 重写历史
2. 通过正常的 Push 流程提交

## 🔗 相关文档

- [GitHub Rulesets 官方文档](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)
- [CI/CD 配置指南](./CICD配置.md)
- [分支策略文档](./分支策略.md)

---

> 📝 **更新时间**: 2025年11月4日
> 🔧 **维护者**: Owl23007
> 📋 **版本**: v1.0.0
