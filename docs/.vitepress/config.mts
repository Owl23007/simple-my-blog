import taskLists from 'markdown-it-task-lists'
import { defineConfig } from 'vitepress'

// 使用独立用户主页仓库 (github.io)
const base = '/'

// Mermaid markdown-it 插件 - 在构建时标记，由客户端 mermaid 库渲染
const mermaidPlugin = (md: any) => {
  const defaultFenceRenderer = md.renderer.rules.fence.bind(md.renderer.rules)
  let mermaidId = 0

  md.renderer.rules.fence = (tokens: any, idx: number, options: any, env: any, self: any) => {
    const token = tokens[idx]
    const info = token.info.trim()

    if (info === 'mermaid') {
      const code = token.content.trim()
      // 使用 pre.mermaid 标签，mermaid 库会识别并处理
      return `<pre class="mermaid mermaid-${mermaidId++}">${code}</pre>\n`
    }

    return defaultFenceRenderer(tokens, idx, options, env, self)
  }
}

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  base,
  lang: 'zh-cn',
  title: '沃以的小站',
  description: '如果人生只剩22分钟，不如烤个棉花糖吧',
  lastUpdated: true,
  markdown: {
    config(md) {
      md.use(taskLists)
      md.use(mermaidPlugin)
    },
  },
  head: [
    // 配置网站的图标
    ['link', { rel: 'icon', href: `${base}favicon.ico` }]
  ],
  vite: {
    css: {
      preprocessorOptions: {
        less: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api']
        }
      }
    }
  },
  themeConfig: {
    // 搜索配置
    search: {
      provider: 'local'
    },
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
      { text: '生活', link: '/life/' },
      { text: '建站日记', link: '/building/' },
      { text: '关于我', link: '/pages/about' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Owl23007/simple-my-blog'
      },
      {
        icon: 'bilibili',
        link: 'https://space.bilibili.com/396694127'
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.2 20L19 21.5V22H5V21.5L6.8 20H5C3.89543 20 3 19.1046 3 18V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V18C21 19.1046 20.1046 20 19 20H17.2ZM13 5V11H19V7C19 5.89543 18.1046 5 17 5H13ZM11 5H7C5.89543 5 5 5.89543 5 7V11H11V5ZM19 13H5V18H19V13ZM7.5 17C6.67157 17 6 16.3284 6 15.5C6 14.6716 6.67157 14 7.5 14C8.32843 14 9 14.6716 9 15.5C9 16.3284 8.32843 17 7.5 17ZM16.5 17C15.6716 17 15 16.3284 15 15.5C15 14.6716 15.6716 14 16.5 14C17.3284 14 18 14.6716 18 15.5C18 16.3284 17.3284 17 16.5 17Z"/></svg>'
        },
        link: 'https://www.travellings.cn/go.html',
        ariaLabel: '开往'
      }
    ],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present 沃以 | <a href="https://beian.miit.gov.cn/">鄂ICP备2024073383号-1</a>'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    sidebar: {
      '/series/软件设计体系结构/': [
        { text: '查看本文大纲', link: '/series/软件设计体系结构/index' },
        {
          text: '目录',
          items: [
            { text: '第一章 软件设计基础', link: '/series/软件设计体系结构/01-软件设计基础' },
            { text: '第二章 软件设计原则', link: '/series/软件设计体系结构/02-软件设计原则' }
            ,
            { text: '第三章 UML 基础与建模实践', link: '/series/软件设计体系结构/03-UML基础与建模实践' }
            ,
            { text: '第四章 创建型设计模式', link: '/series/软件设计体系结构/04-创建型设计模式' },
            { text: '第五章 结构型设计模式', link: '/series/软件设计体系结构/05-结构型设计模式' },
            { text: '第六章 行为型设计模式', link: '/series/软件设计体系结构/06-行为型设计模式' }
          ]
        }
      ]
    }
  }
})
