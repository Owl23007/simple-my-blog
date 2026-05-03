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

- 下载 JS 不阻塞 HTML 解析
- 等 HTML 解析完成后再执行 JS
- 多个 defer 脚本会按照声明顺序执行

还有 `async`：

```html
<script src="./analytics.js" async></script>
```

`async` 的特点是：

- 下载 JS 不阻塞 HTML 解析
- 下载完成后立即执行
- 多个 async 脚本不保证执行顺序

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

### 10. 现代工程化：从脚本到应用

现代前端项目已经不再只是几个 `<script>` 文件。

现在一个项目通常会包含：

- 多个 JS / TS 模块
- 多个组件
- CSS / 预处理器
- 图片和静态资源
- 第三方依赖
- 构建工具配置
- 开发服务器
- 代码分包和性能优化

前端工程化主要分为两大块：

1. 模块系统：通过 CommonJS、ES Module 等规范来组织代码，解决依赖管理和代码复用问题。
2. 构建工具：通过 Webpack、Rollup、Vite 等工具来分析模块依赖，打包优化代码，处理静态资源，提升开发效率和运行性能。

因此，JavaScript 的使用方式逐渐从HTML 页面中的几段脚本发展成围绕模块系统和构建工具组织的大型应用工程

下面这版是在你原有结构上优化的版本，主要修正了两个点：

1. `let / const` 不是“完全不会提升”，而是**会被创建，但不会初始化**，所以声明前访问会进入 TDZ。
2. “变量提升的作用”不要理解成“方便先使用后声明”，而是**执行上下文创建阶段必须先建立变量环境**。

---

## 三、var、let、const 与执行上下文

JavaScript 中常见的变量声明方式有三种：`var`、`let` 和 `const`。

理解它们时，可以结合**执行上下文**来看。JavaScript 执行一段代码时，并不是直接从第一行开始运行，而是会经历两个阶段：

1. **创建阶段**：创建执行上下文，建立变量环境和作用域关系。
2. **执行阶段**：按顺序执行代码，进行赋值、函数调用、表达式计算等操作。

因此，所谓的“变量提升”，本质上不是代码真的被移动了，而是：

> 在代码正式执行之前，JS 引擎已经先扫描并处理了当前作用域中的声明。

可以分为两个阶段来理解：

- 第一阶段：`var` 的变量提升和函数作用域
- 第二阶段：`let` / `const` 的块级作用域和暂时性死区

### 第一阶段 —— “老旧的” var

在早期 JavaScript 中，变量声明主要通过 `var` 完成。

`var` 声明的变量会被提升到当前作用域的顶部。这里的“当前作用域”主要指：

- 全局作用域
- 函数作用域

也就是说，无论你在函数内部哪个位置使用 `var` 声明变量，这个变量都会在函数执行前被创建，并且初始值是 `undefined`。

例如：

```js
function example() {
  console.log(a); // undefined
  var a = 10;
  console.log(a); // 10
}

example();
```

可以近似理解为：

```js
function example() {
  var a;
  console.log(a); // undefined
  a = 10;
  console.log(a); // 10
}
```

需要注意：

> `var` 提升的是“声明”，不是“赋值”。

所以：

```js
var a = 10;
```

可以拆开理解为：

```js
var a;
a = 10;
```

其中 `var a` 会在创建阶段处理，而 `a = 10` 仍然留在原来的位置，在执行阶段才执行。

#### 为什么要有变量提升？

变量提升并不是为了鼓励开发者“先使用，后声明”。

更准确地说，变量提升是因为 JavaScript 在执行代码之前，需要先创建执行上下文，并确定当前作用域中有哪些变量和函数。

它主要影响两个方面。

##### 1. 函数声明提升

函数声明会在执行前被创建，因此可以在声明之前调用。

```js
main();

function main() {
  console.log("start");
}
```

这使得开发者可以把主流程写在前面，把具体函数实现写在后面：

```js
main();

function main() {
  init();
  render();
}

function init() {
  console.log("init");
}

function render() {
  console.log("render");
}
```

