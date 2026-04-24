---
title: 前端全栈知识体系梳理
date: 2026-01-02
description: 梳理前端技术栈核心知识与现代应用实践。
tags:
  - 前端
  - 浏览器
next: ./01-html.md

---
# 📚 前端全栈知识体系梳理

梳理一下前端技术栈的核心知识点与现代应用实践，涵盖基础核心、浏览器与网络、现代框架、工程化体系、性能与体验、架构与扩展六大部分。

## 📖 完整目录

### **第一部分：基础核心**

#### [1. HTML 深度解析：从语义化到浏览器渲染](./01-html.md)

- DOCTYPE 与文档模式演进
- 语义化标签的真正价值（不止于SEO）
- 表单系统：id vs name、action 执行机制
- Meta 标签体系：字符编码/视口/预加载
- PWA 集成：Manifest 与 Service Worker
- HTML 解析算法与容错机制

#### [2. CSS 的知识体系：布局革命与性能优化](./02-css.md)

- 盒模型本质：标准 vs 怪异模式
- BFC 触发条件与实际应用场景
- Flex/Grid 双引擎布局策略
- 响应式设计：媒体查询 vs 容器查询
- 重绘回流原理与规避方案
- CSS 变量作用域与 Houdini API

#### [3. JavaScript 核心：语言特性与运行机制]

- 作用域链与闭包实践
- this 指向规则与绑定方法
- 事件循环：宏任务/微任务执行顺序
- 原型继承 vs class 语法糖
- 模块化演进：CommonJS → ES Module
- Proxy 陷阱与 WebAssembly 互操作

### **第二部分：浏览器与网络**

#### [4. 浏览器内核工作原理]

- 渲染引擎架构（Blink/WebKit）
- 关键渲染路径优化
- V8 引擎职责边界（不解析HTML!）
- DOM 树构建规则与容错机制
- 合成层创建条件与优化策略

#### [5. 网络协议与性能优化]

- HTTP/1.1 → HTTP/3 演进
- TLS 1.3 握手优化
- 资源加载策略：preload/prefetch/preconnect
- 缓存体系：强缓存/协商缓存/Service Worker
- CORS 与跨域解决方案本质
- WebTransport 与 gRPC-Web

### **第三部分：现代框架**

#### [6. React 深度实践](./06-React.md)

- Fiber 架构与调度原理
- Hooks 设计哲学与闭包陷阱
- 状态管理方案对比（Context vs Redux vs Zustand）
- 服务端渲染（SSR）与流式传输
- React Server Components 实战
- Concurrent Mode 实战策略

#### [7. Vue 3 全景解析]

- 响应式系统：Proxy vs defineProperty
- Composition API 优势场景
- 虚拟 DOM diff 策略优化
- 跨端方案：UniApp 与 Taro 选型
- 性能优化：tree-shaking 与按需加载
- Custom Renderer 实现原理

#### [8. 框架无关设计原则]

- 组件设计模式（容器/展示组件）
- 状态管理本质与实现
- 路由原理：history vs hash
- 框架迁移策略与渐进式重构
- Web Components 原生组件化

### **第四部分：工程化体系**

#### [9. 构建工具链]

- Vite 与 Webpack 核心差异
- 模块联邦（Module Federation）实战
- 持久化缓存策略
- 构建性能分析与优化
- 跨端构建方案：Electron/Tauri
- Rust 构建工具生态（SWC/Parcel 2）

#### [10. 质量保障体系]

- TypeScript 工程化实践
- ESLint/Prettier 规范落地
- 单元测试：Jest/Vitest 最佳实践
- E2E 测试：Cypress/Playwright 选型
- 监控体系：错误追踪与性能指标
- 类型安全与运行时验证

### **第五部分：性能与体验**

#### [11. 前端性能优化全景]

- Lighthouse 评分提升策略
- 首屏加载：关键资源内联/预加载
- 运行时性能：长任务拆分/虚拟滚动
- 内存管理：泄漏检测与优化
- 性能预算制定与监控
- Web Vitals 采集与分析

#### [12. 交互体验设计]

- 动画性能：CSS vs JS 方案
- 无障碍（a11y）深度实践
- 响应式设计：媒体查询/容器查询
- 设备适配：手势/触控/键盘导航
- 感知性能：骨架屏/渐进加载
- 多模态交互设计原则

### **第六部分：架构与扩展**

#### [13. 前端架构设计]

- 微前端：qiankun 源码级分析
- 状态管理方案演进史
- 设计系统构建与维护
- 低代码平台核心原理
- 大型项目模块拆分策略
- Monorepo 架构优化

#### [14. 高性能计算：WebAssembly与图形渲染]

- WebAssembly 核心原理与 JS 互操作
- Canvas 2D 与 WebGL 渲染优化
- Three.js 核心架构与性能调优
- WebGPU 未来演进路径
- 音视频处理：WebCodecs 与 WebRTC

#### [15. 智能前端：AI与LLM集成]

- 浏览器内 AI 推理：TensorFlow.js/ONNX.js
- LLM 前端集成架构设计
- 流式响应处理与工具调用
- 客户端缓存与隐私保护
- 智能 UI 模式：自动布局与内容生成

#### [16. 安全与全球化]

- XSS/CSRF 防御体系与 CSP 配置
- 安全存储策略与 Token 管理
- 国际化：i18n/l10n 工程化实践
- 本地化：日期/数字/货币格式化
- 多语言 SEO 优化策略
- 合规性：GDPR 与隐私保护
