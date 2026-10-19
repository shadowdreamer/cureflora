# CureFlora · Agent 工作指南

更新：2026-10-18。本文描述当前已实现的项目，适用于后续维护。

## 项目目标

CureFlora 是以花卉与自然影像为主题的编辑式照片墙落地页。保留奶油底色、莓果红文字和日文问候，用错落构图、GSAP 视差和 Lenis 平滑滚动引导浏览。内容为视觉演示，不将图库照片描述为原创作品，不虚构品牌经历。

## 当前技术栈

- Nuxt 4.6.2、Vue 3.5.44、Vue Router 5.4.0。
- Vue SFC 使用 Pug 3.0.4、`<script setup lang="ts">`；语言插件 3.3.13。
- GSAP 3.15.0 + ScrollTrigger、Lenis 1.3.27。
- Nuxt Image 2.1.0，图片为本地 WebP，静态生成时输出响应式尺寸。
- 原生 CSS 与 CSS Grid；已移除 Tailwind、SCSS 和 mitt，避免不再使用的依赖。
- TypeScript 5.9.3、vue-tsc 3.3.13，严格类型检查覆盖 Pug 与项目引用。
- pnpm 9.11.0；Node 要求 `^22.22.3 || ^24.15.0 || >=26.0.0`。版本来自本次包注册表核对，未来升级需重新核实。

## 实际目录

```text
app/
  app.vue
  assets/css/main.css
  components/landing/
    SiteHeader.vue
    HeroSection.vue
    PhotoWall.vue
    PhotoCard.vue
    PhotoLightbox.vue
    SiteFooter.vue
  composables/usePhotoWallMotion.ts
  data/photos.ts
  data/pixiv-artworks.js
  layouts/default.vue
  pages/index.vue
  pages/about.vue
  plugins/motion.client.ts
  types/photo.ts
public/
  photos/                       17 张本地 WebP 插画及保留的原图
  favicon.svg
  robots.txt
  sitemap.xml
nuxt.config.ts
package.json
pnpm-lock.yaml
```

根目录原型中的 KV、Shutter、useLenis 和事件总线已删除，旧版空目录、`public/images/` 历史插画、`assets/cursor/` 光标、旧 favicon.ico、重复图片类型声明与空 server 配置也已清理。日语按用户指定使用根目录 `assets/fonts/FOT-Pearl_Std_L.woff`。`public/photos/` 的 17 张 JPG/PNG/JFIF 素材已使用 FFmpeg（libwebp、quality 85、compression_level 6）转为同名 WebP，保留原始尺寸和原图。16 张图片以文件名开头的数字记录 artworkNumber；无数字编号的图片仅记录原文件名，不推测编号。

## 页面与交互

- `/links`：导航「関連リンク」进入的链接页面，目前仅放置二维码图鉴链接。手机导航分两行展示品牌和全部导航入口。
- `/qr-catalog.html`：独立静态二维码图鉴，原始 HTML 保存在 `public/qr-catalog.html`，包含 20 个二维码及放大、PNG 下载和打印功能。通过 `/links` 页中的原生链接进入，完整加载文档内脚本与样式。

- 大字号文案使用日语和用户指定的 FOT Pearl 字体。主标题为「咲きほこる花のプリンセス！」；中段宣言为「冷たい檻に閉ざされた夢、返して頂きますわ!お覚悟はよろしくて?」；照片墙和页脚强调「強く　優しく　美しく」。保留这些指定句子的原始文字与标点，按语义断行，不替换成英文宣传语。