这种行为在组织代码时是比较有实际意义的。

##### 2. 变量声明提升

变量声明提升更重要的作用，是让 JS 引擎在执行代码之前先确定变量的**归属关系**。

例如：

```js
var a = 1;

function foo() {
  console.log(a); // undefined
  var a = 2;
  console.log(a); // 2
}

foo();
```

这段代码中，`console.log(a)` 输出的是 `undefined`，而不是全局变量 `1`。

原因是：在 `foo` 函数执行前，JS 引擎已经发现函数内部有一个 `var a`，所以它会先在 `foo` 的函数作用域中创建一个局部变量 `a`。

可以近似理解为：

```js
var a = 1;

function foo() {
  var a;
  console.log(a); // undefined
  a = 2;
  console.log(a); // 2
}

foo();
```

所以这里的关键不是“JS 帮你提前使用变量”，而是：

> JS 在执行函数体之前，已经确定了当前函数内部有一个局部变量 `a`，因此不会再去外层作用域查找同名变量。

如果没有这个提前创建的过程，第一行 `console.log(a)` 可能会访问到全局变量 `a`，后面又出现局部变量 `a`，变量归属关系就会变得更加混乱。

因此，变量提升可以理解为执行上下文创建阶段的一部分：

> 先建立当前作用域的变量环境，再进入代码执行阶段。

#### var 的问题

`var` 的设计在早期比较简单，但随着应用复杂度提高，它的问题也越来越明显。

##### 1. 容易产生意外的 undefined

```js
console.log(count); // undefined
var count = 10;
```

这段代码不会报错，而是输出 `undefined`。这可能掩盖一些代码错误。

##### 2. 没有块级作用域

`var` 只有函数作用域，没有块级作用域。

```js
if (false) {
  var message = "hello";
}

console.log(message); // undefined
```

虽然 `if` 代码块没有执行，但 `var message` 的声明仍然会被提升到当前作用域中。

可以理解为：

```js
var message;

if (false) {
  message = "hello";
}

console.log(message); // undefined
```

这会让变量的作用范围比代码看起来更大。

##### 3. 容易造成全局变量污染

在全局作用域中使用 `var` 声明变量时，它会成为全局环境中的变量。

```js
var name = "Tom";
```

如果项目变大，多个脚本都往全局作用域中添加变量，就容易发生命名冲突。

### 第二阶段 —— “现代的” let 和 const

为了解决 `var` 的问题，ES6 引入了 `let` 和 `const`。

它们主要解决了三个问题：

- 减少变量提升带来的意外行为
- 引入块级作用域
- 降低全局变量污染和重复声明风险

#### let

`let` 用来声明可以重新赋值的变量。

```js
let count = 1;
count = 2;

console.log(count); // 2
```

#### const

`const` 用来声明常量。声明时必须初始化，并且之后不能重新赋值。

```js
const count = 1;
count = 2; // TypeError
```

需要注意，`const` 限制的是**变量绑定不能重新赋值**，不是对象内容完全不能修改。

```js
const user = {
  name: "Tom"
};

user.name = "Jerry"; // 可以修改对象内部属性

user = {}; // TypeError，不能重新赋值
```

#### 块级作用域

`let` 和 `const` 都具有块级作用域。

所谓块级作用域，就是变量只在当前代码块 `{}` 内有效。

```js
{
  let x = 10;
  const y = 20;

  console.log(x); // 10
  console.log(y); // 20
}

console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined
```

常见的代码块包括：

```js
if (true) {
  let a = 1;
}

for (let i = 0; i < 3; i++) {
  console.log(i);
}

{
  const message = "hello";
}
```

这让变量的作用范围更加清晰。

#### 暂时性死区 TDZ（Temporal Dead Zone）

`let` 和 `const` 也存在“提升”，但它们和 `var` 的提升方式不同。

`var` 在创建阶段会被初始化为 `undefined`，所以声明前访问不会报错，只会得到 `undefined`。

