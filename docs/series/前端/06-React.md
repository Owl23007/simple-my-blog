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

## 一、React 的定位与学习主线

React 是一个用于构建用户界面的 JavaScript 库。它的核心不是“写 HTML”，而是用组件和状态描述 UI。

你可以把 React 应用理解成下面这个过程：

```txt
状态变化
   ↓
组件函数重新执行
   ↓
生成新的 UI 描述
   ↓
React 对比前后差异
   ↓
最小化更新真实 DOM
```

学习 React 时，不要一开始就陷入 API 细节，而要围绕三个问题建立主线：

1. UI 是怎么被描述出来的？
2. 状态变化后，React 是怎么更新页面的？
3. 如何把复杂页面拆成可维护的组件和状态？

### React 学习分层

```txt
第一层：会用
组件、props、state、事件、列表、表单、Hooks

第二层：会组织项目
路由、请求、状态管理、组件拆分、TypeScript、样式方案

第三层：懂原理
虚拟 DOM、Fiber、Render/Commit、Hooks 闭包、Effect 时机、性能优化

第四层：能面试和做复杂项目
并发渲染、Suspense、Server Components、React Compiler、工程化架构
```

## 二、React 的核心心智模型

### 1. UI 是状态的函数

React 最重要的思想是：

```txt
UI = f(state)
```

也就是说，页面不是通过手动操作 DOM 拼出来的，而是由当前状态计算出来的。

例如：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      当前数量：{count}
    </button>
  );
}
```

这里的关键不是按钮，而是：

```txt
count = 0 → 页面显示 当前数量：0
count = 1 → 页面显示 当前数量：1
count = 2 → 页面显示 当前数量：2
```

页面由状态决定。状态变了，页面重新计算。

### 2. 声明式 UI

传统 DOM 写法更偏命令式：

```js
const button = document.querySelector("button");
button.innerText = "已提交";
button.disabled = true;
```

React 写法更偏声明式：

```jsx
<button disabled={isSubmitting}>
  {isSubmitting ? "提交中" : "提交"}
</button>
```

声明式的重点是：你描述“现在应该是什么样子”，而不是一步步命令浏览器“怎么变成这个样子”。

### 3. 单向数据流

React 默认强调单向数据流：

```txt
父组件 state
   ↓ props
子组件渲染
   ↓ 事件回调
通知父组件修改 state
   ↓
重新渲染子组件
```

示例：

```jsx
function Parent() {
  const [name, setName] = useState("React");

  return <Child name={name} onChangeName={setName} />;
}

function Child({ name, onChangeName }) {
  return (
    <div>
      <p>{name}</p>
      <button onClick={() => onChangeName("Vue")}>修改</button>
    </div>
  );
}
```

子组件不直接修改父组件状态，而是通过回调告诉父组件：“你该改了”。

## 三、JSX：不是模板，而是 JavaScript 的 UI 表达式

### 1. JSX 是什么

JSX 是一种 JavaScript 语法扩展，用来更直观地描述 UI。

```jsx
const element = <h1>Hello React</h1>;
```

它看起来像 HTML，但本质上会被编译成 JavaScript 调用。

早期可以理解为：

```jsx
<h1 className="title">Hello</h1>
```

近似编译为：

```js
React.createElement("h1", { className: "title" }, "Hello");
```

现代 React 使用新的 JSX transform，不一定需要手动引入 React，但本质仍然是把 JSX 转成 JavaScript 对象描述。

### 2. JSX 与 HTML 的区别

| HTML     | JSX         |
| -------- | ----------- |
| `class`  | `className` |
| `for`    | `htmlFor`   |
| 字符串属性    | 可以使用表达式     |
| 内联样式是字符串 | 内联样式是对象     |
| 事件小写     | 事件使用驼峰命名    |

示例：

```jsx
<label htmlFor="username">用户名</label>
<input
  id="username"
  className="input"
  style={{ color: "red", fontSize: 16 }}
  onChange={(event) => console.log(event.target.value)}
/>
```

### 3. JSX 中写表达式

JSX 中使用 `{}` 插入 JavaScript 表达式：

```jsx
function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.age >= 18 ? "成年人" : "未成年人"}</p>
    </div>
  );
}
```

注意：`{}` 里面是表达式，不是语句。

可以写：

```jsx
{count + 1}
{isLogin ? "已登录" : "未登录"}
{list.map(item => <li>{item.name}</li>)}
```

不能直接写：

```jsx
{if (isLogin) { ... }}
{for (...) { ... }}
```

因为 `if` 和 `for` 是语句，不是表达式。

## 四、组件：React 应用的基本组织单位

### 1. 函数组件

现代 React 主要使用函数组件。

```jsx
function Welcome() {
  return <h1>Hello React</h1>;
}
```

组件本质上是一个返回 UI 的函数。

```txt
props → Component → UI
```

### 2. 组件命名规则

组件名必须以大写字母开头：

```jsx
function UserCard() {
  return <div>用户卡片</div>;
}
```

使用时：

```jsx
<UserCard />
```

如果写成小写：

```jsx
<userCard />
```

React 会把它当作原生 HTML 标签，而不是组件。

### 3. 组件拆分原则

组件拆分不是越细越好，而是要围绕职责边界拆分。

常见拆分依据：

1. UI 结构重复：抽成展示组件。
2. 状态逻辑复杂：抽成容器组件或自定义 Hook。
3. 业务领域独立：按业务模块拆分。
4. 可复用性强：抽成通用组件。

示例结构：

```txt
src/
  pages/
    ProjectPage/
      index.tsx
      ProjectHeader.tsx
      ProjectList.tsx
      ProjectFilter.tsx
      useProjectList.ts
  components/
    Button/
    Modal/
    Input/
  hooks/
  utils/
  services/
```

### 4. 展示组件与容器组件

展示组件关注 UI：

```jsx
function UserListView({ users, onSelect }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id} onClick={() => onSelect(user)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
}
```

容器组件关注数据和状态：

```jsx
function UserListContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return <UserListView users={users} onSelect={console.log} />;
}
```

这样可以让 UI 和业务逻辑更容易维护。

## 五、Props 与 State：数据从哪里来，如何触发更新

### 1. Props

Props 是父组件传给子组件的数据。

```jsx
function App() {
  return <UserCard name="小明" age={20} />;
}

