---
title: HTTPS 的证书配置
description: 记录一下对 HTTPS 的证书配置的来时路
tags: [HTTPS, 证书]
date: 2025-11-24
author: 沃以
---

# 从腾讯云免费证书迁移到 Certbot：一次 HTTPS 自动化之旅

https 在我印象中，一直是一个收费昂贵的解决方案，阿里云上动辄300 元/年，对于我来说，这太贵了。在24年的时候，和室友一起参加了 中国大学生计算机设计大赛。为了能在公网访问我们的项目，我在腾讯云上申请了免费的 SSL 证书，后来用于我的个人博客网站。

虽然是手动的，配置nginx 在windows服务器上使用，但总算是实现了 https。

> 值得一提的是，这个大学生计算机设计大赛中南赛区的评判中，根本没有访问我们的网站就随便给了个分数，太让我生气了...🤒

但服务器本身的成本昂贵，2h2g 腾讯云一年要 99 元，还是在我承受的范围内。在2h2g的服务器上使用windows系统，实在是太吃力了。后来我把服务器换成了 ubuntu 系统，重新配置了 Nginx。

但你知道的 linux 的一切操作都是命令行，平凡的 shell 命令行操作实在是太繁琐了，与此同时，在google的推进下，https证书的有效期被缩短到了90天。每次证书到期前，我都得登录腾讯云控制台，重新下载、上传、重载 Nginx 服务。

于是，在25年重启博客网站的途中，与其再试图获取腾讯云接口，再写脚本来实现自动化，不如彻底迁移到 **Certbot + Let's Encrypt** 方案，实现真正的一键部署、自动续期。

这个博客就是记录一下 Certbot 的使用方法，以及如何实现自动化。

## 迁移前准备

我的服务器环境：

- Ubuntu 22.04 LTS
- Nginx 作为反向代理
- 域名已正确解析到服务器公网 IP
- 80 和 443 端口已在腾讯云安全组开放

确保站点可通过 `http://your-domain/.well-known/acme-challenge/` 临时路径被外网访问（Certbot 验证域名所有权必需）。

## 安装 Certbot

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

## 获取并自动配置证书

执行以下命令，Certbot 会自动检测 Nginx 配置中的 `server_name`，并完成证书申请与 HTTPS 配置：

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

::: tip
如果这里你像我一样，同时配置了 domain.com 和 <www.domain.com> 两个域名，请确保两个域名都已经正确解析到服务器 IP，否则会申请失败。
:::

过程中会提示：

- 输入邮箱（用于证书到期提醒）
- 同意 Let's Encrypt 服务条款
- 是否将 HTTP 请求自动重定向到 HTTPS（强烈建议选 **2：自动重定向**）

完成后，Nginx 配置会自动更新，新增 SSL 相关指令，并设置 301 重定向。

## 验证自动续期

Let's Encrypt 证书有效期为 **90 天**，但 Certbot 会通过 systemd timer 或 cron 自动续期。可手动测试续期流程：

```bash
sudo certbot renew --dry-run
```

如果输出显示成功，说明自动续期机制已正常工作。

## 总之

作为开发者，我越来越体会到：**“能自动化的绝不手动，能开源的绝不闭源”**。这一次小小的迁移，也让我少了不少的麻烦。

> 2025 年 11 月 24 日 · 于武汉 · 沃以