```js
console.log(a); // undefined
var a = 10;
```

但是 `let` 和 `const` 在创建阶段虽然也会被记录下来，但不会立即初始化。只有代码执行到声明语句时，变量才完成初始化。

因此，在声明语句之前访问变量，会进入暂时性死区，也就是 TDZ。

```js
console.log(a); // ReferenceError: Cannot access 'a' before initialization
let a = 10;
```

这说明：

> `let` / `const` 不是完全没有提升，而是提升后不能在声明前访问。

可以对比理解：

| 声明方式          | 是否提前创建 |            是否提前初始化 | 声明前访问结果          | 作用域           |
| ------------- | -----: | -----------------: | ---------------- | ------------- |
| `var`         |      是 | 是，初始化为 `undefined` | `undefined`      | 函数作用域 / 全局作用域 |
| `let`         |      是 |                  否 | `ReferenceError` | 块级作用域         |
| `const`       |      是 |                  否 | `ReferenceError` | 块级作用域         |
| `function` 声明 |      是 |         是，初始化为函数对象 | 可以调用             | 函数作用域 / 全局作用域 |

#### let / const 为什么更安全？

`let` 和 `const` 的设计目标不是完全取消变量提升，而是让变量声明更加符合直觉。

例如：

```js
console.log(total);
let total = 100;
```

这段代码会直接报错，提醒开发者：

> 你正在声明之前访问变量。

这比 `var` 输出 `undefined` 更容易发现问题。

再比如：

```js
if (true) {
  let message = "hello";
}

console.log(message); // ReferenceError
```

`message` 只存在于 `if` 代码块内部，不会泄漏到外部作用域。

### 执行上下文

执行上下文可以理解为：

JavaScript 代码运行时创建的“执行环境”。

当 JavaScript 执行一段代码时，引擎需要知道当前代码运行所需的信息，例如：

- 当前有哪些变量？
- 当前有哪些函数声明？
- 变量应该去哪里查找？
- this 指向什么？
- 当前代码执行完之后，应该回到哪里继续执行？

这些信息组合在一起，就形成了执行上下文。

例如：

```js
var a = 1;

function foo() {
  var b = 2;
  console.log(a, b);
}

foo();
```

这段代码执行时，大致会经历：

1. 创建全局执行上下文
2. 处理全局变量 a 和函数 foo
3. 执行全局代码
4. 调用 foo()
5. 创建 foo 函数的执行上下文
6. 执行 foo 函数内部代码
7. foo 执行完毕，函数执行上下文销毁
8. 回到全局执行上下文继续执行

也就是说：

**全局代码会创建全局执行上下文；每次函数调用，都会创建一个新的函数执行上下文。**

同时JavaScript 执行一段代码时，并不是直接从第一行开始运行，而是会分成两个阶段：

- 创建阶段:创建执行上下文，处理变量声明、函数声明、作用域关系和 this
- 执行阶段:按顺序执行代码，进行赋值、函数调用、表达式计算等操作

可以把执行上下文简单理解为：

执行上下文
├─ 变量环境：var、function
├─ 词法环境：let、const、块级作用域
├─ 外部环境引用：用于作用域链查找
└─ this 绑定

这里不用把规范细节记得太复杂，当前阶段只需要知道：

var、函数声明、let、const 都会在执行上下文创建阶段被处理，只是处理方式不同。

对，你这个章节如果是“整理思路”，就没必要把 `number / string / boolean` 这些基础类型逐个讲一遍。更适合写成：

1. 类型系统的整体特点
2. `number` 的 IEEE 754 与精度问题
3. `null / undefined / NaN` 这些特殊值
4. 隐式类型转换的核心规则
5. 原始值与对象引用
6. 垃圾回收与可达性

可以改成下面这版。

## 四、数据类型、类型转换与内存模型

JavaScript 是一门**动态类型语言**。变量本身没有固定类型，类型属于“值”，而不是属于“变量”。

```js
let value = "hello";
value = 123;
value = true;
```