- `/`：品牌导航、大字号 Hero、视觉日记介绍、17 张错落插画墙、结束语及页脚。
- `/about`：KV 使用 `public/photos/GKzSRHeagAAWDmH.webp`（666×900，由同名 PNG 经 FFmpeg 转换，原图保留），桌面标题与插画并排、手机上下排列，完整展示画面；其后为介绍与图片来源链接，`#credits` 可直达来源列表。
- `#collection`：照片墙锚点。灯箱支持鼠标、触屏、左右方向键、Esc 和关闭按钮。
- 灯箱使用原生 modal dialog：打开后焦点进入、键盘焦点限制在对话框内，关闭后回到触发卡片。打开期间暂停 Lenis 并锁住背景滚动。
- 桌面采用宽窄交错的十二列网格；手机为两列。DOM 顺序与键盘顺序一致。
- 视觉采用奶油纸色、柔玫瑰与鼠尾草绿。照片卡片的 `.photo-mat` 使用 `public/ornaments/lace.svg` 的重复九宫格边框，保持不同尺寸下蕾丝针脚比例；装饰不接收指针事件，图片按钮仍负责灯箱交互。手机缩小花边并增加列间距。
- 照片内四角使用 `public/ornaments/inner-corner.svg` 奶油白与淡金藤蔓镶边，通过 `.photo-inlay` 的四个镜向旋转角饰覆盖在图片上，随卡片缩放但不随图片悬停放大；对辅助技术隐藏且不接收指针事件。
- `.photo-wall-stage` 内的 `LandingWallRibbon` 使用三条淡玫瑰与金色 SVG 贝塞尔曲线贯穿照片墙背景，随网格实际高度伸展、保持描边粗细，首尾淡出；装饰独立分层、不参与网格、不接收指针事件，也不增加动画或滚动监听。
- Hero 桌面采用左文右图双栏构图，标题与简介共用左侧对齐轴；右侧主图采用柔和拱形、细线外框和柔玫瑰纯色底衬，无投影及图片渐变遮罩，图注置于画面下方，六出花点缀右上角。相框约 4:3，宽度同时受可用列宽与屏幕高度约束；768px 及以下按标题、插画、简介排序，首屏完整显示。中段叶形线条与页脚弧线延续童话剪贴簿风格；保留现有指定日文字体与文案。
- 网站图标 `public/favicon.svg` 为百合花；页头、Hero、中段、结束语和页脚的花形点缀统一使用 `LandingAlstroemeria` 六出花 SVG 组件，以 currentColor 继承配色，装饰对辅助技术隐藏。
- Hero 按用户要求保持静态，不再设置入场透明度、位移或滚动视差，避免揭幕后文字闪动。标题、主图和留白按 svh 与屏幕宽度共同缩放，导航与 KV 在常规手机、平板及桌面尺寸内一屏呈现；保留错落标题、花饰及拱形相框。照片墙使用可逆的轻阻尼上浮入场：以不移动的 `.photo-card` 为触发器，同时移动其 `[data-photo-float]` 相框和标题；向下滚从正 y 位移回到 0，进入视窗中下部后落位，向上滚反向退回。桌面 scrub 为 0.4 秒、手机为 0.3 秒且降低位移；与既有 GSAP ticker 共用驱动，不降低帧率、不排队播放、不增加滚轮监听，不逐帧测量布局。
- 系统启用减少动态效果时，不创建视差与入场动画，不初始化 Lenis；运行时切换也需生效。

## 动画与生命周期约定

1. `motion.client.ts` 是唯一 Lenis 所有者和 ScrollTrigger 注册入口。一个 GSAP ticker 驱动一个 Lenis，时间由秒转成毫秒，不启用第二套 autoRaf。
2. 不恢复 `window.lenis`，不让页面重复创建或销毁全局滚动实例。
3. `usePhotoWallMotion` 在组件挂载后创建以页面根元素为 scope 的 GSAP context，并用 matchMedia 管理断点与动态效果偏好。
4. 页面卸载必须 revert media/context，断开 ResizeObserver，取消尚未执行的帧回调。插件卸载或热更新时解绑 ticker、媒体监听和路由钩子。
5. 优先 transform/opacity；禁止为每张图长期 pin、每帧 refresh、大面积 blur 或全局 DOM 选择器串扰。
6. 页面默认可读；不设置永久隐藏的初始样式，不用手工 DOM remove 删除 Vue 节点。按用户指定，首次访问使用柔玫瑰纯色全屏 Loading，文案为「Princess Engage」，以波浪边缘从下往上揭幕。`LoadingScreen.vue` 等待指定字体及首屏高优先级图片解码（最多 4 秒，普通动态效果最短 900ms），随后升幕；减少动态效果时直接退出。入口 head 脚本启用遮罩并在 7.5 秒后兜底移除启用类，无脚本不显示遮罩。加载时页面 inert、暂停 Lenis，结束后恢复。`intro-ready` 仅控制首次进入，路由往返不重播；`usePhotoWallMotion` 在揭幕后初始化，卸载时取消等待与动画。
7. Lenis 的锁定状态必须在动态效果偏好改变时保留；灯箱卸载也必须恢复滚动状态。

## 数据与模板约定

