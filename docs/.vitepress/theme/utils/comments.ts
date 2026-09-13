export function shouldShowComments(
  path: string,
  layout: unknown,
  comments: unknown,
): boolean {
  if (comments === false || (layout && layout !== 'doc')) return false
  if (comments === true) return true
  return (
    /^(posts|series|building)\/.+\.md$/.test(path) &&
    !/(^|\/)index\.md$/.test(path)
  )
}

/** 使用源文件路径作为稳定标识，两个部署域名与不同 base 共用同一个讨论。 */
export function commentTerm(path: string, id: unknown): string {
  return typeof id === 'string' && id.trim()
    ? id.trim()
    : path.replace(/\.md$/, '')
}

export function commentTheme(baseUrl: string, isDark: boolean): string {
  // HTTPS iframe 不能加载本地 HTTP 样式；开发时退回内置主题。
  if (!baseUrl.startsWith('https://')) return isDark ? 'dark' : 'light'
  return `${baseUrl.replace(/\/$/, '')}/${isDark ? 'dark' : 'light'}.css`
}
