# 云朵捏捏机

一个面向小红书小工具方向的移动端 H5 体验原型。

## 当前版本

阶段 A / 核心体验原型，重点验证：

- 手指拖拽云朵边缘进行局部拉伸、挤压
- 撤回最近操作
- 「再揉一下」随机产生轻微形变
- 根据轮廓提供 3 个联想方向：趴着的猫、面包、漂浮小岛
- 保留用户原始云朵轮廓，并追加少量线条完成补画
- 生成云朵编号、目击地点和结果文案
- 返回调整 / 再捏一朵

## 手机测试

推荐通过 GitHub Pages 打开，不要直接在手机文件管理器里预览 `index.html`。

仓库 Settings → Pages：

1. Build and deployment 选择 `Deploy from a branch`
2. Branch 选择 `main`
3. Folder 选择 `/ (root)`
4. 保存后使用 GitHub Pages 生成的网址，在 Safari / Chrome 中打开

## 技术实现

- 单文件 HTML / CSS / JavaScript
- Canvas 2D 绘制和补画
- Pointer Events + Touch Events 兼容兜底
- `touch-action: none` 避免拖动时页面滚动抢占手势
- 无后端、无 CDN、无外部网络依赖

## 当前范围

这是体验原型，不是最终正式版本。当前只保留 3 个形态，用于优先验证「捏云手感」和「补画后的惊喜感」。后续再扩展更多形态、结果卡、动效、声音和小红书容器适配。