function UserCard(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.age}</p>
    </div>
  );
}
```

常用解构写法：

```jsx
function UserCard({ name, age }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{age}</p>
    </div>
  );
}
```

### 2. Props 是只读的

子组件不能直接修改 props。

错误示例：

```jsx
function UserCard({ user }) {
  user.name = "新名字";
  return <div>{user.name}</div>;
}
```

正确做法是通知上层修改：

```jsx
function UserCard({ user, onRename }) {
  return (
    <button onClick={() => onRename(user.id, "新名字")}>
      修改名称
    </button>
  );
}
```

### 3. State

State 是组件内部自己管理的数据。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

调用 `setCount` 后，React 不会立即直接改 DOM，而是安排一次更新，让组件重新执行，然后根据新的 UI 描述更新页面。

### 4. State 更新是替换，不是直接修改

对象和数组状态不能直接改原对象。

错误示例：

```jsx
const [user, setUser] = useState({ name: "小明", age: 18 });

user.age = 19;
setUser(user);
```

正确示例：

```jsx
setUser({
  ...user,
  age: 19,
});
```

数组更新：

```jsx
setTodos([...todos, newTodo]);

setTodos(todos.filter(todo => todo.id !== id));

setTodos(
  todos.map(todo =>
    todo.id === id ? { ...todo, done: true } : todo
  )
);
```

React 更推荐不可变更新，因为这样更容易判断数据是否变化，也更符合函数式 UI 的思路。

### 5. State 更新可能是异步批处理

下面的写法容易出错：

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

如果当前 `count` 是 0，最终可能只加到 1，因为三次读取到的都是同一次渲染中的 `count`。

更稳妥的写法：

```jsx
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
```

这种写法叫函数式更新，适合依赖旧状态计算新状态的场景。

## 六、事件系统与受控组件

### 1. React 事件写法

React 事件使用驼峰命名：

```jsx
<button onClick={handleClick}>点击</button>
```

不要写成：

```jsx
<button onclick="handleClick()">点击</button>
```

React 中通常传入函数引用：

```jsx
function handleClick() {
  console.log("clicked");
}

<button onClick={handleClick}>点击</button>
```

需要传参时：

```jsx
<button onClick={() => handleDelete(id)}>删除</button>
```

### 2. 受控组件

受控组件指表单值由 React state 控制。

```jsx
function LoginForm() {
  const [username, setUsername] = useState("");

  return (
    <input
      value={username}
      onChange={(event) => setUsername(event.target.value)}
    />
  );
}
```

数据流：

```txt
用户输入
   ↓
onChange 触发
   ↓
setUsername 更新 state
   ↓
组件重新渲染
   ↓
input 的 value 更新
```

受控组件的好处：

1. 表单值在 React 状态中，容易校验。
2. 可以实时联动其他 UI。
3. 提交时直接读取 state。
4. 方便重置、回填、禁用。

### 3. 非受控组件

非受控组件的值由 DOM 自己维护，React 通过 ref 读取。

```jsx
function UploadForm() {
  const inputRef = useRef(null);

  function handleSubmit() {
    console.log(inputRef.current.files);
  }

  return (
    <>
      <input ref={inputRef} type="file" />
      <button onClick={handleSubmit}>提交</button>
    </>
  );
}
```

适合场景：

1. 文件上传。
2. 第三方 DOM 库集成。
3. 不需要实时响应输入变化的简单表单。

## 七、条件渲染、列表渲染与 key

### 1. 条件渲染

使用三元表达式：

```jsx
{isLogin ? <UserInfo /> : <LoginButton />}
```

使用 `&&`：

```jsx
{error && <p className="error">{error}</p>}
```

注意：

```jsx
{count && <p>有数据</p>}
```

如果 `count` 是 0，页面可能会显示 `0`。更稳妥的写法：

```jsx
{count > 0 && <p>有数据</p>}
```

### 2. 列表渲染

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
```

### 3. key 的意义

`key` 用来帮助 React 判断列表中每一项的身份。

不要把 key 理解成“消除警告的东西”。它影响 React 如何复用组件和 DOM。

推荐：

```jsx
<li key={todo.id}>{todo.title}</li>
```

不推荐：

```jsx
<li key={index}>{todo.title}</li>
```

当列表会增删、排序、过滤时，使用 index 作为 key 容易造成状态错位。

例如：

```txt
原列表：A B C
每一项都有自己的输入框状态
删除 A 后：B C
如果 key 使用 index，React 可能把 A 的状态复用给 B
```

## 八、Hooks 总览与使用规则

Hooks 是 React 函数组件中使用状态、生命周期能力和其他 React 特性的方式。

常见 Hooks：

| Hook               | 作用             |
| ------------------ | -------------- |
| `useState`         | 声明局部状态         |
| `useReducer`       | 管理复杂状态逻辑       |
| `useEffect`        | 同步外部系统         |
| `useRef`           | 保存可变值或访问 DOM   |
| `useMemo`          | 缓存计算结果         |
| `useCallback`      | 缓存函数引用         |
| `useContext`       | 读取上下文          |
| `useTransition`    | 标记非紧急更新        |
| `useDeferredValue` | 延迟某个值的更新       |
| `useId`            | 生成稳定唯一 ID      |
| `useActionState`   | 管理 Action 提交状态 |
| `useOptimistic`    | 乐观更新 UI        |

### Hooks 规则

必须遵守两条核心规则：

1. 只能在组件顶层或自定义 Hook 顶层调用 Hook。
2. 不能在条件、循环、嵌套函数、事件回调中调用 Hook。

错误示例：

```jsx
function App({ visible }) {
  if (visible) {
    const [count, setCount] = useState(0);
  }

  return <div />;
}
```

正确示例：

```jsx
function App({ visible }) {
  const [count, setCount] = useState(0);

  if (!visible) {
    return null;
  }

  return <div>{count}</div>;
}
```

为什么不能条件调用 Hook？

React 需要依靠 Hook 的调用顺序把每个 Hook 和内部状态对应起来。

