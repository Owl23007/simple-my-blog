import { defineConfig } from 'vitepress'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// 如果使用 GitHub/Gitee Pages 等公共平台部署
// 通常需要修改 base 路径，通常为“/仓库名/”
// 如果项目名已经为 name.github.io 域名，则不需要修改！
const base = process.env.GITHUB_ACTIONS === 'true'
  ? '/simple-my-blog/'
  : '/'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  base,
  lang: 'zh-cn',
  title: '沃以的小站',
  description: '如果人生只剩22分钟，不如烤个棉花糖吧',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: `${base}favicon.ico` }]
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/avatar.png',
    //editLink: {
    // pattern:
    //    'https://github.com/Owl23007/simple-my-blog/edit/master/docs/:path',
    // text: '去 GitHub 上编辑内容'
    //},
    nav: [
      { text: '首页', link: '/' },
      { text: '随便写写', link: '/posts/' },
      {
        text: '系列',
        items: [
          { text: '系列文章', link: '/series/' },
        ]
      },
      { text: '🏷️ 标签', link: '/pages/tags' },
      { text: '生活', link: '/life/' },
      { text: '建站日记', link: '/building/' },
      { text: '关于我', link: '/pages/about' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Owl23007/simple-my-blog'
      }
    ]
  }
})
