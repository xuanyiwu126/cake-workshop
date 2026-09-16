<h1 align="center">Cake Workshop · 蛋糕工坊</h1>

<p align="center">
  <strong>Craft a cake. Hide a little feeling. Slice open a surprise.</strong><br>
  做一块蛋糕，把一份心意藏进去。
</p>

中文说明：[README.zh-CN.md](README.zh-CN.md)

一个面向手机的 Canvas 互动体验：装饰蛋糕，把文字或照片藏进礼物，再通过拆礼盒、切蛋糕的仪式感揭晓并分享。

## Highlights

- 多种蛋糕形状、口味、奶油和装饰，支持触摸操作、撤销/恢复、缩放和调整视角
- 将文字、手绘内容或原图照片藏入蛋糕
- 拆礼盒、彩纸礼花、切开揭晓的分享视频，以及高清图片笔记
- Cake Cabinet：本地保存、查看、再次分享或移除作品
- 离线优先：无后端、无 CDN、无外部运行时依赖

## Try it locally

```bash
git clone https://github.com/yjshen126/cake-workshop.git
cd cake-workshop
python3 -m http.server 8000
```

然后打开 <http://localhost:8000>。

## Project structure

```text
index.html  styles.css  app.js
assets/  data/  docs/  dist/
```

## License

[MIT License](LICENSE) © 2026 Xuanyi Wu
