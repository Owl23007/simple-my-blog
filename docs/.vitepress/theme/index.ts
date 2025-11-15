import BlogTheme from '@sugarat/theme'
import type { Theme } from 'vitepress'

// 导入自定义组件
import FolderTimeline from './components/FolderTimeline.vue'
import Timeline from './components/Timeline.vue'

// 自定义样式重载
import './style.scss'

// 自定义主题色
import './user-theme.css'

// 扩展主题
export default {
  extends: BlogTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('Timeline', Timeline)
    app.component('FolderTimeline', FolderTimeline)
  }
} satisfies Theme