```txt
第一次渲染：useState A → useEffect B → useState C
第二次渲染：useState A → useState C
```

如果中间的 Hook 消失了，后面的状态位置就会错位。

## 九、useState：局部状态

### 1. 基本用法

```jsx
const [value, setValue] = useState(initialValue);
```

示例：

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### 2. 惰性初始化

如果初始值计算很重，可以传入函数：

```jsx
const [data, setData] = useState(() => {
  return expensiveInit();
});
```

这样 `expensiveInit` 只会在初次渲染时执行。

### 3. 多个 state 还是一个对象？

可以根据是否一起变化来判断。

适合拆开：

```jsx
const [name, setName] = useState("");
const [age, setAge] = useState(0);
const [loading, setLoading] = useState(false);
```

适合合并：

```jsx
const [form, setForm] = useState({
  username: "",
  password: "",
});
```

更新对象时：

```jsx
setForm(prev => ({
  ...prev,
  username: "new name",
}));
```

### 4. 状态提升

当多个兄弟组件需要共享同一份状态时，把状态提升到它们最近的共同父组件。

```jsx
function Parent() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      <Sidebar selectedId={selectedId} onSelect={setSelectedId} />
      <Detail selectedId={selectedId} />
    </>
  );
}
```

状态放在哪里，取决于谁需要它。

## 十、useReducer：复杂状态逻辑

当状态更新逻辑复杂，或者多个事件会修改同一份状态时，可以使用 `useReducer`。

### 1. 基本结构

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      <p>{state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}
```

### 2. useReducer 的优势

1. 把状态变化逻辑集中到 reducer 中。
2. 事件处理函数更干净。
3. 适合复杂表单、筛选器、编辑器、步骤流。
4. 更容易测试状态变化逻辑。

### 3. reducer 的要求

reducer 应该是纯函数：

```txt
相同 state + action → 相同 nextState
```

不要在 reducer 中做：

1. 请求接口。
2. 修改外部变量。
3. 操作 DOM。
4. 生成随机副作用。

错误示例：

```jsx
function reducer(state, action) {
  fetch("/api/save");
  return state;
}
```

正确思路：副作用放在事件、Effect 或 Action 层，reducer 只负责计算状态。

## 十一、useEffect：同步外部系统，而不是“生命周期替代品”

### 1. useEffect 的真实定位

`useEffect` 的作用是让组件和外部系统保持同步。

外部系统包括：

1. 浏览器 API。
2. 网络连接。
3. 定时器。
4. 事件监听。
5. 第三方库。
6. 手动操作 DOM 的逻辑。

它不是“只要想在渲染后执行代码就塞进去”的地方。

### 2. 基本用法

```jsx
useEffect(() => {
  document.title = `当前数量：${count}`;
}, [count]);
```

含义：当 `count` 变化后，把浏览器标题同步为新的值。

### 3. 依赖数组

```jsx
useEffect(() => {
  // effect body
}, [a, b]);
```

含义：当 `a` 或 `b` 和上一次渲染相比发生变化时，重新执行 Effect。

常见形式：

```jsx
useEffect(() => {
  // 每次渲染后执行
});

useEffect(() => {
  // 只在挂载后执行一次
}, []);

useEffect(() => {
  // a 或 b 变化后执行
}, [a, b]);
```

### 4. 清理函数

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(timer);
  };
}, []);
```

清理函数会在组件卸载前执行，也会在下一次 Effect 重新执行前先执行。

适合清理：

1. 定时器。
2. 事件监听。
3. WebSocket。
4. 订阅。
5. 第三方库实例。

### 5. 不要滥用 useEffect

错误思路：

```jsx
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(firstName + lastName);
}, [firstName, lastName]);
```

如果一个值可以直接由 props 或 state 计算出来，就不应该再存一份 state。

更好的写法：

```jsx
const fullName = firstName + lastName;
```

### 6. 请求数据的基本写法

```jsx
function UserPage({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadUser() {
      setLoading(true);
      const data = await fetchUser(userId);
      if (!ignore) {
        setUser(data);
        setLoading(false);
      }
    }

    loadUser();

    return () => {
      ignore = true;
    };
  }, [userId]);

  if (loading) return <p>加载中...</p>;
  if (!user) return null;

  return <div>{user.name}</div>;
}
```

`ignore` 用来避免旧请求返回后覆盖新状态。

实际项目中，常用 TanStack Query、SWR、React Router loader、Next.js 数据请求等方案减少手写请求 Effect。

## 十二、useRef：跨渲染保存可变值与访问 DOM

### 1. useRef 的特点

```jsx
const ref = useRef(initialValue);
```

返回对象：

```js
{ current: initialValue }
```

特点：

1. `ref.current` 可以被修改。
2. 修改 `ref.current` 不会触发重新渲染。
3. ref 对象在多次渲染之间保持稳定。

### 2. 访问 DOM

```jsx
function SearchBox() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>聚焦</button>
    </>
  );
}
```

### 3. 保存定时器 ID

```jsx
function Timer() {
  const timerRef = useRef(null);

  function start() {
    timerRef.current = setInterval(() => {
      console.log("tick");
    }, 1000);
  }

  function stop() {
    clearInterval(timerRef.current);
  }

  return (
    <>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
    </>
  );
}
```

### 4. useRef 与 useState 的区别

| 对比        | useState | useRef        |
| --------- | -------- | ------------- |
| 修改后是否重新渲染 | 会        | 不会            |
| 是否适合驱动 UI | 适合       | 不适合           |
| 是否跨渲染保存值  | 是        | 是             |
| 常见用途      | 页面状态     | DOM、定时器、缓存可变值 |

判断标准：

```txt
这个值变化后需要影响页面显示吗？
是 → useState
否 → useRef
```

## 十三、useMemo、useCallback、memo：缓存与性能优化

### 1. React 默认会重新执行组件函数

父组件更新时，子组件通常也会重新执行。

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>+</button>
      <Child />
    </>
  );
}
```

当 `count` 更新时，`Parent` 重新执行，`Child` 也会重新执行。

注意：重新执行组件函数不一定等于真实 DOM 被更新。React 仍然会对比结果后再决定是否修改 DOM。

### 2. memo

`memo` 可以让组件在 props 没变时跳过重新渲染。

```jsx
const UserCard = memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

