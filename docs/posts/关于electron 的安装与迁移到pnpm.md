---
title: "Electron 踩坑记：从 npm 迁移到 pnpm"
description: "记录一次由 npm 迁移到 pnpm 过程中遇到的坑及解决方案，特别是针对 Electron 项目的特殊需求"
date: 2025-11-26
tags: [Electron, pnpm, 开发日志]
---

# Electron 踩坑记：从 npm 迁移到 pnpm

最近心血来潮，想把手头的一个 Electron 项目从 npm 迁移到 pnpm。毕竟 pnpm 省空间、速度快，还能避免幽灵依赖，听起来就很香。

结果没想到，这一迁，直接迁进了坑里。折腾了一晚上，总算是把环境跑通了，这里记录一下，希望能帮到同样遇到问题的读者们。

## 为什么要从 npm 迁到 pnpm

其实 npm 也没啥大毛病，就是 `node_modules` 实在是太占地了。pnpm 的内容寻址存储机制能省下不少磁盘空间，而且安装速度确实快。

但是，Electron 这位"大爷"比较娇贵，跟 pnpm 默认的非扁平化目录结构有点八字不合。

## 坑一：找不到模块

迁移完依赖，兴冲冲地 `pnpm start`，结果直接报错，说找不到某个模块。

查了一圈文档才发现，pnpm 默认是把依赖藏在深层目录里的（为了避免幽灵依赖），但 Electron 打包或者运行的时候，有时候就是傻傻地只在第一层找。

**解决办法**：

在项目根目录建个 `.pnpmrc` 文件，内容如下：

```ini
# 将 pnpm 变成扁平化架构，虽然牺牲了一点 pnpm 的特性，但为了 Electron 能跑，忍了
node-linker=hoisted

# 顺便把镜像源也配上，不然下载 Electron 二进制包能等到天荒地老
electron_mirror="https://npmmirror.com/mirrors/electron/"
```

配完这个，记得把 `node_modules` 删了重新 `pnpm install` 一下。

## 坑二：Electron 二进制包下不下来

解决了依赖路径问题，又迎来了老朋友——网络超时。

```text
Error: Electron failed to install correctly, please delete node_modules/electron and try installing again
```

看着这个报错就头大。虽然配了镜像源，但有时候脚本识别或者网络波动，还是会下载失败。

### 终极解决办法：手动挡

既然自动下载不靠谱，那就手动来。

1. **自己下包**：直接去 [github](https://github.com/electron/electron/releases) 找对应版本的 zip 包（比如 `v38.0.0` 的 win32-x64 版本）。
2. **解压**：把下载好的 zip 包解压到 `node_modules/electron/dist` 目录里。
3. **关键一步**：修改 `path.txt`。

在 `node_modules/electron/` 下面有个 `path.txt` 文件，它的作用是告诉 Node.js 真正的 `electron.exe` 在哪。

你需要把内容改成 `electron.exe`。

**注意！这里有个巨坑**：这个文件必须是 **UTF-8 无 BOM** 格式。如果你用 Windows 自带的记事本保存，很可能会带上 BOM，导致 Node.js 读出来的路径前面多一串乱码，然后继续报错。

##### 一键脚本

为了防止下次再踩坑，我写了个 [PowerShell 脚本](https://github.com/Owl23007/Linx/blob/develop/scripts/unzip-electron.ps1)，一键处理解压和配置 `path.txt` 的问题。

:::details 脚本内容

```powershell
param([string]$ZipPath)

if ([string]::IsNullOrEmpty($ZipPath)) {
    Write-Host "请输入已下载的 electron zip 包的完整路径:" -ForegroundColor Cyan
    $ZipPath = Read-Host "ZipPath"
}

# 去除路径两端的引号
$ZipPath = $ZipPath.Trim('"').Trim("'")

if (-not (Test-Path $ZipPath)) {
    Write-Host "错误: 文件不存在: $ZipPath" -ForegroundColor Red
    exit 1
}

Write-Host "使用的 Electron 包: $ZipPath" -ForegroundColor Cyan

Write-Host "Step 1: 清理旧的 electron..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "node_modules\electron" -ErrorAction SilentlyContinue
Write-Host "完成" -ForegroundColor Green

Write-Host "Step 2: 创建 electron 骨架目录..." -ForegroundColor Yellow
$ElectronVersion = Read-Host "请输入 Electron 版本 (例如 38.0.0)"
if ([string]::IsNullOrEmpty($ElectronVersion)) {
    $ElectronVersion = "38.0.0"
    Write-Host "未输入版本，使用默认版本: $ElectronVersion" -ForegroundColor DarkGray
}
pnpm add electron@$ElectronVersion --save-dev --ignore-scripts
Write-Host "完成" -ForegroundColor Green

Write-Host "Step 3: 解压 electron 包..." -ForegroundColor Yellow
$distPath = "node_modules\electron\dist"
Remove-Item -Recurse -Force $distPath -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Path $distPath -Force | Out-Null
Expand-Archive -Path $ZipPath -DestinationPath $distPath -Force
Write-Host "完成" -ForegroundColor Green

Write-Host "Step 4: 设置 path.txt..." -ForegroundColor Yellow
$pathTxtFile = "node_modules\electron\path.txt"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($pathTxtFile, "electron.exe", $Utf8NoBom)
Write-Host "完成" -ForegroundColor Green

Write-Host "Step 5: 重新构建原生模块..." -ForegroundColor Yellow
pnpm electron-rebuild
Write-Host "完成" -ForegroundColor Green

Write-Host "成功! 现在运行: pnpm start" -ForegroundColor Green
```

复制并保存为 `unzip-electron.ps1`，然后在 PowerShell 里运行上面的脚本就行

```powershell
.\unzip-electron.ps1
```

:::

## 最后

搞定完这些，别忘了运行一下 `pnpm electron-rebuild`，把那些原生模块（比如 `better-sqlite3` 之类的）重新编译一下，确保它们能跟你的 Electron 版本对上号。

::: tip
如果在这里 `pnpm electron-rebuild` 报错，检查一下`electron-rebuild` 的依赖版本是不是太低了。可以尝试升级 `electron-rebuild`：

```bash
pnpm add electron-rebuild@latest --save-dev
```

升级后，再运行 `pnpm electron-rebuild`
:::

这时候再 `pnpm start`，世界终于清静了。

迁移工具链这种事，本来以为是"一键升级"，结果往往是"一键重构"...
