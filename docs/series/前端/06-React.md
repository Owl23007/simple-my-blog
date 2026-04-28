---
---

# React 的知识体系：[]

React 作为工程化时代的前端框架，已经成为构建现代 Web 应用的核心工具之一。可以查看[中文文档](https://zh-hans.react.dev/learn) 。

它提供了全面的指南和 API 参考，帮助开发者深入理解 React 的核心概念和最佳实践。

## 安装 node.js

作为前端工程化的开始，首先需要安装 Node.js 和 npm（Node 包管理器）。可以从 [Node.js 官网](https://nodejs.org/) 下载并安装最新的 LTS 版本。

Node.js 的核心理念是 run JavaScript Everywhere，这使得 JavaScript 不再局限于浏览器环境，不受浏览器沙箱的限制，可以直接在操作系统上运行，与本地的文件系统、网络等进行交互。

不同的 node 版本也存在一定的差异，不用担心，可以使用 nvm 来管理多个 node 版本：

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# 安装最新的 LTS 版本的 Node.js
nvm install --lts

# 使用安装的 Node.js 版本
nvm use --lts

# 查看本地安装的 Node.js 版本
nvm ls

# 查看当前使用的 Node.js 版本
node -v

# 查看 npm 版本
npm -v
```

## 创建 React 应用

推荐使用 vite 和 pnpm 管理 React 项目：

```bash
# 安装 pnpm
npm install -g pnpm

# 使用 vite 创建一个新的 React 项目
pnpm create vite

# 选择 react 模板
# 使用 js/ts + react compiler
```

::: details 什么是 pnpm
pnpm 是一个快速、节省磁盘空间的 Node.js 包管理器。与 npm 和 yarn 不同，pnpm 使用符号链接来共享依赖包，从而避免了重复安装相同的包，节省了磁盘空间并提高了安装速度。
pnpm 的核心优势包括：

- 快速安装：pnpm 的安装速度通常比 npm 和 yarn 更快，尤其是在大型项目中。
- 节省磁盘空间：pnpm 通过符号链接共享依赖包，避免了重复安装相同的包，从而节省了磁盘空间。
- 严格的依赖管理：pnpm 强制执行严格的依赖树，确保项目中的依赖关系清晰且一致。
- 兼容性：pnpm 与 npm 和 yarn 兼容，可以使用相同的 package.json 文件，并且支持 npm 和 yarn 的命令行接口。
  :::

::: details 什么是 vite
Vite 是一个现代化的前端构建工具，旨在提供快速的开发体验和高效的生产构建。Vite 的核心理念是利用原生 ES 模块（ESM）和浏览器的原生模块加载机制来实现快速的开发服务器和高效的构建过程。
:::

这里我们用脚手架时，会注意到有多套选择，像 js 、 js + react compiler 等等。这里的 react compiler 是指使用 React 官方提供的 JSX 转换工具，称为 `@babel/preset-react`.
React Compiler 通过静态分析代码，在编译阶段自动为组件添加必要的优化。

RSC 则是 React Server Components 的缩写，是 React 官方提出的一种新的组件类型，允许在服务器端渲染组件并将其发送到客户端，从而提高性能和用户体验，对应 SPA 单页应用，也就是 SSR 服务端渲染。

## React 的核心概念

一般来说，React 的文件入口如下：

```html
<html>
  <!--省略上文-->
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

我们查看一下 `/src/main.jsx`的内容可以很清晰的了解其中的机理：

```jsx
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

和 vue 一致，都是通过 js 将动态的模板或者说组件渲染到页面上。React 通过 `createRoot` 创建一个根节点，并将 React 组件树渲染到这个根节点上。

然后我们可以看见在 `App.jsx` 中导出了一个方法 `App`。

```jsx
export default function App() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
```

::: details 什么是 JSX?

JSX（JavaScript XML） 是 JavaScript 的一种语法扩展，允许你在 JS/TS 代码中直接编写类似 HTML 的标签结构。它最初由 React 团队提出。
现已成为 React、Preact、Solid.js 等现代前端框架的默认 UI 编写方式，但浏览器原生尚不支持任然需要进行转换。

**底层原理：JSX 是如何变成 JS 的？**

```jsx
const element = (
  <h1 className="title" onClick={handleClick}>
    Hello!
  </h1>
);
```

编译后（React 17+ 转换）：

```js
// 自动引入 jsx 函数，无需手动 import React
import { jsx as _jsx } from "react/jsx-runtime";
const element = _jsx("h1", {
  className: "title",
  onClick: handleClick,
  children: "Hello!",
});
```

> 早期 React 会编译为 `React.createElement("h1", { className: "title" }, "Hello!")`。新转换减少了 bundle 体积，且不再强制要求顶部 import React。

在转化为 JavaScript 之后，JSX 代码会被转换成 React调用的虚拟 DOM 树，即创建一个描述 UI 结构的 JavaScript 对象（React 元素）。React 然后使用这些元素来构建和更新 DOM。
:::

注意：只能返回一个根元素
如果想要在一个组件中包含多个元素，需要用一个父标签把它们包裹起来。

```jsx
return (
  <div>
    <h1>Hello World!</h1>
    <p>Welcome to React!</p>
  </div>
)

// 或者使用 Fragment 包裹
<>
  <h1>Hello World!</h1>
  <p>Welcome to React!</p>
</>
```

::: details 什么是 Fragment?

:::