适合：

1. 子组件渲染开销较大。
2. 子组件 props 比较稳定。
3. 父组件频繁更新。

不适合：

1. 组件很简单。
2. props 每次都是新对象或新函数。
3. 为了“看起来专业”到处套 memo。

### 3. useMemo

`useMemo` 用于缓存计算结果。

```jsx
const filteredList = useMemo(() => {
  return list.filter(item => item.name.includes(keyword));
}, [list, keyword]);
```

适合：

1. 昂贵计算。
2. 大列表过滤、排序、分组。
3. 需要保持对象引用稳定。

### 4. useCallback

`useCallback` 用于缓存函数引用。

```jsx
const handleSelect = useCallback((id) => {
  setSelectedId(id);
}, []);
```

它近似等价于：

```jsx
const handleSelect = useMemo(() => {
  return (id) => setSelectedId(id);
}, []);
```

常见用途：

1. 配合 `memo` 避免子组件因为函数引用变化而重新渲染。
2. 作为其他 Hook 的依赖时保持稳定。

### 5. 不要过度优化

错误做法：

```jsx
const title = useMemo(() => "hello", []);
const handleClick = useCallback(() => {}, []);
```

这类优化没有意义，反而增加理解成本。

建议顺序：

```txt
先写清楚
再通过 React DevTools Profiler 找慢点
最后针对性优化
```

### 6. React Compiler 趋势

React Compiler 的方向是让 React 在构建阶段自动进行 memoization，减少手动写 `useMemo`、`useCallback` 和 `memo` 的必要性。

但是学习阶段仍然需要理解这些 API，因为：

1. 旧项目大量存在手动优化代码。
2. 面试经常考。
3. 有些场景仍然需要精确控制。
4. 理解引用稳定性有助于理解 React 渲染。

## 十四、Context：跨层级共享状态

### 1. Context 解决什么问题

当一个数据需要传很多层时，会出现 props drilling：

```txt
App → Layout → Sidebar → UserMenu → Avatar
```

如果每一层只是帮忙转发 `user`，代码会很啰嗦。

Context 可以让深层组件直接读取上层提供的数据。

### 2. 基本用法

```jsx
const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>按钮</button>;
}
```

### 3. 适合放入 Context 的数据

1. 主题。
2. 登录用户。
3. 国际化语言。
4. 权限信息。
5. 全局配置。
6. 低频变化的全局状态。

### 4. 不适合滥用 Context

Context 不是万能状态管理。

如果 Context 中的 value 频繁变化，使用它的组件都可能受到影响。

例如：

```jsx
<AppContext.Provider value={{ mouseX, mouseY }}>
  <App />
</AppContext.Provider>
```

鼠标移动会导致大量组件更新，这不是好设计。

### 5. 优化 Context

可以拆分 Context：

```jsx
const UserContext = createContext(null);
const ThemeContext = createContext("light");
const PermissionContext = createContext([]);
```

也可以把数据和操作分离：

```jsx
const TodoStateContext = createContext(null);
const TodoDispatchContext = createContext(null);
```

## 十五、自定义 Hooks：复用状态逻辑

### 1. 自定义 Hook 是什么

自定义 Hook 是以 `use` 开头的函数，内部可以调用其他 Hooks。

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
```

使用：

```jsx
function App() {
  const size = useWindowSize();

  return <div>{size.width} x {size.height}</div>;
}
```

### 2. 自定义 Hook 复用的是逻辑，不是状态本身

如果两个组件都调用 `useWindowSize`，它们各自拥有自己的 Hook 状态。

```txt
ComponentA 调用 useWindowSize → A 的 state
ComponentB 调用 useWindowSize → B 的 state
```

Hook 不是全局单例。

### 3. 适合抽成自定义 Hook 的场景

1. 请求数据。
2. 订阅事件。
3. 表单逻辑。
4. 本地存储。
5. 权限判断。
6. 防抖节流。
7. 拖拽、滚动、尺寸监听。

### 4. 示例：useLocalStorage

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

使用：

```jsx
function Settings() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      当前主题：{theme}
    </button>
  );
}
```

## 十六、React 渲染流程：Render、Commit 与 Fiber

### 1. 一次更新的大致流程

```txt
触发更新
   ↓
调度更新
   ↓
Render 阶段：计算新的 UI 树
   ↓
Diff：比较新旧树差异
   ↓
Commit 阶段：把变化提交到真实 DOM
   ↓
