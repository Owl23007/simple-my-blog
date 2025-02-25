# 个人介绍网页

这是一个基于Vue.js的个人介绍网页模板，完全使用前端技术实现。该模板提供了一个简洁、现代的页面布局，用于展示你的个人信息、技能、教育经历、项目经验和文章。

## 特点

- 💯 纯前端实现，无需后端支持
- 🚀 基于Vue 3 + Pinia构建
- 📱 响应式设计，适配各种设备
- 🎨 可自定义主题和内容
- 🔄 集中式内容管理，一处修改，处处生效

## 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/Owl23007/SimpleMyInfo.git

# 进入项目目录
cd SimpleMyInfo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 自定义内容

**重要:** 本模板的所有内容都集中在`src/stores/contentStore.js`文件中。修改此文件即可更新整个网站的内容，无需修改任何HTML或组件代码。

### 修改指南

1. **个人信息 (personalInfo)**
   - 修改`name`、`title`、`bio`等基本信息
   - 更新`email`、`phone`、`location`等联系方式
   - 更换`avatar`头像(图片放在assets目录)
   - 设置社交媒体链接(`github`、`linkedin`等)

```javascript
personalInfo: {
  name: '你的名字',
  title: '你的职位',
  bio: '你的简介...',
  // 其他个人信息...
}
```

2. **技能列表 (skills)**
   - 每个技能包含`name`(技能名称)和`level`(熟练度0-100)
   - 可以添加、删除或修改现有技能

```javascript
skills: [
  { name: '你的技能1', level: 90 },
  { name: '你的技能2', level: 85 },
  // 添加更多技能...
]
```

3. **教育经历 (education)**
   - 按照时间倒序排列教育经历
   - 每条记录包含`id`、`degree`、`major`、`school`和`year`

4. **项目经验 (projects)**
   - 展示你完成的项目
   - 每个项目包含标题、描述、图片、标签和链接

5. **文章列表 (articles)**
   - 分享你的知识和经验
   - 支持Markdown格式内容

## 无后端优势

该模板完全在前端实现，具有以下优势：

- **零后端开销** - 无需服务器、数据库或API
- **部署简便** - 可以部署到GitHub Pages、Vercel、Netlify等静态托管服务
- **修改简单** - 只需编辑一个文件即可更新整个网站内容
- **高度安全** - 没有后端意味着没有安全漏洞风险

## 构建部署

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

生成的`dist`目录可以部署到任何静态网站托管服务。

