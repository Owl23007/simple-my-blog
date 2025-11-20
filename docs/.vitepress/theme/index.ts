import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './layouts/Layout.vue'

import ArticleCard from './components/ArticleCard.vue'
import FolderTimeline from './components/FolderTimeline.vue'
import PostsList from './components/PostsList.vue'
import SeriesList from './components/SeriesList.vue'
import Timeline from './components/Timeline.vue'

import './style.less'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ArticleCard', ArticleCard)
    app.component('Timeline', Timeline)
    app.component('FolderTimeline', FolderTimeline)
    app.component('SeriesList', SeriesList)
    app.component('PostsList', PostsList)
  }
} satisfies Theme