浏览器绘制
```

### 2. Render 阶段

Render 阶段主要做：

1. 执行组件函数。
2. 生成新的 React Element 树。
3. 构建或更新 Fiber 节点。
4. 计算需要变更的地方。

这个阶段应该是纯的。

也就是说，不应该在组件函数体里直接写副作用：

```jsx
function App() {
  document.title = "hello";
  return <div />;
}
```

更好的写法：

```jsx
function App() {
  useEffect(() => {
    document.title = "hello";
  }, []);

  return <div />;
}
```

### 3. Commit 阶段

Commit 阶段主要做：

1. 修改真实 DOM。
2. 执行 ref 绑定。
3. 执行 layout effect。
4. 安排普通 effect。

Commit 阶段不能被中断，因为它会真实影响页面。

### 4. Fiber 是什么

Fiber 可以理解为 React 内部的一种数据结构，用来表示组件树中的一个工作单元。

它让 React 可以：

1. 把渲染工作拆分成小任务。
2. 暂停、继续、丢弃某些渲染工作。
3. 给不同更新分配不同优先级。
4. 支持并发渲染能力。

可以粗略理解为：

```txt
React Element：描述 UI 长什么样
Fiber：React 内部用于调度和更新的工作节点
真实 DOM：浏览器真正显示的节点
```

### 5. 虚拟 DOM 的意义

虚拟 DOM 不是为了“比 DOM 快”这个简单说法。

更准确地说，它的意义在于：

1. 用 JavaScript 对象描述 UI。
2. 让 UI 更新可以被声明式表达。
3. 给跨平台渲染提供抽象层。
4. 让 React 可以统一做 diff、调度和优化。

React 可以渲染到浏览器 DOM，也可以渲染到 React Native 的原生组件，本质上就是因为它把“UI 描述”和“具体平台操作”分开了。

## 十七、React 更新机制：批处理、优先级与并发思想

### 1. 批处理

React 会把多个状态更新合并到一次渲染中，减少不必要的重复更新。

```jsx
function handleClick() {
  setA(1);
  setB(2);
  setC(3);
}
```

这通常不会触发三次完整渲染，而是被批处理。

### 2. 紧急更新与非紧急更新

不是所有更新都一样重要。

例如：

```txt
输入框打字 → 紧急，必须立即响应
搜索结果列表过滤 → 可以稍微延后
页面跳转动画 → 应保持流畅
```

React 的并发能力允许把某些更新标记为非紧急。

### 3. useTransition

```jsx
function SearchPage({ items }) {
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    const value = event.target.value;
    setKeyword(value);

    startTransition(() => {
      setQuery(value);
    });
  }

  const filtered = items.filter(item => item.name.includes(query));

  return (
    <>
      <input value={keyword} onChange={handleChange} />
      {isPending && <p>更新中...</p>}
      <List items={filtered} />
    </>
  );
}
```

这里输入框的状态是紧急更新，列表过滤是非紧急更新。

### 4. useDeferredValue

`useDeferredValue` 可以让某个值的更新延迟反映到低优先级 UI。

```jsx
function SearchPage({ keyword }) {
  const deferredKeyword = useDeferredValue(keyword);

  return <SearchResult keyword={deferredKeyword} />;
}
```

适合搜索、大列表、预览区域等。

## 十八、表单处理与 React 19 Actions 思想

React 19 强化了 Actions 相关能力，重点是更自然地处理异步提交、pending 状态、错误状态和乐观更新。

### 1. 传统表单状态

```jsx
function Form() {
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      await updateName(name);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button disabled={pending}>提交</button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

这种写法没错，但状态管理比较繁琐。

### 2. useActionState

`useActionState` 可以把 action 执行后的结果变成状态。

```jsx
function UpdateNameForm() {
  const [state, formAction, isPending] = useActionState(
    async (previousState, formData) => {
      const name = formData.get("name");
      const result = await updateName(name);
      return result;
    },
    null
  );

  return (
    <form action={formAction}>
      <input name="name" />
      <button disabled={isPending}>提交</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
```

### 3. useOptimistic

乐观更新指：请求还没成功，先让 UI 看起来像成功了；如果失败，再回滚或提示。

适合点赞、评论、收藏、列表添加等场景。

```jsx
function CommentList({ comments, addComment }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newComment) => [
      ...currentComments,
      { id: "temp", text: newComment, sending: true },
    ]
  );

  async function formAction(formData) {
    const text = formData.get("comment");
    addOptimisticComment(text);
    await addComment(text);
  }

  return (
    <>
      <ul>
        {optimisticComments.map(comment => (
          <li key={comment.id}>
            {comment.text} {comment.sending && "发送中"}
          </li>
        ))}
      </ul>
      <form action={formAction}>
        <input name="comment" />
        <button>发送</button>
      </form>
    </>
  );
}
```

### 4. 学习建议

作为学生，先掌握传统受控表单和请求状态管理，再学习 Actions。因为项目和面试中，传统写法仍然大量存在。

## 十九、Suspense、use 与异步 UI

### 1. Suspense 是什么

Suspense 用来声明某块 UI 正在等待异步内容时应该显示什么。

```jsx
<Suspense fallback={<Loading />}>
  <UserProfile />
</Suspense>
```

当 `UserProfile` 内部发生挂起时，React 显示 `fallback`。

### 2. use 读取 Promise

React 的 `use` API 可以读取 Promise，并与 Suspense 和 Error Boundary 配合。

```jsx
function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <h1>{user.name}</h1>;
}
```

当 Promise 还没完成时，组件会挂起，由外层 Suspense 显示 loading。

### 3. Suspense 的意义

传统写法中，每个组件都要自己写：

```jsx
if (loading) return <Loading />;
if (error) return <Error />;
return <Content />;
```

Suspense 的方向是把异步等待变成 UI 树的一部分：

```jsx
<Suspense fallback={<Loading />}>
  <Content />
</Suspense>
```

这可以让异步边界更清晰。

## 二十、React Server Components 简介

React Server Components，简称 RSC，是一种可以在服务端环境中提前渲染的组件类型。

### 1. Client Component

客户端组件运行在浏览器中，可以使用：

1. useState。
2. useEffect。
3. 浏览器事件。
4. DOM API。

### 2. Server Component

服务端组件运行在服务端或构建环境中，适合：

1. 读取数据库。
2. 读取文件系统。
3. 访问后端资源。
4. 减少客户端 JavaScript 体积。

### 3. 基本差异

| 对比             | Client Component | Server Component |
| -------------- | ---------------- | ---------------- |
| 运行位置           | 浏览器              | 服务端或构建环境         |
| 能否使用 useState  | 可以               | 不可以              |
| 能否使用 useEffect | 可以               | 不可以              |
| 能否访问数据库        | 通常不直接访问          | 可以               |
| 是否增加客户端 JS     | 会                | 通常不会             |

### 4. 学习建议

如果你现在主要学习 React 基础和前端岗位，可以先把 RSC 当作进阶方向。

优先级：

```txt
组件 / Hooks / 状态 / 路由 / 请求 / TypeScript
   ↓
性能优化 / Suspense
   ↓
Next.js / Server Components
```

## 二十一、React Compiler 与自动优化趋势

React Compiler 是 React 生态的重要方向。它的目标是在构建阶段自动优化组件，减少手动 memoization。

### 1. 它解决什么问题

传统优化需要开发者手动写：

```jsx
memo(Component)
useMemo(() => compute(), [deps])
useCallback(() => handle(), [deps])
```

问题是：

1. 容易忘记优化。
2. 容易依赖写错。
3. 容易过度优化。
4. 代码可读性下降。

React Compiler 的方向是自动分析组件和 Hook，并自动应用合适的 memoization。

### 2. 学习者应该怎么理解

不要因为 React Compiler 就不学 `useMemo`、`useCallback`。

你应该掌握的是：

1. 为什么重新渲染会发生。
2. 什么是引用稳定性。
3. 什么情况下需要缓存。
4. 未来为什么可以交给编译器做一部分优化。

### 3. 写代码时的原则

```txt
保持组件纯净
不要在渲染期间做副作用
不要随意修改 props/state
依赖数组写完整
组件和 Hook 命名规范
```

这些习惯既有利于人工维护，也有利于编译器分析。

## 二十二、路由、请求、状态管理与项目结构

### 1. 路由

React 本身不内置路由。常见选择：

1. React Router。
2. Next.js App Router。
3. TanStack Router。

普通 SPA 项目常见结构：

```txt
src/
  main.tsx
  App.tsx
  routes/
    index.tsx
    dashboard.tsx
    project.tsx
  pages/
  components/
```

### 2. 请求层

不要在组件里到处散落请求地址。

不推荐：

```jsx
fetch("http://localhost:3000/api/user")
```

推荐封装：

```ts
// services/user.ts
export async function getUser(id: string) {
  const res = await request.get(`/users/${id}`);
  return res.data;
}
```

组件中使用：

```tsx
const user = await getUser(id);
```

### 3. 服务端状态与客户端状态

前端状态可以分成两类。

客户端状态：

```txt
弹窗是否打开
当前 tab
表单输入
主题
侧边栏折叠状态
```

服务端状态：

```txt
用户列表
文章详情
订单数据
搜索结果
项目列表
```

客户端状态适合用：

1. useState。
2. useReducer。
3. Context。
4. Zustand。
5. Redux。

服务端状态适合用：

1. TanStack Query。
2. SWR。
3. React Router loader。
4. Next.js 数据请求能力。

### 4. 为什么服务端状态不适合全都塞 Redux

服务端状态有这些特殊问题：

1. 请求中。
2. 请求失败。
3. 缓存。
4. 重新验证。
5. 分页。
6. 失效更新。
7. 乐观更新。

这些问题用专门的数据请求库处理更自然。

### 5. 推荐项目结构

适合学生项目和中小型前端项目：

```txt
src/
  app/
    App.tsx
    router.tsx
    providers.tsx
  pages/
    HomePage/
      index.tsx
      components/
      hooks/
    ProjectPage/
      index.tsx
      components/
      hooks/
  components/
    ui/
      Button.tsx
      Modal.tsx
      Input.tsx
    layout/
      AppShell.tsx
      Sidebar.tsx
  features/
    auth/
      api.ts
      hooks.ts
      types.ts
    project/
      api.ts
      hooks.ts
      types.ts
  hooks/
  services/
    request.ts
  utils/
  styles/
  types/
```

### 6. 页面、feature、component 的边界

| 目录              | 放什么             |
| --------------- | --------------- |
| `pages`         | 路由页面，负责组合模块     |
| `components/ui` | 通用 UI 组件，不关心业务  |
| `features`      | 业务模块，例如登录、项目、文章 |
| `hooks`         | 跨业务复用的 Hook     |
| `services`      | 请求实例、接口基础能力     |
| `utils`         | 纯工具函数           |

## 二十三、React + TypeScript 实战规范

### 1. 组件 Props 类型

```tsx
type UserCardProps = {
  name: string;
  age?: number;
  onSelect?: () => void;
};

function UserCard({ name, age, onSelect }: UserCardProps) {
  return (
    <div onClick={onSelect}>
      <h2>{name}</h2>
      {age !== undefined && <p>{age}</p>}
    </div>
  );
}
```

### 2. children 类型

```tsx
import type { ReactNode } from "react";

type CardProps = {
  title: string;
  children: ReactNode;
};

function Card({ title, children }: CardProps) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
```

### 3. 事件类型

```tsx
function Input() {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
  }

  return <input onChange={handleChange} />;
}
```

按钮事件：

```tsx
function Button() {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    console.log(event.currentTarget);
  }

  return <button onClick={handleClick}>点击</button>;
}
```

### 4. useState 类型推导

简单类型可以自动推导：

```tsx
const [count, setCount] = useState(0);
```

复杂类型建议显式声明：

```tsx
type User = {
  id: string;
  name: string;
};

const [user, setUser] = useState<User | null>(null);
```

数组：

```tsx
const [users, setUsers] = useState<User[]>([]);
```

### 5. useRef 类型

DOM ref：

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);

