import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
}

/**
 * 自动生成侧边栏配置
 * @param dirPath 目录路径（相对于 docs 目录）
 * @param options 配置选项
 */
export function generateSidebar(
  dirPath: string,
  options: {
    includeIndex?: boolean // 是否包含 index.md
    indexText?: string // index.md 的显示文本
  } = {}
): SidebarItem[] {
  const { includeIndex = true, indexText = '查看本文大纲' } = options

  const docsPath = path.resolve(__dirname, '../../')
  // 移除开头的 / 以避免在 Windows 上被当作绝对路径
  const cleanDirPath = dirPath.startsWith('/') ? dirPath.slice(1) : dirPath
  const fullPath = path.join(docsPath, cleanDirPath)

  if (!fs.existsSync(fullPath)) {
    return []
  }

  const items: SidebarItem[] = []

  // 如果有 index.md，添加到顶部
  if (includeIndex && fs.existsSync(path.join(fullPath, 'index.md'))) {
    items.push({
      text: indexText,
      link: `${dirPath}/index`
    })
  }

  // 读取目录下的所有文件和文件夹
  const files = fs.readdirSync(fullPath)

  // 过滤并排序 markdown 文件
  const mdFiles = files
    .filter(file => {
      const filePath = path.join(fullPath, file)
      const stat = fs.statSync(filePath)
      // 只处理 .md 文件，排除 index.md
      return stat.isFile() && file.endsWith('.md') && file !== 'index.md'
    })
    .sort((a, b) => {
      // 按文件名排序，支持数字前缀排序
      const aMatch = a.match(/^(\d+)/)
      const bMatch = b.match(/^(\d+)/)
      if (aMatch && bMatch) {
        return Number.parseInt(aMatch[1]) - Number.parseInt(bMatch[1])
      }
      return a.localeCompare(b)
    })

  // 生成文件项
  const fileItems: SidebarItem[] = mdFiles.map(file => {
    const fileName = file.replace(/\.md$/, '')
    const title = extractTitle(path.join(fullPath, file)) || fileName

    return {
      text: title,
      link: `${dirPath}/${fileName}`
    }
  })

  // 如果有文件，添加目录分组
  if (fileItems.length > 0) {
    items.push({
      text: '目录',
      items: fileItems
    })
  }

  return items
}

/**
 * 从 markdown 文件中提取标题
 */
function extractTitle(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    // 匹配第一个 # 标题
    const match = content.match(/^#\s+(.+)$/m)
    return match ? match[1].trim() : null
  } catch {
    return null
  }
}

/**
 * 批量生成多个目录的侧边栏配置
 */
export function generateMultipleSidebars(
  configs: Array<{
    path: string
    options?: Parameters<typeof generateSidebar>[1]
  }>
): Record<string, SidebarItem[]> {
  const result: Record<string, SidebarItem[]> = {}

  for (const config of configs) {
    result[config.path] = generateSidebar(config.path, config.options)
  }

  return result
}

/**
 * 自动扫描指定目录并生成所有子目录的侧边栏配置
 * @param baseDir 基础目录路径（如 '/series'）
 * @param options 配置选项
 */
export function autoGenerateSidebars(
  baseDir: string,
  options?: Parameters<typeof generateSidebar>[1]
): Record<string, SidebarItem[]> {
  const docsPath = path.resolve(__dirname, '../../')
  const cleanBaseDir = baseDir.startsWith('/') ? baseDir.slice(1) : baseDir
  const basePath = path.join(docsPath, cleanBaseDir)

  if (!fs.existsSync(basePath)) {
    return {}
  }

  const result: Record<string, SidebarItem[]> = {}
  const entries = fs.readdirSync(basePath, { withFileTypes: true })

  // 遍历所有子目录
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const dirPath = `${baseDir}/${entry.name}/`
      result[dirPath] = generateSidebar(`${baseDir}/${entry.name}`, options)
    }
  }

  return result
}
