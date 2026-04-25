---
title: "JavaScript 中的 Array、Uint8Array 和 bitSet"
date: 2026-04-25
description: "记录一下 JavaScript 中的 Array、Uint8Array 和 bitSet 数据结构，比较了它们的特点和使用场景。"
tags:
  - JavaScript
---
# JavaScript 中的 `Array`、`Uint8Array` 和 `bitSet` 底层原理与工程选型

在进行算法的练习与日常开发中，我们常常需要使用布尔数组来标记元素的状态。在 JavaScript 中，常见的选择有：

1. **普通数组**：`Array(n).fill(false)`
2. **类型化数组**：`Uint8Array(n)`
3. **位压缩实现**：自定义 `BitSet` 类
4. **Set/Map**: 适合稀疏场景
5. **BigInt**: 适合极大规模位图

每种方法内部的数据结构都不一致，下面整理了它们的底层原理、性能对比和适用场景。

## 数据结构洞悉

### Array(n).fill(false)

`Array` 作为 JavaScript 的内置对象，一般的 `Array` 是一个动态数组，底层实现通常是一个连续的内存块，存储着元素的引用。对于 `Array(n).fill(false)`，每个元素都是一个布尔值 `false` 的引用。

声明一个长度为 `n` 的一位数组，并用 `false` 填充：`Array(n).fill(false)`，会创建一个长度为 `n` 的数组，并将每个元素初始化为 `false`。这种方法的内存占用较大，因为每个元素都是一个独立的布尔值对象。

也可以快速的建立二维数组：`Array.from({ length: m }, () => Array(n).fill(false))`，这会创建一个 `m x n` 的二维数组，每个元素都是 `false`。

其内存结构分为在栈上的数组对象和在堆上的布尔值对象。其内存可以看为：
![Array内存结构示意图](.\assets\Array内存结构示意图.png)