function focus() {
  inputRef.current?.focus();
}
```

定时器 ref：

```tsx
const timerRef = useRef<number | null>(null);
```

在浏览器项目中 `setInterval` 返回 number；在 Node 类型混入时可能出现类型差异，可以根据项目 tsconfig 调整。

### 6. API 类型

```ts
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type User = {
  id: string;
  name: string;
};

async function getUser(id: string): Promise<User> {
  const res = await request.get<ApiResponse<User>>(`/users/${id}`);
  return res.data.data;
}
```

## 二十四、样式方案与组件设计

### 1. 常见样式方案

| 方案           | 特点              |
| ------------ | --------------- |
| 普通 CSS       | 简单直接，容易全局冲突     |
| CSS Modules  | 局部 class，适合中小项目 |
| Sass/Less    | 增强 CSS 组织能力     |
| Tailwind CSS | 工具类优先，开发快       |
| CSS-in-JS    | 样式和组件逻辑结合       |
| UI 组件库       | 快速构建后台和业务系统     |

### 2. CSS Modules 示例

```tsx
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>按钮</button>;
}
```

```css
.button {
  padding: 8px 12px;
  border-radius: 6px;
}
```

构建后 class 会被转换成局部唯一名称，减少冲突。

### 3. 组件设计原则

一个好的组件应该：

1. Props 清晰。
2. 默认样式合理。
3. 可组合，而不是过度配置。
4. 不把业务逻辑写进通用组件。
5. 复杂交互暴露必要的事件回调。

### 4. Button 组件示例

```tsx
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### 5. 组合优于配置

不要把组件设计成这样：

```tsx
<Modal
  showHeader
  showFooter
  footerType="confirm"
  showCancel
  showClose
  contentType="form"
/>
```

