# CureFlora

一个花卉与自然主题的视觉日记落地页：编辑式大字号排版、错落照片墙、GSAP 滚动视差、Lenis 平滑滚动与可键盘操作的灯箱。

## 技术栈

Nuxt 4.6.2 · Vue 3.5.44 · Pug 3.0.4 · GSAP 3.15.0 · Lenis 1.3.27 · Nuxt Image 2.1.0。

## 开始开发

需要 Node `^22.22.3 || ^24.15.0 || >=26.0.0` 和 pnpm 9.11.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## 检查与构建

```sh
pnpm typecheck
pnpm build
pnpm generate
```

以上构建命令供需要时使用，本次按要求只交付本地项目，不继续构建或发布。未来站点域名可通过 `NUXT_PUBLIC_SITE_URL` 配置，未配置时不输出生产 canonical。

## 内容和结构

- 首页：`app/pages/index.vue`。
- 关于与图片来源：`app/pages/about.vue`。
- 图库数据：`app/data/photos.ts`；替换图片时同步 alt、原始宽高与来源。`app/data/pixiv-artworks.js` 集中查看和维护编号、Pixiv 标题、副标题、说明、作者与链接。
- 动画：`app/plugins/motion.client.ts` 统一管理 Lenis；`app/composables/usePhotoWallMotion.ts` 管理页面视差与清理。
- 样式：`app/assets/css/main.css`；日语使用 `assets/fonts/FOT-Pearl_Std_L.woff`，英文使用系统字体。
- 系统启用减少动态效果后，视差、入场动画和平滑滚动自动停用。

图库现为用户提供的 17 张插画，已用 FFmpeg 转为 WebP 并保留原始图片。`app/data/photos.ts` 记录原文件名、原始尺寸与文件名开头的数字编号；编号和原文件名仅保存在数据中，不在照片墙、详情或 About 页展示。16 个编号的标题、说明和作者已从 Pixiv 读取（2026-10-17），副标题使用作品说明首个非空行；图片旁展示相关信息，详情可跳转原作。无编号图片保留原文件名，来源未确认。

维护约定见 [agent.md](agent.md)。Sites 项目标识与静态目录记录在 `.openai/hosting.json`。