因此，理解 JavaScript 的数据类型，不只是记住有哪些类型，更重要的是理解几个核心问题：

- `number` 为什么会有精度问题？
- `null`、`undefined`、`NaN` 这些特殊值有什么区别？
- 隐式类型转换为什么容易产生奇怪结果？
- 原始值和对象在内存模型上有什么不同？
- 垃圾回收是如何判断一个对象是否可以被清理的？

### 1. 类型分类

JavaScript 的数据类型可以分为两类。

| 分类   | 类型                                                               |
| ---- | ---------------------------------------------------------------- |
| 原始类型 | `number`、`bigint`、`string`、`boolean`、`null`、`undefined`、`symbol` |
| 引用类型 | `object`                                                         |

其中，数组、函数、日期、正则等都属于对象体系。

```js
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
console.log(typeof function () {}); // "function"
```

需要注意：

> `function` 的 `typeof` 结果是 `"function"`，但函数本质上仍然是对象体系中的一种特殊对象。

### 2. number 与 IEEE 754

JavaScript 中的普通数字都属于 `number` 类型，不区分整数和浮点数。

```js
let a = 10;
let b = 3.14;
```

`number` 使用的是 **IEEE 754 双精度浮点数**，也就是 64 位浮点数。

一个 `number` 大致可以理解为由三部分组成：

| 部分 | 作用 | 长度 |
| ---- | ---- | ------- |
| 符号位 | 表示正数或负数 | 1 位 |
| 指数位 | 表示数值范围 | 11 位 |
| 尾数位 | 表示有效精度 | 52 位 |

对于 **IEEE 754 双精度浮点数**，一个普通规格化数字的值是：

$$(-1)^s \times (1.f)_2 \times 2^{e - 1023}$$

其中：

| 部分 | 含义 |
| --------- | ----------------- |
| `s` | 符号位，0 表示正数，1 表示负数 |
| `e` | 指数位保存的值 |
| `1023` | 双精度浮点数的指数偏移量 |
| `(1.f)_2` | 尾数部分，前面的 `1` 是隐藏位，二进制表示 |

不过这只适用于**普通规格化数字**。

还有两个特殊情况：

| 指数位 | 含义 |
| --- | ----------------------- |
| 全 0 | 非规格化数字，隐藏位不是 `1`，而是 `0` |
| 全 1 | 表示 `Infinity` 或 `NaN` |

这带来两个重要结果。

第一个结果是：**小数计算可能不精确**。

```js
console.log(0.1 + 0.2);
// 0.30000000000000004
```

原因是很多十进制小数无法被二进制浮点数精确表示。

类似于十进制无法精确表示 `1 / 3`：

```js
1 / 3 = 0.333333...
```

二进制也无法精确表示某些十进制小数，例如 `0.1`、`0.2`。

所以在涉及金额、计费、精确小数计算时，不应该直接依赖普通浮点数。常见做法是：

```js
// 不推荐直接用元计算
0.1 + 0.2;

// 更常见的是转成整数单位，例如分
const price = 10; // 表示 0.10 元
const total = price * 3; // 30，表示 0.30 元
```

第二个结果是：**整数也有安全范围**。

JavaScript 能安全表示的最大整数是：

```js
console.log(Number.MAX_SAFE_INTEGER);
// 9007199254740991
```

也就是：

```js
2 ** 53 - 1
```

超过这个范围后，整数计算可能不再可靠。

```js
console.log(9007199254740991 + 1); // 9007199254740992
console.log(9007199254740991 + 2); // 9007199254740992
```

这是因为双精度浮点数的有效精度有限，超过安全整数范围后，某些整数无法被准确区分。

如果需要表示超大整数，可以使用 `bigint`。

```js
const big = 9007199254740993n;

console.log(big + 1n); // 9007199254740994n
```

不过 `bigint` 不能和 `number` 直接混合计算。

```js
console.log(1n + 1); // TypeError
```

需要先统一类型：