更推荐组合：

```tsx
<Modal>
  <Modal.Header>标题</Modal.Header>
  <Modal.Body>
    <UserForm />
  </Modal.Body>
  <Modal.Footer>
    <Button>取消</Button>
    <Button variant="primary">确认</Button>
  </Modal.Footer>
</Modal>
```

组合式组件更灵活，也更符合 React 思想。

## 二十五、测试、调试与质量保障

### 1. 调试工具

常用工具：

1. React DevTools。
2. Browser DevTools。
3. Network 面板。
4. Performance 面板。
5. React Profiler。
6. TypeScript 类型检查。
7. ESLint。

### 2. React DevTools 看什么

1. 组件树。
2. props。
3. state。
4. hooks。
5. 哪些组件重新渲染。
6. Profiler 中的渲染耗时。

### 3. 测试类型

| 类型     | 关注点               |
| ------ | ----------------- |
| 单元测试   | 工具函数、reducer、Hook |
| 组件测试   | 用户交互后 UI 是否正确     |
| 集成测试   | 多个模块协作是否正确        |
| E2E 测试 | 从用户视角测试完整流程       |

### 4. 组件测试思想

测试不应该过度关心内部实现，而应该关心用户看到什么、做了什么。

示例思路：

```txt
渲染登录表单
输入用户名和密码
点击提交
期望按钮显示提交中
请求成功后跳转或显示用户信息
```

### 5. ESLint 的意义

React 项目中 ESLint 不只是格式化工具，它可以帮助你发现：

1. Hooks 规则错误。
2. Effect 依赖缺失。
3. 未使用变量。
4. 不安全写法。
5. TypeScript 风险。

## 二十六、性能优化清单

性能优化不要靠感觉，要先定位问题。

### 1. 渲染层优化

1. 避免不必要的 state 上移。
2. 拆分组件，缩小更新范围。
3. 合理使用 `memo`。
4. 合理使用 `useMemo` 和 `useCallback`。
5. 大列表使用虚拟滚动。
6. 输入与大计算分离，可用 `useTransition` 或 `useDeferredValue`。

### 2. 数据层优化

1. 请求缓存。
2. 分页加载。
3. 预加载关键数据。
4. 避免重复请求。
5. 乐观更新。
6. 后台重新验证。

### 3. 资源层优化

1. 路由懒加载。
2. 图片懒加载。
3. 代码分包。
4. 减少不必要依赖。
5. Tree shaking。
6. CDN 和缓存策略。

### 4. 代码层优化

1. 避免在 render 中做重计算。
2. 避免创建超大对象。
3. 避免深层组件都依赖频繁变化的 Context。
4. 避免 Effect 中循环触发 setState。
5. 使用稳定 key。

### 5. 常见性能问题示例

问题：输入框卡顿。

可能原因：

```txt
每次输入 → 更新 keyword → 过滤几万条数据 → 列表重新渲染
```

优化：

1. 用 `useMemo` 缓存过滤结果。
2. 用 `useDeferredValue` 延迟列表更新。
3. 用虚拟滚动只渲染可见区域。
4. 后端搜索而不是前端全量过滤。

## 二十七、常见错误与排查思路

### 1. 页面不更新

常见原因：直接修改了 state。

错误：

```jsx
todos.push(newTodo);
setTodos(todos);
```

正确：

```jsx
setTodos([...todos, newTodo]);
```

### 2. Effect 无限循环

错误：

```jsx
useEffect(() => {
  setUser({ name: "小明" });
}, [user]);
```

每次 setUser 都创建新对象，user 变化后又触发 Effect。

解决：

1. 检查依赖是否真的需要。
2. 避免在 Effect 中无条件更新依赖。
3. 能直接计算的值不要放 state。

### 3. 子组件总是重新渲染

可能原因：父组件每次都传新对象或新函数。

```jsx
<Child options={{ pageSize: 10 }} onClick={() => doSomething()} />
```

每次渲染都会创建新的对象和函数。

优化：

```jsx
const options = useMemo(() => ({ pageSize: 10 }), []);
const handleClick = useCallback(() => doSomething(), []);

<Child options={options} onClick={handleClick} />
```

但只有在 Child 使用了 `memo` 或确实存在性能问题时才有必要。

### 4. key 使用 index 导致状态错乱

当列表项内部有输入框、展开状态、动画状态时，index key 很容易导致错位。

解决：使用稳定唯一 id。

```jsx
items.map(item => <Item key={item.id} item={item} />)
```

### 5. 闭包读取旧状态

```jsx
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <div>{count}</div>;
}
```

这里 interval 闭包中的 `count` 一直是初次渲染的值。

正确：

```jsx
setCount(prev => prev + 1);
```

## 二十八、面试高频问题整理

### 1. React 为什么需要 key？

key 用来标识列表中元素的稳定身份。React 在 diff 列表时，会通过 key 判断哪些元素是新增、删除、移动或复用。如果 key 不稳定，可能导致 DOM 复用错误和组件状态错位。

### 2. useState 更新后为什么不能立刻拿到新值？

因为 state 是某次渲染的快照。调用 setState 是安排下一次渲染，不会改变当前这次渲染中的变量值。如果新状态依赖旧状态，应使用函数式更新。

### 3. useEffect 和 useLayoutEffect 区别？

`useEffect` 通常在浏览器绘制后执行，不阻塞绘制，适合请求、订阅、日志、定时器。

`useLayoutEffect` 在 DOM 更新后、浏览器绘制前同步执行，适合读取布局并同步修改布局的场景，但可能阻塞绘制，不能滥用。

### 4. useMemo 和 useCallback 区别？

`useMemo` 缓存计算结果。

```jsx
const value = useMemo(() => compute(a, b), [a, b]);
```

`useCallback` 缓存函数引用。

```jsx
const fn = useCallback(() => doSomething(a), [a]);
```

本质上，`useCallback(fn, deps)` 可以看作 `useMemo(() => fn, deps)`。

### 5. React.memo 有什么用？

`React.memo` 用于在 props 没变时跳过组件重新渲染。它适合渲染成本较高、props 稳定、父组件频繁更新的子组件。不应该无脑使用。

