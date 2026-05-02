---
title: JavaScript 从历史变迁到现代应用
date: 2026-05-02
tag:
  - JavaScript
  - 前端
  - 编程语言
description: 这一次，从 JavaScript 的历史演变开始，深入探讨其核心特性、运行机制以及现代应用实践，全面理解这门语言的魅力与挑战。
outline: 2
---

# JavaScript 从历史变迁到现代应用

先说明一下，js的内容丰富且庞杂，本笔记只是作为我自己的一个总结，内容不一定全面，也推荐大佳系统的区学习 js 的相关你内容，详细的学习资料可以参考[JavaScript.info](https://zh.javascript.info/)。

## 一、JavaScript 的定位、运行时与宿主环境

### 1. JavaScript 是什么

JavaScript 是一门运行在宿主环境中的脚本语言。

它本身只定义了语言核心能力，例如：

- 变量
- 数据类型
- 函数
- 对象
- 原型
- Promise
- 模块语法
- 错误处理

这些内容属于 **ECMAScript 规范**。

但是我们平时写 JS 时，经常会使用很多额外能力，例如：

```js
document.querySelector(".app"); // 浏览器提供的 DOM API
setTimeout(() => {}, 1000); // 浏览器提供的定时器 API
fetch("/api/user"); // 浏览器提供的网络请求 API
```

这些并不是 JavaScript 语言本身提供的，而是由不同的运行环境提供的。

### 2. JavaScript、ECMAScript、运行时的关系

可以简单理解为：

ECMAScript：规定 JS 语言本身怎么写
JavaScript：ECMAScript 的具体实现和使用
运行时：让 JS 代码真正跑起来的环境
宿主环境：提供额外 API 的平台

JS 语言本身不负责操作 DOM，也不负责读写文件。

DOM 操作来自浏览器：

```js
document.body.append("hello");
```

文件读写来自 Node.js：

```js
const fs = require("fs");
fs.readFileSync("./a.txt");
```

### 3. 浏览器环境

在浏览器中，JavaScript 主要用于页面交互。

浏览器提供了很多额外 API，例如：

- DOM：操作页面结构
- BOM：操作浏览器窗口
- fetch：发送网络请求
- localStorage：本地存储
- setTimeout / setInterval：定时器
- addEventListener：事件监听

例如：

```js
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("clicked");
});
```

这里的 `document`、`button`、`addEventListener` 都属于浏览器提供的能力，不是 JS 语言本身的核心语法。

### 4. Node.js 环境

[Node.js](https://nodejs.org/) 是一个让 JavaScript 脱离浏览器运行的环境，核心思想是 "Run JavaScript Everywhere"。

它基于 V8 引擎，让 JS 可以运行在服务端、命令行工具、脚本任务等场景中。

Node.js 提供了很多服务端能力，例如：

- fs：文件系统
- path：路径处理
- http：创建服务器
- process：进程信息
- stream：流处理
- buffer：二进制数据处理

例如：

```js
const fs = require("fs");

const content = fs.readFileSync("./note.txt", "utf-8");
console.log(content);
```

这段代码不能直接在普通浏览器中运行，因为浏览器没有 `fs` 这个模块。

### 5. JS 引擎的作用

JS 引擎负责真正执行 JavaScript 代码。

常见的 JS 引擎有：

| 引擎             | 使用场景           |
| -------------- | -------------- |
| V8             | Chrome、Node.js |
| SpiderMonkey   | Firefox        |
| JavaScriptCore | Safari         |

JS 引擎主要负责：

- 解析 JS 代码
- 生成语法结构
- 编译和执行代码
- 管理内存
- 执行垃圾回收

简单来说：

```txt
JS 源代码
  ↓
JS 引擎解析
  ↓
编译 / 解释执行
  ↓
得到运行结果
```

### 6. 运行时和宿主环境的区别

这两个概念容易混在一起。

**运行时** 更强调“JS 代码如何被执行”。

例如：

- JS 引擎
- 调用栈
- 事件循环
- 任务队列
- 内存管理

**宿主环境** 更强调“JS 可以调用哪些外部能力”。

例如：

- 浏览器提供 DOM、BOM、fetch
- Node.js 提供 fs、path、http
- 小程序提供自己的页面和网络 API

所以可以理解为：

- 运行时：负责让 JS 跑起来，对应 JS 引擎和执行机制
- 宿主环境：负责给 JS 提供额外能力，让它能做更多事情，提供不同的 API 集合

下面这部分可以直接整理进你的：

```md
## 二、JavaScript 规范与历史演进
```

我把你前面问到的 **内联脚本、普通 script 执行、DOM 构建、标签补全、模块化、CommonJS、ES Module、代码执行机制** 都合并进来了。

---
对，你这个判断是对的。你现在的第二章把很多后面章节的内容提前写进来了，比如：

| 当前第二章里的内容                              | 更适合放到                  |
| -------------------------------------- | ---------------------- |
| `var / let / const`、变量提升               | 第三章：变量声明与执行上下文         |
| 执行上下文、词法环境、声明阶段                        | 第五章：作用域、执行上下文与闭包       |
| CommonJS 的包装函数、require 缓存、live binding | 第十二章：模块系统              |
| DOM 构建状态、标签补全、script 是否是 DOM 节点        | 第十四章：浏览器 API、DOM 与事件系统 |
| V8 解析、AST、字节码、执行机制                     | 第十三章：V8、内存管理与垃圾回收      |

所以第二章只保留“历史演进主线”就好：**从浏览器脚本 → 标准化 → 外部脚本 → 模块化探索 → CommonJS → ES Module → 工程化**。我根据你上传的草稿整理了一版更适合作为第二章的版本。

---

## 二、JavaScript 规范与历史演进

### 1. 从浏览器脚本到标准化语言

JavaScript 最早是作为浏览器中的脚本语言出现的，主要用于处理页面交互、表单校验和简单的 DOM 操作。

早期网页中的 JS 通常直接写在 HTML 里：

```html
<button onclick="sayHello()">点击</button>

<script>
  function sayHello() {
    alert("hello");
  }
</script>
```

这种写法很适合早期简单页面，因为当时 JavaScript 的主要目标并不是构建大型应用，而是给静态网页增加一点交互能力。

早期 JS 的常见用途包括：

- 表单校验
- 按钮点击
- 简单动画
- DOM 操作
- 浏览器事件处理

但是随着浏览器厂商各自实现 JavaScript，不同环境中的语法和行为逐渐出现差异。为了统一语言规则，后来形成了 **ECMAScript** 规范。

ECMAScript 主要规定语言本身的核心能力，例如：

- 变量和数据类型
- 函数和对象
- 原型和继承
- 作用域规则
- 错误处理
- Promise
- 模块语法
- Proxy、Reflect 等语言特性

而 DOM、BOM、`fetch`、`localStorage`、`fs` 等能力属于不同宿主环境提供的 API。

### 2. 内联脚本时代：JS 直接嵌入 HTML

早期 JavaScript 经常直接写在 HTML 中。

```html
<input id="username" />

<script>
  var input = document.getElementById("username");

  input.oninput = function () {
    console.log(input.value);
  };
</script>
```

这种写法被称为内联脚本。

它的特点是：

- HTML 和 JS 写在一起
- 代码按页面解析顺序执行
- 多个 script 共享全局作用域

这种方式在小页面中比较方便，但是页面复杂之后会出现很多问题：

1. HTML 和 JS 强耦合
2. 代码复用困难
3. 全局变量污染严重
4. 多个 `script` 之间依赖顺序敏感
5. 代码难以维护和拆分

例如：

```html
<script>
  var user = "A";
</script>

<script>
  var user = "B";
</script>
```

两个脚本共享同一个全局作用域，后面的 `user` 会覆盖前面的 `user`。

这说明早期 JavaScript 的代码组织方式比较简单，本质上还是“页面中顺序执行的一段脚本”。

早期普通 `<script>` 默认是同步执行的，这也是 JavaScript 一直以来的默认行为。

当浏览器解析 HTML 时，如果遇到普通脚本：

```html
<script src="./main.js"></script>
```

浏览器会暂停 HTML 解析，先下载并执行 JavaScript，执行完之后再继续解析后面的 HTML。

所以早期普通脚本有两个明显特点：

第一，script 会阻塞 HTML 解析。
第二，script 的执行顺序依赖它在 HTML 中的位置。

例如：

```html
<body>
  <div id="before">before</div>

  <script>
    console.log(document.getElementById("before"));
    console.log(document.getElementById("after"));
  </script>

  <div id="after">after</div>
</body>
```

执行脚本时，`before` 已经被解析成 DOM 节点，而 `after` 还没有被解析，所以：

```js
document.getElementById("before"); // 可以拿到
document.getElementById("after");  // null
```

因此早期常见的做法是把脚本放到 `body` 末尾：

```html
<body>
  <div id="app"></div>
  <button id="btn">按钮</button>

  <script src="./main.js"></script>
</body>
```

这样脚本执行时，页面主体 DOM 基本已经解析完成。

不过这部分更细的 DOM 构建、标签补全、`script` 节点位置等内容，会在后面的“浏览器 API、DOM 与事件系统”中详细讲。

### 3. 从内联脚本到外部脚本

随着页面逻辑变多，JS 代码不可能一直写在 HTML 中，于是开始拆分为外部文件。

```html
<script src="./utils.js"></script>
<script src="./user.js"></script>
<script src="./main.js"></script>
```

例如：

```js
// utils.js
function formatDate(date) {
  return date.toLocaleDateString();
}
```

```js
// user.js
var user = {
  name: "owl",
};
```

```js
// main.js
console.log(user.name);
console.log(formatDate(new Date()));
```

外部脚本让代码拆分变得更清晰，但本质上仍然是：

多个 JS 文件按照 script 顺序执行
多个文件共享同一个全局作用域
依赖关系依靠开发者手动维护

这会带来新的问题。

例如：

```html
<script src="./main.js"></script>
<script src="./utils.js"></script>
```

如果 `main.js` 依赖 `utils.js`，但是 `utils.js` 后加载，就可能报错。

所以外部脚本解决了“代码拆分”的问题，防止一个文件过大，而是通过网络将代码分发到客户端。但没有真正解决：

命名冲突
依赖声明
模块复用
加载顺序管理

这些问题推动了后来的模块化方案。

### 4. 命名空间模式：减少全局变量

在正式模块化规范出现之前，开发者常用对象来模拟命名空间。

```js
var MyApp = {};

MyApp.user = {
  name: "owl",
};

MyApp.formatDate = function (date) {
  return date.toLocaleDateString();
};
```

这样可以把原本散落在全局作用域中的变量收束到一个对象里。

原来可能是：

```js
var user = {};
var formatDate = function () {};
var request = function () {};
```

现在变成：

```js
MyApp.user;
MyApp.formatDate;
MyApp.request;
```

这种方式的好处是减少了全局变量数量，让功能有了一定归属，不同的模块可以通过不同的命名空间对象来区分。

但它仍然不是真正的模块系统。

例如：

```js
MyApp.user = null;
```

外部代码可以直接破坏内部状态。

### 5. IIFE：用函数作用域模拟模块

后来开发者开始使用 IIFE，也就是立即执行函数，来模拟模块作用域。

```js
var UserModule = (function () {
  var name = "owl";

  function getName() {
    return name;
  }

  function setName(newName) {
    name = newName;
  }

  return {
    getName: getName,
    setName: setName,
  };
})();// <- 关键点：立即执行
```

IIFE 的核心思想是：

用函数作用域保存私有变量
只通过 return 暴露公开接口

外部不能直接访问内部变量：

```js
console.log(UserModule.name); // undefined
```

这已经接近模块化思想：

- 模块内部有私有状态
- 模块对外暴露接口
- 外部通过接口使用模块

但是 IIFE 仍然没有真正解决依赖加载问题。

比如一个模块依赖另一个模块时，仍然需要开发者手动安排 `<script>` 的顺序。

### 6. AMD / CMD：浏览器中的异步模块加载

在 ES Module 出现之前，浏览器本身并没有标准的模块系统。

早期我们只能通过多个 `<script>` 标签引入 JS 文件：

于是社区开始尝试在浏览器中实现模块化加载，其中比较典型的是：

- AMD：Asynchronous Module Definition ———— 异步模块定义，代表工具是 RequireJS
- CMD：Common Module Definition ———— 通用模块定义，代表工具是 Sea.js

它们的共同目标都是：

- 让模块可以声明依赖
- 让加载器负责加载依赖
- 让代码不再完全依赖 script 标签顺序

#### AMD：依赖前置，提前声明

AMD 的代表工具是 **RequireJS**。

AMD 更强调：**在定义模块时，就提前声明这个模块依赖哪些东西。**

典型写法是：

```js
define(["jquery"], function ($) {
  function init() {
    $("#app").text("hello");
  }

  return {
    init: init,
  };
});
```

这里的意思是：

- 这个模块依赖 jquery。
- 加载器先加载 jquery。
- jquery 加载完成后，把它作为参数 $ 传入回调函数。
- 最后回调函数返回当前模块暴露的内容。

使用模块时：

```js
require(["app"], function (app) {
  app.init();
});
```

可以理解为：

- 我要使用 app 模块。
- 加载器先异步加载 app。
- app 加载完成后，把 app 传入回调函数。
- 然后执行 app.init()。

AMD 的核心流程是：

```txt
define 声明模块
  ↓
提前写出依赖数组
  ↓
加载器异步加载依赖
  ↓
依赖加载完成
  ↓
执行模块工厂函数
  ↓
返回模块导出内容
```

所以 AMD 的特点是：

- 依赖前置
- 异步加载
- 回调执行

这个设计很适合浏览器： 浏览器加载 JS 文件通常来自网络请求，所以通过定义了依赖数组，加载器可以先分析出所有依赖，然后并行加载，最后在依赖都准备好后再执行模块代码。

#### CMD：依赖就近，写到用的时候

CMD 的代表工具是 **Sea.js**。

CMD 更强调：依赖可以写在真正使用它的地方。

典型写法是：

```js
define(function (require, exports, module) {
  var $ = require("jquery"); // 这里！

  function init() {
    $("#app").text("hello");
  }

  module.exports = {
    init: init,
  };
});
```

这个写法看起来很像 CommonJS：

```js
var $ = require("jquery");
```

但要注意：

> CMD 的 `require` 写法像同步，但它运行在浏览器里，底层仍然需要模块加载器处理资源加载，只是将依赖写在了使用的位置附近，模块加载器会在运行时解析 `require` 调用，动态加载依赖。

#### AMD 和 CMD 的区别

可以简单对比：

| 对比点  | AMD                                  | CMD                                              |
| ---- | ------------------------------------ | ------------------------------------------------ |
| 代表工具 | RequireJS                            | Sea.js                                           |
| 依赖写法 | 依赖前置                                 | 依赖就近                                             |
| 模块定义 | `define(["dep"], function (dep) {})` | `define(function (require, exports, module) {})` |
| 思路   | 先声明依赖，再执行模块                          | 在模块内部需要时再 `require`                              |
| 风格   | 更偏浏览器异步回调风格                          | 更接近 CommonJS 风格                                  |
| 出现背景 | 解决浏览器异步加载模块问题                        | 让浏览器模块写法更接近 CommonJS                             |

随着 ES6 引入官方模块系统以及 Webpack、Rollup、Vite 等构建工具普及，AMD / CMD 就逐渐退出了主流开发场景。

### 7. CommonJS：服务端 JavaScript 的模块化

Node.js 秉承着"Run JavaScript everywhere"的理念，JavaScript 带着CommonJS开始从浏览器走向本地化，并广泛运用于服务端、脚本、命令行工具等场景。

在 Node.js 中，模块通常来自本地文件系统，所以可以使用同步加载模型。CommonJS 因此成为 Node.js 早期最重要的模块规范。

CommonJS 的典型写法是：

```js
// math.js
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

module.exports = {
  add,
  sub,
};
```

导入时使用：

```js
// main.js
const math = require("./math");

console.log(math.add(1, 2));
```

CommonJS 的核心思想是：

- 一个文件就是一个模块
- 每个模块都有自己的作用域
- 通过 require 导入模块
- 通过 module.exports 导出模块

不过 CommonJS 是运行时加载，且主要适合本地文件环境，不太适合浏览器直接使用。

CommonJS 的具体执行机制、`module.exports` 和 `exports` 的区别、`require` 缓存、循环依赖等内容，后面会在"模块系统：CommonJS、ESM 与工程化加载"中详细讲。

### 8. ES Module：语言级模块系统

ES6，也就是 ES2015，引入了官方模块系统：ES Module。

它使用 `import` 和 `export` 来声明模块依赖。

```js
// math.js
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}
```

```js
// main.js
import { add, sub } from "./math.js";

console.log(add(1, 2));
```

在浏览器中，可以这样使用模块脚本：

```html
<script type="module" src="./main.js"></script>
```

ES Module 相比普通 script 的变化在于：

普通 script：
  按标签顺序执行
  多个文件共享全局作用域
  依赖关系靠人为维护

ES Module：
  通过 import/export 声明依赖
  每个模块都有自己的作用域
  浏览器或构建工具可以分析模块依赖图
  模块系统成为语言标准的一部分

ES Module 的出现，意味着 JavaScript 终于拥有了官方的模块化方案。

它也是现代前端工程化的基础之一。

 ES Module 的执行流程、静态分析、live binding、循环依赖、Tree Shaking 等细节，也会在后面“模块系统：CommonJS、ESM 与工程化加载”中详细讲。

### 9. defer、async 与 module：脚本加载方式的演进

除了模块化，脚本加载方式也在演进。

早期普通脚本会阻塞 HTML 解析：

```html
<script src="./main.js"></script>
```

后来出现了 `defer`：

```html
<script src="./main.js" defer></script>
```

`defer` 的特点是：

```txt
下载 JS 不阻塞 HTML 解析
等 HTML 解析完成后再执行 JS
多个 defer 脚本会按照声明顺序执行
```

还有 `async`：

```html
<script src="./analytics.js" async></script>
```

`async` 的特点是：

```txt
下载 JS 不阻塞 HTML 解析
下载完成后立即执行
多个 async 脚本不保证执行顺序
```

现代模块脚本：

```html
<script type="module" src="./main.js"></script>
```

默认行为类似 `defer`，通常会等 HTML 解析完成后再执行模块入口，但这时候就已经是支持模块导入导出了。

这说明 JS 的加载模式也从：

```txt
同步阻塞执行
  ↓
异步加载脚本
  ↓
模块化依赖加载
```

逐渐适应了现代 Web 应用的复杂度。

::: tips defer 和 async 的区别
  既然 `defer` 和 `async` 都是异步加载脚本，为什么还要两种方式呢？

- `defer` 适合那些需要保证执行顺序的脚本，或者依赖于 DOM 结构的脚本，因为它会等 HTML 解析完成后再执行，并且多个 defer 脚本会按照声明顺序执行。
- `async` 适合那些独立的、与 DOM 无关的脚本，例如分析工具、广告脚本等，因为它会在下载完成后立即执行，不保证顺序。

  模块脚本默认行为类似 `defer`，但它还支持模块化特性，例如 `import/export`，所以它更适合现代应用的入口脚本，当然你也可以在模块脚本上使用 `async` 来让它更早执行，但这时候就要注意模块依赖和执行时机了。
:::

### 11. 现代工程化：从脚本到应用

现代前端项目已经不再只是几个 `<script>` 文件。

现在一个项目通常会包含：

```txt
多个 JS / TS 模块
多个组件
CSS / 预处理器
图片和静态资源
第三方依赖
构建工具配置
开发服务器
代码分包和性能优化
```

这推动了 Webpack、Rollup、Vite 等构建工具的发展。

这些工具主要解决：

```txt
模块依赖分析
代码打包
语法转换
开发热更新
资源处理
代码压缩
按需加载
Tree Shaking
```

因此，JavaScript 的使用方式逐渐从：

```txt
HTML 页面中的几段脚本
```

发展成：

```txt
围绕模块系统和构建工具组织的大型应用工程
```

### 12. JavaScript 历史演进主线

可以把 JavaScript 的演进概括为：

```txt
内联 script
  ↓
外部 script 文件
  ↓
命名空间模式
  ↓
IIFE 模块模式
  ↓
AMD / CMD
  ↓
CommonJS
  ↓
ES Module
  ↓
现代构建工具：Webpack / Rollup / Vite
```

对应的变化是：

```txt
早期：
  JS 是页面中的同步脚本
  多个 script 共享全局作用域
  依赖关系靠人工维护

中期：
  开发者开始用命名空间和 IIFE 模拟模块
  社区出现 AMD、CMD、CommonJS 等模块方案

现代：
  ES Module 成为官方模块系统
  构建工具负责依赖分析、打包和优化
  JS 成为现代 Web 应用的核心语言
```

### 13. 小结

JavaScript 的历史演进，本质上是从“简单页面脚本”逐步发展为“现代工程化语言”的过程。

它的变化主要体现在三个方面：

```txt
第一，语言规范逐渐标准化：
  从浏览器脚本发展为 ECMAScript 标准语言。

第二，代码组织方式逐渐模块化：
  从全局 script 发展到 CommonJS 和 ES Module。

第三，工程能力逐渐完善：
  从手动管理 script 顺序发展到构建工具自动分析依赖。
```

一句话概括：

```txt
JavaScript 的演进，不只是语法越来越多，
更重要的是它从“页面中的一段脚本”，
发展成了“有标准、有模块、有运行环境、有工程体系的现代编程语言”。
```

## 三、var、let、const 与执行上下文

## 四、数据类型、类型转换与内存模型

## 五、作用域、执行上下文与闭包

## 六、this 指向与函数调用机制

## 七、函数进阶与函数式编程基础

## 八、对象、原型链与 class

## 九、Proxy、Reflect 与元编程

## 十、异步编程：回调、Promise、async / await

## 十一、事件循环、宏任务与微任务

## 十二、模块系统：CommonJS、ESM 与工程化加载

## 十三、V8、内存管理与垃圾回收

## 十四、浏览器 API、DOM 与事件系统

## 十五、错误处理、调试与性能分析

## 十六、常用内置对象与现代 JavaScript API

## 十七、手写题与面试高频专题
