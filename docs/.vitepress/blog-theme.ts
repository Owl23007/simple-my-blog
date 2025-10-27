// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

import type { Theme } from '@sugarat/theme'

const baseUrl = 'https://sugarat.top'
const RSS: Theme.RSSOptions = {
  title: '沃以 Oii Woof',
  baseUrl,
  copyright: 'Copyright (c) 2025, 沃以 Oii Woof',
  description: '如果人生只剩20分钟，不如烤个棉花糖吧',
  language: 'zh-cn',
  image: '/avatar.png',
  favicon: '/favicon.ico',
}

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  RSS,

  // 搜索配置 - 默认开启pagefind离线的全文搜索支持
  // search: false, // 如果要禁用搜索，取消注释这行

  // 默认关闭 markdown 图表支持（开启会增加一定的构建耗时）
  // mermaid: false

  // 页脚
  footer: {
    // message 字段支持配置为HTML内容，配置多条可以配置为数组
    // message: '下面 的内容和图标都是可以修改的噢（当然本条内容也是可以隐藏的）',
    copyright: 'MIT License | 沃以 Oii Woof ',
    // icpRecord: {
    //   name: '蜀ICP备19011724号',
    //   link: 'https://beian.miit.gov.cn/'
    // },
    // securityRecord: {
    //   name: '公网安备xxxxx',
    //   link: 'https://www.beian.gov.cn/portal/index.do'
    // },
  },

  // 主题色修改
  themeColor: 'el-blue',

  // 文章默认作者
  author: '沃以',

  // 推荐文章配置
  //recommend: {
  //  title: '精选推荐',
  // nextText: '换一组',
  //  pageSize: 6,
  // style: 'card'
  //},

  // 友链
  friend: [
    {
      nickname: '粥里有勺糖',
      des: '你的指尖用于改变世界的力量',
      avatar:
        'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
      url: 'https://sugarat.top',
    },
  ],

  // 公告
  // popover: {
  //   title: '公告',
  //  body: [
  //  ],
  //duration: 0
  // },
})

export { blogTheme }