### 6. 受控组件和非受控组件区别？

受控组件的表单值由 React state 控制，适合校验、联动、回填。

非受控组件的值由 DOM 自己维护，React 通过 ref 读取，适合文件上传或简单表单。

### 7. 为什么不能在条件语句里使用 Hooks？

React 依赖 Hooks 的调用顺序来对应内部状态。如果条件调用 Hook，不同渲染之间 Hook 顺序可能变化，导致状态错位。

### 8. React diff 的基本思路？

React 不会做任意树之间的最优编辑距离计算，而是基于启发式策略：

1. 不同类型元素直接替换。
2. 同类型元素复用并更新属性。
3. 列表通过 key 辅助匹配。

这样把复杂度控制在可接受范围内。

### 9. Fiber 解决了什么问题？

Fiber 让 React 可以把渲染工作拆成多个工作单元，从而支持暂停、恢复、丢弃、优先级调度和并发渲染。它是 React 现代调度能力的重要基础。

### 10. Context 能不能替代 Redux？

Context 可以解决跨层级传值，但不是完整状态管理方案。它缺少中间件、调试工具、状态切片、异步流程约束等能力。对于低频全局数据，Context 很合适；对于复杂业务状态，需要结合 reducer、Zustand、Redux Toolkit 或其他方案。

## 二十九、学习路线与项目练习建议

### 第一阶段：React 基础

目标：能写普通页面。

必须掌握：

1. JSX。
2. 函数组件。
3. props。
4. useState。
5. 事件。
6. 条件渲染。
7. 列表渲染。
8. 表单。
9. useEffect。

练习项目：

1. Todo List。
2. 记账本。
3. 简单博客列表。
4. 登录注册页面。
5. 电影搜索页面。

### 第二阶段：React 项目能力

目标：能写完整 SPA 项目。

必须掌握：

1. React Router。
2. 请求封装。
3. loading/error 状态。
4. 组件拆分。
5. CSS Modules 或 Tailwind。
6. TypeScript。
7. 自定义 Hooks。
8. Context。

练习项目：

1. API 测试工具界面。
2. 后台管理系统。
3. 个人博客后台。
4. 在线笔记系统。
5. 文件管理系统前端。

### 第三阶段：进阶原理

目标：面试能讲清楚，遇到问题能排查。

必须掌握：

1. Render 和 Commit。
2. Fiber。
3. diff 和 key。
4. Hooks 闭包问题。
5. Effect 依赖。
6. memoization。
7. 批处理。
8. 并发渲染思想。

### 第四阶段：工程化与生态

目标：能做中大型项目。

建议学习：

1. Vite。
2. React Router。
3. TanStack Query。
4. Zustand 或 Redux Toolkit。
5. React Hook Form。
6. Zod。
7. Vitest。
8. Testing Library。
9. Playwright。
10. Next.js。

### 第五阶段：面向未来的 React

建议了解：

1. React 19 Actions。
2. useActionState。
3. useOptimistic。
4. useTransition。
5. Suspense。
6. use API。
7. Server Components。
8. React Compiler。

## 三十、推荐学习方式

### 1. 不要只看教程，要写小项目

每学一个概念都要配一个小功能。

例如：

| 概念         | 练习             |
| ---------- | -------------- |
| useState   | 计数器、tab 切换     |
| 表单         | 登录页、搜索框        |
| useEffect  | 请求用户列表         |
| useRef     | 自动聚焦、文件上传      |
| useMemo    | 大列表过滤          |
| Context    | 主题切换、登录用户      |
| useReducer | Todo 编辑器、表单状态机 |

### 2. 学 React 要经常问自己三个问题

1. 这个状态应该放在哪里？
2. 这个组件为什么会重新渲染？
3. 这个 Effect 是否真的必要？

### 3. 项目里最重要的不是炫技

学生项目最容易犯的问题是：技术很多，但边界混乱。

一个好的 React 项目应该做到：

1. 页面结构清晰。
2. 组件职责明确。
3. 请求封装统一。
4. 类型定义完整。
5. 状态来源可追踪。
6. 错误和 loading 状态完整。
7. 代码可以被别人读懂。

## 三十一、最终知识地图

```txt
React
├─ UI 描述
│  ├─ JSX
│  ├─ Component
│  └─ Props
│
├─ 状态管理
│  ├─ useState
│  ├─ useReducer
│  ├─ Context
│  ├─ 自定义 Hooks
│  └─ 外部状态库
│
├─ 副作用
│  ├─ useEffect
│  ├─ useLayoutEffect
│  ├─ 请求
│  ├─ 订阅
│  └─ DOM 操作
│
├─ 渲染原理
│  ├─ React Element
│  ├─ Virtual DOM
│  ├─ Fiber
│  ├─ Render 阶段
│  ├─ Commit 阶段
│  └─ Diff
│
├─ 性能优化
│  ├─ memo
│  ├─ useMemo
│  ├─ useCallback
│  ├─ useTransition
│  ├─ useDeferredValue
│  └─ 虚拟列表
│
├─ 工程化
│  ├─ Vite
│  ├─ Router
│  ├─ TypeScript
│  ├─ 请求封装
│  ├─ 样式方案
│  ├─ 测试
│  └─ 目录结构
│
└─ 现代能力
   ├─ Actions
   ├─ useActionState
   ├─ useOptimistic
   ├─ Suspense
   ├─ Server Components
   └─ React Compiler
```

## 三十二、你应该达到的表达水平

学完这份笔记后，面试里你应该能这样表达：

> React 的核心是声明式 UI 和组件化。组件根据 props 和 state 返回 UI 描述，状态变化后 React 会重新执行组件函数，在 Render 阶段计算新的树并进行 diff，在 Commit 阶段把变化提交到真实 DOM。Hooks 让函数组件拥有状态、副作用、ref、缓存等能力，但必须保持稳定调用顺序。实际项目中，要区分客户端状态和服务端状态，合理拆分组件、封装请求、处理 loading/error，并在性能瓶颈明确时使用 memoization、并发特性或虚拟列表优化。

这段话就是你学习 React 的主线。后面所有 API 和生态工具，都可以放回这条主线里理解。
