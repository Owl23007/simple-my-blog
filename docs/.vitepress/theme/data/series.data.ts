import { createContentLoader } from 'vitepress'

export interface Series {
  name: string
  title: string
  description: string
  link: string
  tags: string[]
}

declare const data: Series[]
export { data }

export default createContentLoader('series/*/index.md', {
  transform(raw): Series[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.publish !== false)
      .map(({ url, frontmatter }) => {
        // Extract name from url /series/name/
        // url is like /series/software-design/
        const match = url.match(/\/series\/(.+)\/$/) || url.match(/\/series\/(.+)\//)
        const name = match ? match[1] : ''

        return {
          name,
          title: frontmatter.title || name,
          description: frontmatter.description || '',
          link: url,
          tags: frontmatter.tags || []
        }
      })
      .sort((a, b) => (a.title || '').localeCompare(b.title || ''))
  }
})
