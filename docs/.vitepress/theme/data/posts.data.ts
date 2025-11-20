import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  date: string | undefined
  description: string
  link: string
  tags: string[]
}

declare const data: Post[]
export { data }

export default createContentLoader('**/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => !url.includes('/index'))
      .filter(({ frontmatter }) => frontmatter.publish !== false)
      .map(({ url, frontmatter, excerpt }) => {
        // Extract title from path if not present in frontmatter
        let title = frontmatter.title
        if (!title) {
          const match = url.match(/\/([^/]+)\.md$/)
          title = match ? match[1] : ''
        }

        // Skip if title is empty
        if (!title) return null

        return {
          title,
          date: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
          description: frontmatter.description || excerpt || '',
          link: url,
          tags: frontmatter.tags || []
        }
      })
      .filter((item): item is Post => item !== null)
      .sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime()
        const dateB = new Date(b.date || 0).getTime()
        return dateB - dateA
      })
  }
})
