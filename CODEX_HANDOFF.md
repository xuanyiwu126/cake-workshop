# 蛋糕小工具项目交接说明

## 项目

- GitHub 仓库：`https://github.com/xuanyiwu126/rednote`
- 项目目录：`cake-secret-tool/`
- Mac 本地目录：`/Users/sanxuanyi/Desktop/rednote`
- 本地项目目标目录：`/Users/sanxuanyi/Desktop/rednote/cake-secret-tool/`

## 本地 Codex 开始工作前

```bash
cd /Users/sanxuanyi/Desktop/rednote
git pull origin main
```

当前项目包含：

- `cake-secret-tool/index.html`：页面结构
- `cake-secret-tool/styles.css`：响应式样式
- `cake-secret-tool/app.js`：蛋糕绘制、制作步骤、双模式、撤销恢复、留言和彩蛋动画
- `cake-secret-tool/given-you-a-piece-cake.zip`：可上传的小红书离线小工具包
- `cake-secret-tool/standalone.html`：桌面浏览器可直接打开的单文件版本

## 当前产品设计

页面有两种模式：

1. 做给朋友：亲手制作蛋糕，写一句话，切开后发送给朋友
2. 做给自己：选择一句温暖的话，做一块只留给自己的蛋糕

制作流程：选择蛋糕胚 → 选择奶油 → 添加装饰 → 写隐藏留言 → 预览切开动画。

已加入的温暖句子包括：

- 亲爱的，这个世界在不停开花
- 好状态随着春醒
- 上坡要努力，下坡要开心
- 喜欢自己比喜欢世界重要
- 草木蔓发，春山可望
- 先有自我才有机缘
- 你永远是自由的盛夏
- 凡事发生皆有利于我

## 最近已修复

- 顶部安全区留白，避免与手机时间、电量和状态栏重合
- 去除 Logo 下方英文副标题
- 去除页面英文标题和多余英文字符
- 去除标题末尾句号和重复操作提示
- 修复首屏画布空白问题：调整首屏异常处理与 Canvas 绘制缩放
- 最后一步去掉原来的 01、02、03 介绍列表
- 重新生成并审计 ZIP

## 验证

```bash
node --check cake-secret-tool/app.js
python3 .codex/skills/minitool-zip-builder/scripts/audit_artifact.py cake-secret-tool/given-you-a-piece-cake.zip
```

当前验证结果：JavaScript 语法通过，ZIP 自动审计通过，ZIP 根目录有 `index.html`，包内仅有 `index.html`、`app.js`、`styles.css`。

## 继续修改时的要求

- 修改后同时更新 GitHub `main` 分支
- 本地 Mac 目录通过 `git pull origin main` 同步
- 不要覆盖根目录原有的 `index.html`
- 蛋糕工具的入口始终保持在 `cake-secret-tool/index.html`
- 小红书 ZIP 必须从 `cake-secret-tool` 目录内部压缩，不能多套一层目录
- 离线小工具不能引用外部网络资源
- 移动端优先检查顶部安全区、画布可见性、触摸拖动、弹层和长文本

## 当前限制

当前远程 Codex 无法直接访问 Mac 的 `/Users/sanxuanyi/Desktop/rednote`。因此，GitHub 是远程修改源，本地 Codex 需要在 Mac 上执行 `git pull` 完成同步。

