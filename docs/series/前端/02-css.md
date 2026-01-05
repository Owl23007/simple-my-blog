---
title: CSS 的知识体系
description: css 的布局革命与性能优化
tags: [CSS]
date: 2026-01-04
---

# 📐 CSS 的知识体系：布局革命与性能优化

在我们用html写出一个简单的网页后，往往发现界面的元素往往遵循其默认的样式设置，不仅不好看，而且往往杂乱无章。

CSS (Cascading Style Sheets 层叠样式表) 是用来描述 HTML 文档外观和格式的样式语言。通过 CSS，我们可以控制网页的布局、颜色、字体、间距等视觉效果，从而提升用户体验和界面美感。

下面我们将由浅入深的深入 CSS 的世界。

## **一、基础语法与选择器**

### 1. **CSS 语法结构与引入方式**

CSS 的基本语法由 **选择器（Selector）** 和 **声明块（Declaration Block）** 构成：

```css
selector {
  property: value;
  property: value;
}
```

**引入 CSS 到 HTML 的三种方式：**

- **内联样式**（Inline）：直接写在 HTML 元素的 `style` 属性中（不推荐，维护性差）。

```html
  <p style="color: red;">文本</p>
 ```

- **内部样式表**（Internal）：在 `<head>` 中使用 `<style>` 标签。

```html
  <style>
    p { color: red; }
  </style>
```

- **外部样式表**（External）：通过 `<link>` 引入独立 `.css` 文件（推荐，可复用、易维护）。

```html
  <link rel="stylesheet" href="style.css">
```

---

### 2. **基础选择器**

- **元素选择器**（Type Selector）：选中所有指定 HTML 标签。

```css
  p { /* 所有 <p> 元素 */ }
```

- **类选择器**（Class Selector）：以 `.` 开头，选中具有指定 `class` 的元素（可复用）。

```css
  .highlight { /* 所有 class="highlight" 的元素 */ }
```

- **ID 选择器**：以 `#` 开头，选中 `id` 唯一的元素（页面中应唯一）。

```css
  #header { /* id="header" 的元素 */ }
```

- **通配符选择器**（Universal Selector）：`*` 匹配所有元素（慎用，性能较低）。

```css
  * { margin: 0; padding: 0; }
```

### 3. **复合与伪类/伪元素选择器**

- **复合选择器**：组合多个选择器实现更精确匹配。
  - 后代选择器：`div p`（div 内所有 p）
  - 子选择器：`div > p`（div 的直接子 p）
  - 相邻兄弟：`h1 + p`
  - 通用兄弟：`h1 ~ p`

- **伪类选择器**（Pseudo-classes）：描述元素的**状态**。
  ```css
  a:hover    /* 鼠标悬停 */
  li:nth-child(2) /* 第二个子元素 */
  input:focus /* 获得焦点时 */
  ```

- **伪元素选择器**（Pseudo-elements）：创建**不在文档中的虚拟内容**。
  ```css
  p::before   /* 在 p 内容前插入内容 */
  p::first-line /* 选中第一行 */
  ::selection   /* 选中文本的样式 */
  ```
  > 注意：伪元素使用 **双冒号 `::`**（CSS3 标准），但为兼容旧代码，单冒号 `:` 仍被支持。

---

### 4. **选择器优先级与层叠规则（Cascading）**

当多个规则作用于同一元素时，浏览器通过 **层叠（Cascading）** 决定最终样式，核心依据是 **优先级（Specificity）** 和 **来源顺序**。

#### **优先级计算（从高到低）**
| 类型 | 权重（近似值） |
|------|----------------|
| `!important` | 最高（应避免滥用） |
| **内联样式** | 1000 |
| **ID 选择器** | 100 |
| **类、属性、伪类** | 10 |
| **元素、伪元素** | 1 |
| **通配符、继承** | 0 |

> 示例：
> `#nav .item:hover` → 100 (ID) + 10 (class) + 10 (pseudo-class) = **120**

#### **层叠规则（Cascading Order）**
若优先级相同，则按以下顺序决定胜出者：
1. **来源顺序**：后出现的样式覆盖先出现的（在相同文件或引入顺序下）。
2. **来源类型**：用户自定义样式 < 作者样式（开发者写的） < 浏览器默认样式（但 `!important` 可打破顺序）。
3. **继承**：部分属性（如 `color`, `font`）会从父元素继承，但优先级极低。

> 💡 **最佳实践**：
> - 尽量使用类选择器，避免过度依赖 ID 或 `!important`。
> - 保持选择器简洁（如 `.btn-primary` 而非 `div#sidebar ul li a.button`）。

---

这一部分构成了 CSS 的“语法地基”。掌握它，你就能精准地选中元素并为其赋予样式，为后续布局与交互打下坚实基础。

## **二、盒模型与视觉格式化**

- 标准盒模型 vs 怪异盒模型（`box-sizing`）
- 外边距合并（Margin Collapsing）
- 可视化格式模型：inline / block / inline-block
- 定位体系：static / relative / absolute / fixed / sticky

## **三、布局核心机制**

- 浮动（Float）与清除（Clear）
- BFC（块级格式化上下文）原理与应用
- 行内格式化上下文（IFC）简介
- 多列布局（Columns）

## **四、现代布局引擎**

- Flexbox 布局（一维）
- Grid 布局（二维）
- Flex vs Grid 使用场景对比
- 响应式布局策略组合（Flex + Grid + 定位）

## **五、响应式与适配**

- 媒体查询（Media Queries）
- 移动优先 vs 桌面优先
- 视口单位（vw/vh/vmin/vmax）
- 容器查询（Container Queries）
- 响应式图像（`<picture>`, `srcset`）

## **六、视觉样式与图形绘制**

- 背景与边框（渐变、圆角、多重背景）
- **CSS 绘制技巧：三角形、箭头、图标等**
- 阴影（`box-shadow` / `text-shadow`）
- 裁剪与遮罩（`clip-path`, `mask`）
- 滤镜（`filter`）与混合模式（`mix-blend-mode`）

## **七、CSS 动画体系**

- 过渡（`transition`）
- 关键帧动画（`@keyframes` + `animation`）
- 动画性能原理（合成层、`will-change`）
- **高性能动画实践：仅用 `transform` 与 `opacity`**
- 动画控制（暂停、反向、延迟、贝塞尔曲线）

## **八、CSS 变量与模块化**

- 自定义属性（CSS Variables）
- 作用域与继承机制
- 与 JavaScript 交互
- CSS 模块化方案（BEM、CSS Modules、Scoped CSS）

## **九、渲染性能优化**

- 重绘（Repaint） vs 回流（Reflow / Layout）
- 合成（Compositing）与图层提升
- 避免布局抖动（Layout Thrashing）
- 性能分析工具（Chrome DevTools）

## **十、前沿与扩展能力**

- CSS Houdini 概览
  - Properties & Values API
  - Paint API（自定义绘制）
  - Animation Worklet
- CSS 嵌套（Nesting）草案
- 容器样式查询（`@container style()`）
- `:has()` 选择器与父级匹配