```js
console.log(1n + BigInt(1)); // 2n
```

### 3. NaN、Infinity 与特殊数值

`number` 类型中还有几个特殊值：

| 值           | 含义                     |
| ----------- | ---------------------- |
| `Infinity`  | 正无穷                    |
| `-Infinity` | 负无穷                    |
| `NaN`       | Not a Number，表示无效的数学结果 |

例如：

```js
console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log("hello" / 2); // NaN
```

`NaN` 有两个容易出错的点。

第一个是：`NaN` 不等于自身。

```js
console.log(NaN === NaN); // false
```

所以判断 `NaN` 不应该这样写：

```js
value === NaN
```

而应该使用：

```js
Number.isNaN(value)
```

第二个是：`NaN` 表示的是一次失败的数值计算结果，它本身仍然属于 `number` 类型。

```js
console.log(typeof NaN); // "number"
```

所以可以这样理解：

> `NaN` 不是“不是 number 类型”，而是 `number` 类型中的一个特殊值，表示计算失败。

### 4. null 与 undefined

`null` 和 `undefined` 都可以表示“没有值”，但语义不同。

| 值           | 含义             |
| ----------- | -------------- |
| `undefined` | 变量声明了，但还没有赋值   |
| `null`      | 主动表示这里没有对象或没有值 |

例如：

```js
let a;

console.log(a); // undefined
```

这里的 `undefined` 更像是系统默认状态。

而：

```js
let currentUser = null;
```

这里的 `null` 更像是开发者主动表达：

> 当前没有用户。

所以可以这样区分：

```js
let age; // 还没有赋值
let user = null; // 明确表示当前没有用户
```

另外有一个历史遗留问题：

```js
console.log(typeof null); // "object"
```

但 `null` 并不是对象，而是一个独立的原始类型。

判断 `null` 应该使用：

```js
value === null
```

### 5. Symbol 的作用

`symbol` 的核心特点是：**唯一性**。

```js
const a = Symbol("id");
const b = Symbol("id");

console.log(a === b); // false
```

即使描述相同，两个 `Symbol` 也是不同的值。

它常用于对象属性名，避免属性冲突。

```js
const id = Symbol("id");

const user = {
  name: "Tom",
  [id]: 1001
};

console.log(user[id]); // 1001
```

普通字符串属性可能和外部代码冲突，而 `Symbol` 属性天然唯一。

```js
user.id = 2002;

console.log(user[id]); // 1001
console.log(user.id); // 2002
```

这两个属性不是同一个。

### 6. 类型转换的核心规则

JavaScript 的类型转换可以分为：

| 类型   | 说明                                        |
| ---- | ----------------------------------------- |
| 显式转换 | 开发者主动调用 `Number()`、`String()`、`Boolean()` |
| 隐式转换 | 运算符或语句自动触发转换                              |

例如：

```js
Number("123");
String(123);
Boolean(0);
```

这是显式转换。

而：

```js
console.log("10" - 1); // 9
console.log("10" + 1); // "101"
```

这是隐式转换。

类型转换中最需要记住的是三类规则。

### 7. 转数字

数学运算通常会触发数字转换。

```js
console.log("6" / "2"); // 3
console.log("10" - 1); // 9
console.log("10" * 2); // 20
```

常见规则：

| 值           | 转数字结果 |
| ----------- | ----- |
| `undefined` | `NaN` |
| `null`      | `0`   |
| `true`      | `1`   |
| `false`     | `0`   |
| `""`        | `0`   |
| `"   "`     | `0`   |
| `"123"`     | `123` |
| `"123px"`   | `NaN` |

例如：

```js
console.log(Number(undefined)); // NaN
console.log(Number(null)); // 0
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number("")); // 0
console.log(Number("   ")); // 0
console.log(Number("123px")); // NaN
```

一个小点是：`Number()` 和 `parseInt()` 不一样。

```js
console.log(Number("123px")); // NaN
console.log(parseInt("123px")); // 123
```

