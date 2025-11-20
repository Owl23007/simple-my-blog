import { createContentLoader } from 'vitepress'

export interface BuildingLog {
  name: string
  title: string
  description: string
  link: string
  date: string | undefined
  tags: string[]
}

declare const data: BuildingLog[]
export { data }

export default createContentLoader('building/!(index).md', {
  transform(raw): BuildingLog[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.publish !== false)
      .map(({ url, frontmatter }) => {
        // Extract name from url
        const match = url.match(/\/building\/(.+)/)
        const name = match ? match[1] : ''

        return {
          name,
          title: frontmatter.title || name,
          description: frontmatter.description || '',
          link: url,
          date: frontmatter.date ? new Date(frontmatter.date).toISOString() : undefined,
          tags: frontmatter.tags || []
        }
      })
      .sort((a, b) => {
        const dateA = new Date(a.date || 0).getTime()
        const dateB = new Date(b.date || 0).getTime()
        return dateB - dateA
      })
  }
})
