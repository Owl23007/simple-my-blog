import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

import FolderTimeline from './components/FolderTimeline.vue'
import SeriesList from './components/SeriesList.vue'
import Timeline from './components/Timeline.vue'

import './style.less'

export default {
  Layout,
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Timeline', Timeline)
    app.component('FolderTimeline', FolderTimeline)
    app.component('SeriesList', SeriesList)
  }
} satisfies Theme