`Number()` 要求整个字符串都能被转换成数字，而 `parseInt()` 会从字符串开头尽可能读取整数。

### 8. 转布尔值

布尔转换主要发生在条件判断中。

会被转为 `false` 的值只有这几个：

| 值           | 布尔转换    |
| ----------- | ------- |
| `false`     | `false` |
| `0`         | `false` |
| `""`        | `false` |
| `null`      | `false` |
| `undefined` | `false` |
| `NaN`       | `false` |

其他值基本都会被转为 `true`。

```js
console.log(Boolean("0")); // true
console.log(Boolean("false")); // true
console.log(Boolean(" ")); // true
console.log(Boolean([])); // true
console.log(Boolean({})); // true
```

容易错的是：

> 空数组 `[]` 和空对象 `{}` 都是真值。

因为它们本身是对象，对象在布尔转换中通常都是真值。

### 9. `+` 运算符的特殊性

`+` 是最容易引发隐式转换问题的运算符，因为它既可以做数字加法，也可以做字符串拼接。

```js
console.log(1 + 2); // 3
console.log("1" + 2); // "12"
console.log(1 + "2"); // "12"
```

只要 `+` 的一侧是字符串，通常就会触发字符串拼接。

```js
console.log(1 + 2 + "3"); // "33"
console.log("1" + 2 + 3); // "123"
```

因为表达式从左到右执行。

```js
1 + 2 + "3"
// 先得到 3
// 再变成 3 + "3"
// 结果是 "33"
```

```js
"1" + 2 + 3
// 先得到 "12"
// 再变成 "12" + 3
// 结果是 "123"
```

与 `+` 不同，`-`、`*`、`/` 通常会触发数字转换。

```js
console.log("10" - 1); // 9
console.log("10" * 2); // 20
console.log("10" / 2); // 5
```

### 10. `==` 与 `===`

`==` 会进行隐式类型转换。

```js
console.log(0 == false); // true
console.log("" == false); // true
console.log(null == undefined); // true
```

`===` 不会进行隐式类型转换，要求类型和值都相同。

```js
console.log(0 === false); // false
console.log("" === false); // false
console.log(null === undefined); // false
```

实际开发中一般优先使用 `===`。

一个常见例外是：

```js
value == null
```

它可以同时判断 `null` 和 `undefined`。

```js
console.log(null == null); // true
console.log(undefined == null); // true
console.log(0 == null); // false
console.log("" == null); // false
```

所以：

```js
if (value == null) {
  // value 是 null 或 undefined
}
```

这是一种比较常见的简写，但前提是你明确知道自己在使用 `==` 的特殊规则。

### 11. 原始值与对象的内存模型

JavaScript 中可以简单理解为：

> 原始值按值复制，对象按引用复制。

原始值复制的是值本身。

```js
let a = 10;
let b = a;

b = 20;

console.log(a); // 10
console.log(b); // 20
```

对象复制的是引用。

```js
const user1 = {
  name: "Tom"
};

const user2 = user1;

user2.name = "Jerry";

console.log(user1.name); // Jerry
```

因为 `user1` 和 `user2` 指向同一个对象。

对象比较时，比较的也是引用。

```js
const a = { name: "Tom" };
const b = { name: "Tom" };

console.log(a === b); // false
```

虽然内容一样，但它们是两个不同对象。

```js
const a = { name: "Tom" };
const b = a;

console.log(a === b); // true
```

这里 `a` 和 `b` 指向同一个对象，所以相等。

### 12. const 与对象

`const` 限制的是变量绑定不能重新赋值，不是对象内容不能修改。

```js
const user = {
  name: "Tom"
};

user.name = "Jerry"; // 可以

user = {}; // TypeError
```

可以理解为：

> `const` 固定的是变量指向的引用，而不是冻结对象本身。

如果要冻结对象第一层属性，可以使用：

```js
const user = Object.freeze({
  name: "Tom"
});
```

但 `Object.freeze()` 默认只冻结第一层。嵌套对象不会自动深度冻结。