- `app/data/photos.ts` 管理本地图库与尺寸；`app/data/pixiv-artworks.js` 集中记录 16 个 Pixiv 编号、真实标题、副标题、完整纯文本说明、作者与原作链接（2026-10-17 从公开作品接口读取）。副标题取说明首个非空行，说明为空时留空。photos.ts 按 artworkNumber 合并作品元数据，页面不重复维护标题；模型位于 `app/types/photo.ts`。图片 id 稳定，保留原始尺寸、准确 alt、标题、备注、originalFilename 与可选 artworkNumber/sourceUrl。详情弹窗和 About 页均不显示作品 ID 或原文件名，编号仅保存在数据中用于关联与原作链接；照片墙仅显示标题和副标题，不显示顺序号、作品 ID、画师名字或编号链接；弹窗位置使用数组索引。heroPhoto 复用图库数据，首页与 OG 图片不单独写死路径。
- 使用两个空格缩进的 Pug 与 Vue 指令。响应式循环使用 v-for 和稳定 key，不使用 Pug 编译期循环。
- Pug 属性中的动态字符串优先字符串拼接，避免预处理器与模板字面量发生冲突。
- 卡片使用 button，路由使用 NuxtLink，锚点使用原生链接；不让无语义 div 承担交互。
- 卡片与 Hero 使用 NuxtImg：Hero eager/high priority，其余 lazy；容器预留比例，错误时显示替代信息。灯箱直接读取本地 WebP 原图，避免静态部署时请求未预渲染的动态 IPX 尺寸。
- 图片数据记录原图宽高，视觉裁切交给 CSS object-fit，不伪造图片原始尺寸。
- 新增样式继续使用现有 CSS 变量和媒体查询，不引入第二套样式框架。
- 新增状态、事件和模板引用明确类型，不用 any 或全局事件总线绕过组件边界。

## SEO、素材与边界

- SSR 输出实际内容，每页一个 h1，不把整页放进 ClientOnly。
- 生产域名为 `https://www.cureflora.com/`。`runtimeConfig.public.siteUrl` 默认使用此域名（不含末尾斜线），可用 `NUXT_PUBLIC_SITE_URL` 覆盖。标题、description、canonical、OG URL 与 OG/Twitter 图片由布局与页面管理，页面地址不含查询参数或锚点，分享图片使用绝对地址。`public/robots.txt` 允许抓取并指向 `public/sitemap.xml`；站点地图列出 `/`、`/about`，新增页面或变更生产域名时同步更新。
- 当前插画由用户提供，16 个编号已从 https://www.pixiv.net/artworks/{id} 对应的公开作品信息核对标题、说明与作者。图片旁仅显示标题与副标题；作者和 Pixiv 原作链接保留在详情内，外链使用新标签页和 noopener noreferrer。无编号的 GmWmxRua8AAmebf.jfif 来源仍未确认，不推测作者或链接，不声明为原创或 Unsplash 素材。外部说明仅以纯文本插值渲染，不使用 v-html。
- 全站统一使用 `--font-body` 字体栈，优先通过 @font-face 加载 `assets/fonts/FOT-Pearl_Std_L.woff`，保留 font-display: swap。缺失的英文字形依次回退到 Iowan Old Style、Palatino Linotype、Book Antiqua、Palatino，再回退到 Georgia、Times New Roman；日文字形保留游明朝等系统回退，最终使用 serif。导航、按钮、正文、标题和灯箱均使用同一字体栈，不另引入网络字体，不替换用户提供的 FOT 字体。
- 不默认添加账户、后台、上传、支付、数据库、搜索或无限滚动。

## 开发和验证

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm build
pnpm generate
```

`pnpm typecheck` 先生成 Nuxt 类型，再使用 vue-tsc --build 检查全部引用。Nuxt prepare 的 hook 把 Pug 语言插件写入生成配置，不能只在根 tsconfig 写插件然后忽略引用项目。

Windows 环境若系统 Node 太旧，可使用项目忽略目录 `.tools/node_modules/node/bin` 中的独立运行时；它不属于项目源码。推荐正常开发环境安装满足 engines 的 Node 后直接执行上述命令。需要本地构建验证时，`build` 与 `generate` 顺序执行，避免并发覆盖输出。

后续涉及界面或滚动逻辑时，验证 375/768/1440px、键盘灯箱、图片加载失败、路由往返、动态效果偏好运行时切换和无脚本基本阅读。浏览器模拟触屏不能替代真实设备手感验证，交付时据实说明。

## 自动部署约定

用户已配置 master 分支的自动部署，生产站点为 `https://www.cureflora.com/`。后续不需要关心发布：只负责代码维护和必要的本地验证，不执行手动发布、上传、Sites 打包或部署状态跟踪，不调整既有自动部署流程。除非用户另行明确要求，不开展发布工作。

## 官方参考

- https://nuxt.com/docs/4.x/getting-started/upgrade
- https://vuejs.org/api/sfc-spec.html
- https://gsap.com/docs/v3/GSAP/gsap.context()/
- https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- https://github.com/darkroomengineering/lenis


