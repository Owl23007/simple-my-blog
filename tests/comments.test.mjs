import assert from 'node:assert/strict'
import test from 'node:test'
import {
  commentTerm,
  commentTheme,
  shouldShowComments,
} from '../docs/.vitepress/theme/utils/comments.ts'

test('只有文章默认展示评论，显式开关不破坏特殊布局', () => {
  for (const path of [
    'posts/随写.md',
    'series/前端/布局.md',
    'building/部署.md',
  ]) {
    assert.equal(shouldShowComments(path, undefined, undefined), true)
    assert.equal(shouldShowComments(path, undefined, false), false)
  }
  for (const path of [
    'index.md',
    'posts/index.md',
    'series/前端/index.md',
    'pages/about.md',
  ]) {
    assert.equal(shouldShowComments(path, undefined, undefined), false)
  }
  assert.equal(shouldShowComments('pages/about.md', 'doc', true), true)
  assert.equal(shouldShowComments('index.md', 'home', true), false)
  assert.equal(shouldShowComments('series/index.md', 'series', true), false)
})

test('显式标识在文件移动后仍关联同一讨论，空值退回源文件路径', () => {
  assert.equal(commentTerm('posts/新名字.md', 'posts/原名字'), 'posts/原名字')
  assert.equal(commentTerm('posts/中文 空格.md', undefined), 'posts/中文 空格')
  for (const invalid of ['', '  ', 42, false]) {
    assert.equal(commentTerm('posts/文章.md', invalid), 'posts/文章')
  }
})

test('主题适配子路径和 CDN，本地 HTTP 不产生混合内容请求', () => {
  assert.equal(
    commentTheme('https://blog.example/blog/giscus/', false),
    'https://blog.example/blog/giscus/light.css',
  )
  assert.equal(
    commentTheme('https://cdn.example/themes', true),
    'https://cdn.example/themes/dark.css',
  )
  assert.equal(commentTheme('http://localhost:5173/giscus/', false), 'light')
  assert.equal(commentTheme('http://localhost:5173/giscus/', true), 'dark')
  assert.equal(commentTheme('', false), 'light')
})