### 13. 浅拷贝与深拷贝

浅拷贝只复制对象第一层。

```js
const user = {
  name: "Tom",
  address: {
    city: "Shanghai"
  }
};

const copy = {
  ...user
};

copy.name = "Jerry";
copy.address.city = "Beijing";

console.log(user.name); // Tom
console.log(user.address.city); // Beijing
```

原因是：

- `name` 是原始值，复制后互不影响
- `address` 是对象，浅拷贝后仍然共享同一个引用

如果需要复制嵌套结构，可以使用深拷贝。

```js
const copy = structuredClone(user);
```

但深拷贝不是无成本的，也不是所有对象都适合直接深拷贝。比如函数、DOM 节点、某些特殊对象就需要额外处理。

### 14. 函数传参

JavaScript 的函数参数传递，本质上都是**值传递**。

传递原始值时，复制的是原始值本身。

```js
function change(x) {
  x = 20;
}

let a = 10;
change(a);

console.log(a); // 10
```

传递对象时，复制的是对象引用这个值。

```js
function change(user) {
  user.name = "Jerry";
}

const obj = {
  name: "Tom"
};

change(obj);

console.log(obj.name); // Jerry
```

这里外部对象会被修改，是因为函数内部和外部变量指向同一个对象。

但如果在函数内部让参数指向新对象，不会改变外部变量。

```js
function change(user) {
  user = {
    name: "Jerry"
  };
}

const obj = {
  name: "Tom"
};

change(obj);

console.log(obj.name); // Tom
```

因为 `user` 只是函数内部的局部变量，重新赋值不会影响外部的 `obj`。

### 15. 垃圾回收与可达性

JavaScript 的内存管理主要由引擎自动完成。开发者通常不需要手动释放内存。

垃圾回收的核心判断标准是：

> 一个对象是否还能从根对象访问到。

如果一个对象无法再被访问到，它就会变成不可达对象，之后可能被垃圾回收。

```js
let user = {
  name: "Tom"
};

user = null;
```

当 `user = null` 后，原来的对象不再能通过 `user` 访问。如果没有其他引用指向它，它就可以被回收。

互相引用不代表一定不会被回收。

```js
let a = {};
let b = {};

a.friend = b;
b.friend = a;

a = null;
b = null;
```

虽然两个对象互相引用，但外部已经无法访问它们，所以它们整体仍然是不可达的。

常见的根对象包括：

- 全局变量
- 当前调用栈中的局部变量
- 当前正在执行的函数中的变量
- 引擎内部持有的一些对象

所以内存泄漏的本质通常是：

> 某个对象已经不需要了，但仍然被可达路径引用着。

常见场景包括：

```js
const cache = [];

function addData(data) {
  cache.push(data);
}
```

如果 `cache` 一直增长且不清理，就可能造成内存占用持续增加。

```js
const timer = setInterval(() => {
  console.log("running");
}, 1000);
```

如果定时器不再需要，应该清理：

```js
clearInterval(timer);
```

事件监听、订阅、缓存、闭包中长期保存的大对象，也都可能导致类似问题。

### 16. 小结

这一章重点不是记住每个类型的基础用法，而是理解几个核心模型：

| 主题                   | 核心理解                              |
| -------------------- | --------------------------------- |
| 动态类型                 | 变量没有固定类型，值才有类型                    |
| IEEE 754             | `number` 是双精度浮点数，所以有小数精度和安全整数范围问题 |
| `NaN`                | 属于 `number`，表示无效数值结果，并且不等于自身      |
| `null` / `undefined` | `null` 偏主动空值，`undefined` 偏默认未赋值   |
| 类型转换                 | 重点关注数字转换、布尔转换、`+`、`==`            |
| 原始值                  | 按值复制                              |
| 对象                   | 按引用复制，对象比较比较引用                    |
| 函数传参                 | 本质是值传递，对象传进去的是引用的副本               |
| 垃圾回收                 | 根据可达性判断对象是否可以被清理                  |


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
