import type { Route } from 'vitepress'

declare global {
  type Awaitable<T> = T | Promise<T>

  export interface Router {
    /**
     * 当前路由
     */
    route: Route
    /**
     * 导航到新的 URL
     */
    go: (to?: string) => Promise<void>
    /**
     * 在路由更改前调用。返回 `false` 表示取消导航
     */
    onBeforeRouteChange?: (to: string) => Awaitable<void | boolean>
    /**
     * 在页面组件加载前（history 状态更新后）调用。返回 `false` 表示取消导航
     */
    onBeforePageLoad?: (to: string) => Awaitable<void | boolean>
    /**
     * 在页面组件加载后（页面组件实际更新前）调用
     */
    onAfterPageLoad?: (to: string) => Awaitable<void>
    /**
     * 在路由更改后调用
     */
    onAfterRouteChange?: (to: string) => Awaitable<void>
  }
}
