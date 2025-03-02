---
title: 個人WEBをAstro + Fuwariで書き直しました
published: 2025-02-28
description: '個人WEBをAstro + Fuwariで書き直しました'
image: './fuwari.png'
tags: [Astro, Tailwind CSS, Fuwari]
category: 'Web Site'
draft: false 
lang: 'ja'
prevSlug: "oh-my-posh"
prevTitle: "Oh My PoshでWindows Terminalをカスタマイズする(備忘録)"
---

個人WEBをTailwind CSSで書き直して約半年...  
また、書き直してしまいました...

今回は今ホットなAstroで個人WEBをリメイクしました。

テンプレートはAstro公式サイトでビビッと来た`Fuwari`を使用しました。  
デザインがとても良く、かゆいところにも手が届いており無料で利用できることに驚いています。

https://astro.build/themes/details/fuwari/

# Astroとは

Astroは、 **静的サイトジェネレーター（SSG）とサーバーレンダリング（SSR）** の両方をサポートする、次世代のフロントエンドフレームワークです。軽量で高速なWebサイトを構築することを目的とし、 **コンテンツ中心のWebサイト（ブログ、ドキュメント、マーケティングサイトなど）** に最適です。

表示も早いですが、体感ビルドも早い気がします。

また、Astroは **Markdown（.md）とMDX（.mdx）** をネイティブサポートしており、ブログやドキュメントサイトの構築が容易です。

https://astro.build/

# Fuwariとは

FuwariはAstroの[Themes](https://astro.build/themes/)で公開されているブログテンプレートの1つです。  
Fuwariのリポジトリで右上の`Use this template`をクリックすることで自分のリポジトリに複製することが出来ます。

- AstroとTailwind CSSで設計
- Swupで設計されたスムーズなアニメーションとページ遷移
- ライト / ダークモード
- カスタマイズ可能なテーマカラーとバナー
- レスポンシブデザイン
- Pagefindによる検索

ユーザ側でテーマカラーを自由に変更できる機能がユニークで面白いですね。

::github{repo="saicaca/fuwari"}

# サイトのカスタマイズ

サイトの設定を編集する際は`src/config.ts`を直接変更します。  
サイトタイトルやプロフィール画像、テーマカラーの変更などが出来ます。

この他に本WEBサイトでは、以下のカスタマイズを入れています。

## リンクカード

FuwariではリンクカードはGithubのみの対応のため、その他のサイトもリンクカードとして表示させるカスタマイズを入れました。

AstroではRemark Pluginが使用できるため、今回は定番の`remark-link-card`を使用しました。

1. `remark-link-card`をインストールする。

```powershell frame=none showLineNumbers=false
pnpm add remark-link-card
```

2. `astro.config.mjs`でremark-link-cardを定義します。

```js title="astro.config.mjs" ins={1, 4}
import remnarkLinkCard from 'remark-link-card'

remarkPlugins: [
      [remnarkLinkCard,{ shortenUrl: true }],
      remarkMath,
      remarkReadingTime,
      remarkExcerpt,
      remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      remarkSectionize,
      parseDirectiveNode,
    ],
```

3. `src/styles/markdown.css`でremark-link-cardのStyleを追記する。

```css title="markdown.css"
.rlc-container {
    width: 100%;
    max-width: 800px;
    max-height: 130px;
    margin: 0 auto 2rem;
    background: var(--license-block-bg);
  
    text-decoration: none;
  
    border-radius: 0.75rem;
    display: flex;
    align-items: stretch;
    flex-direction: row; /* デフォルトは横並び */
  
    transition: background 200ms ease-in-out 0s, box-shadow 200ms ease-in-out 0s;
}
  
.rlc-container:hover {
    background-color: var(--btn-regular-bg-hover);
}

.rlc-info {
    overflow: hidden; /* PCではhidden */
    padding: 1rem;
    text-align: left;
    flex: 4 1 100px;
    align-items: flex-start;
    text-decoration: none;
    min-height: 100px; /* スマホ時に高さ不足にならないように */
}

.rlc-title {
    font-size: 1.25rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

/* PCでは1行で「...」 */
.rlc-description {
    font-size: 0.875rem;
    font-weight: 300;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 1行で省略 */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.4rem; /* 行の高さを適切に調整 */
    max-height: 3rem;
    overflow: hidden;
    flex-grow: 1; /* 説明文が途切れないように */
    padding-bottom: 4px; /* PC時の圧迫を防ぐ */
    color: var(--tw-prose-body)
}

.rlc-url-container {
    margin-top: auto; /* 説明文の下に配置 */
    display: flex;
    align-items: center;
}

.rlc-favicon {
    margin-right: 4px;
    width: 16px;
    height: 16px;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

.rlc-url {
    font-size: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.rlc-image-container {
    position: relative;
    flex: 1 1 100px;
    padding: 0.3rem;
    aspect-ratio: 1 / 1;
}

.rlc-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom-right-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}

/* スマホ用のレイアウト調整 */
@media (max-width: 768px) {
    .rlc-container {
        flex-direction: column;
        max-height: unset;
    }

    /* 画像を上にする */
    .rlc-image-container {
        order: -1;
        flex: none;
        width: 100%;
        /*height: 150px;*/
        padding: 0.5rem;
        aspect-ratio: 1.91 / 1;
    }

    .rlc-image {
        width: 100%;
        height: 100%;
        border-radius: 0.75rem 0.75rem 0 0;
    }

    /* スマホではタイトル・説明・URLを折り返す */
    .rlc-title {
        white-space: normal;
        overflow: visible;
    }

    /* スマホでは全文表示 */
    .rlc-description {
        -webkit-line-clamp: unset; /* 制限解除 */
        -webkit-box-orient: unset;
        display: block;
        max-height: none;
        height: auto;
        overflow: visible;
        flex-grow: unset; /* スマホでは自由に伸ばす */
    }

    .rlc-info {
        overflow: visible; /* スマホではhiddenを解除 */
        min-height: unset; /* スマホでは高さ制限を解除 */
    }

    .rlc-url {
        white-space: normal;
        overflow-wrap: break-word;
    }
}
```

4. `src/components/misc/Markdown.astro`でリンクカードに対してTailwind CSS (prose)を適用させないようにする。  
scriptタグの中に以下を追記する。

```javascript title="Markdown.astro"
let linkCards = Array.from(document.querySelectorAll(".rlc-container")) as HTMLElement[];
for (let linkCard of linkCards) {
    linkCard.classList.add("no-styling"); // Tailwind CSS(prose)を適用させないようにする
    linkCard.style.textDecoration = "none"; // 文字列の下線部を非表示にする
    linkCard.setAttribute('target','_blank'); //新しいタブで開く
}
```

## ブログページにコメント機能をつける

コメント機能はこれまでと同様に`giscus`を使用しました。

1. 以下の手順でgiscusを使用するための準備をする  
[giscusの設定](/posts/giscus-nextjs/#giscusの設定)

2. `src/components/Comments.astro`を作成する

```javascript title="Comments.astro"
<script src="https://giscus.app/client.js"
    is:inline
    data-repo={import.meta.env.NEXT_PUBLIC_GISCUS_REPO}
    data-repo-id={import.meta.env.NEXT_PUBLIC_GISCUS_REPO_ID}
    data-category="Announcements"
    data-category-id={import.meta.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID}
    data-mapping="pathname"
    data-strict="0"
    data-reactions-enabled="1"
    data-emit-metadata="0"
    data-input-position="bottom"
    data-lang="ja"
    crossorigin="anonymous"
    data-theme="preferred_color_scheme"
    async>
</script>

<script is:inline>
  function getPreferredTheme() {
    // ローカルストレージに保存されたテーマを確認
    if (localStorage.getItem('theme') === 'dark') return 'dark';
    if (localStorage.getItem('theme') === 'light') return 'light';
    
    // システムのカラーモードを確認
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function updateGiscusTheme() {
    const theme = getPreferredTheme();
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe) return;
    
    iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }

  // Astroのカラーモード切り替えイベントを監視
  const themeObserver = new MutationObserver(updateGiscusTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateGiscusTheme);
  
  // DOMのロードが完了したときにGiscusのテーマを設定
  window.onload = () => {
    updateGiscusTheme();
  };
</script>
```

3. `.env.local`を作成する

```bash title=".env.local"
NEXT_PUBLIC_GISCUS_REPO={repository_name}
NEXT_PUBLIC_GISCUS_REPO_ID={repository_id}
NEXT_PUBLIC_GISCUS_CATEGORY_ID={category_id}
```

4. `src/pages/posts/[...slug].astro`に作成した`Comments`コンポーネントを追加する

```javascript title="[...slug].astro" ins={1, 25-27}
import Comments from '../../components/Comments.astro';
{/* 中略 */}
<div class="flex flex-col md:flex-row justify-between mb-4 gap-4 overflow-hidden w-full">
    <a href={entry.data.nextSlug ? getPostUrlBySlug(entry.data.nextSlug) : "#"}
        class:list={["w-full font-bold overflow-hidden active:scale-95", {"pointer-events-none": !entry.data.nextSlug}]}>
        {entry.data.nextSlug && <div class="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-start gap-4" >
            <Icon name="material-symbols:chevron-left-rounded" class="text-[2rem] text-[var(--primary)]" />
            <div class="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75">
                {entry.data.nextTitle}
            </div>
        </div>}
    </a>

    <a href={entry.data.prevSlug ? getPostUrlBySlug(entry.data.prevSlug) : "#"}
        class:list={["w-full font-bold overflow-hidden active:scale-95", {"pointer-events-none": !entry.data.prevSlug}]}>
        {entry.data.prevSlug && <div class="btn-card rounded-2xl w-full h-[3.75rem] max-w-full px-4 flex items-center !justify-end gap-4">
            <div class="overflow-hidden transition overflow-ellipsis whitespace-nowrap max-w-[calc(100%_-_3rem)] text-black/75 dark:text-white/75">
                {entry.data.prevTitle}
            </div>
            <Icon name="material-symbols:chevron-right-rounded" class="text-[2rem] text-[var(--primary)]" />
        </div>}
    </a>
</div>

<div class="card-base z-10 px-3 md:px-6 pt-6 pb-4 relative w-full">
    <Comments />
</div>
```

## コードブロックのデザインを変更する

FuwariデフォルトのコードブロックはLanguageやファイル名を表示できないため、`astro-expressive-code`を使用してカスタマイズしました。

1. 以下のコマンドで`astro-expressive-code`と`@expressive-code/plugin-line-numbers`をインストールする

```powershell frame="none" showLineNumbers=false
pnpm add astro-expressive-code @expressive-code/plugin-line-numbers
```

2. `astro.config.mjs`で定義する。

```javascript title="astro.config.mjs" ins={1-2, 40-43}
import expressiveCode from "astro-expressive-code";
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import remnarkLinkCard from 'remark-link-card'

// https://astro.build/config
export default defineConfig({
  site: "https://www.y-shin.net/",
  base: "/",
  trailingSlash: "always",
  integrations: [tailwind(
      {
        nesting: true,
      }
  ), swup({
    theme: false,
    animationClass: "transition-swup-", // see https://swup.js.org/options/#animationselector
    // the default value `transition-` cause transition delay
    // when the Tailwind class `transition-all` is used
    containers: ["main", "#toc"],
    smoothScrolling: true,
    cache: true,
    preload: true,
    accessibility: true,
    updateHead: true,
    updateBodyClass: false,
    globalInstance: true,
  }), icon({
    include: {
      "preprocess: vitePreprocess(),": ["*"],
      "fa6-brands": ["*"],
      "fa6-regular": ["*"],
      "fa6-solid": ["*"],
    },
  }), svelte(), sitemap(), Compress({
    CSS: false,
    Image: false,
    Action: {
      Passed: async () => true, // https://github.com/PlayForm/Compress/issues/376
    },
  }), expressiveCode({
    themes:['aurora-x'],
    plugins: [pluginLineNumbers()]
  })],
  markdown: {
    remarkPlugins: [
      [remnarkLinkCard,{ shortenUrl: true, cache: true }],
      remarkMath,
      remarkReadingTime,
      remarkExcerpt,
      remarkGithubAdmonitionsToDirectives,
      remarkDirective,
      remarkSectionize,
      parseDirectiveNode,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeComponents,
        {
          components: {
            github: GithubCardComponent,
            linkcard: LinkCardComponent,
            note: (x, y) => AdmonitionComponent(x, y, "note"),
            tip: (x, y) => AdmonitionComponent(x, y, "tip"),
            important: (x, y) => AdmonitionComponent(x, y, "important"),
            caution: (x, y) => AdmonitionComponent(x, y, "caution"),
            warning: (x, y) => AdmonitionComponent(x, y, "warning"),
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["anchor"],
          },
          content: {
            type: "element",
            tagName: "span",
            properties: {
              className: ["anchor-icon"],
              "data-pagefind-ignore": true,
            },
            children: [
              {
                type: "text",
                value: "#",
              },
            ],
          },
        },
      ],
    ],
  },
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          // temporarily suppress this warning
          if (
            warning.message.includes("is dynamically imported by") &&
            warning.message.includes("but also statically imported by")
          ) {
            return;
          }
          warn(warning);
        },
      },
    },
  },
});
```

3. `src/layouts/Layout.astro`で`preElements`をコメントアウトする

```javascript title="Laayout.astro" ins={20-32}
function initCustomScrollbar() {
	const bodyElement = document.querySelector('body');
	if (!bodyElement) return;
	OverlayScrollbars(
		// docs say that a initialization to the body element would affect native functionality like window.scrollTo
		// but just leave it here for now
		{
			target: bodyElement,
			cancel: {
				nativeScrollbarsOverlaid: true,    // don't initialize the overlay scrollbar if there is a native one
			}
		}, {
		scrollbars: {
			theme: 'scrollbar-base scrollbar-auto py-1',
			autoHide: 'move',
			autoHideDelay: 500,
			autoHideSuspend: false,
		},
	});
	/*
	const preElements = document.querySelectorAll('pre');
	preElements.forEach((ele) => {
		OverlayScrollbars(ele, {
			scrollbars: {
				theme: 'scrollbar-base scrollbar-dark px-2',
				autoHide: 'leave',
				autoHideDelay: 500,
				autoHideSuspend: false
			}
		});
	});
	*/
	const katexElements = document.querySelectorAll('.katex-display') as NodeListOf<HTMLElement>;
	katexElements.forEach((ele) => {
		OverlayScrollbars(ele, {
			scrollbars: {
				theme: 'scrollbar-base scrollbar-auto py-1',
			}
		});
	});
}
```

4. `src/component/misc/Markdown.astro`を編集し、コピーボタンのスクリプトをコメントアウトする。

```javascript title="Markdown.astro" ins={25-77}
---
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/jetbrains-mono/wght-italic.css'

interface Props {
  class: string
}
const className = Astro.props.class
---
<div data-pagefind-body class=`prose dark:prose-invert prose-base !max-w-none custom-md ${className}`>
    <!--<div class="prose dark:prose-invert max-w-none custom-md">-->
    <!--<div class="max-w-none custom-md">-->
    <slot/>
</div>

<script>
    let linkCards = Array.from(document.querySelectorAll(".rlc-container")) as HTMLElement[];
    for (let linkCard of linkCards) {
        linkCard.classList.add("no-styling");
        linkCard.style.textDecoration = "none";
        linkCard.setAttribute('target','_blank');
    }
</script>

<!-- 
<script>
  const observer = new MutationObserver(addPreCopyButton);
  observer.observe(document.body, { childList: true, subtree: true });
  
  document.addEventListener("DOMContentLoaded", addPreCopyButton);

  function addPreCopyButton() {
    observer.disconnect();
    
    let codeBlocks = Array.from(document.querySelectorAll("pre"));

    for (let codeBlock of codeBlocks) {
      if (codeBlock.parentElement?.nodeName === "DIV" && codeBlock.parentElement?.classList.contains("code-block")) continue

      let wrapper = document.createElement("div");
      wrapper.className = "relative code-block";

      let copyButton = document.createElement("button");
      copyButton.className = "copy-btn btn-regular-dark absolute active:scale-90 h-8 w-8 top-2 right-2 opacity-75 text-sm p-1.5 rounded-lg transition-all ease-in-out";

      codeBlock.setAttribute("tabindex", "0");
      if (codeBlock.parentNode) {
        codeBlock.parentNode.insertBefore(wrapper, codeBlock);
      }

      let copyIcon = `<svg class="copy-btn-icon copy-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="M368.37-237.37q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-474.26q0-34.48 24.26-58.74 24.26-24.26 58.74-24.26h378.26q34.48 0 58.74 24.26 24.26 24.26 24.26 58.74v474.26q0 34.48-24.26 58.74-24.26 24.26-58.74 24.26H368.37Zm0-83h378.26v-474.26H368.37v474.26Zm-155 238q-34.48 0-58.74-24.26-24.26-24.26-24.26-58.74v-515.76q0-17.45 11.96-29.48 11.97-12.02 29.33-12.02t29.54 12.02q12.17 12.03 12.17 29.48v515.76h419.76q17.45 0 29.48 11.96 12.02 11.97 12.02 29.33t-12.02 29.54q-12.03 12.17-29.48 12.17H213.37Zm155-238v-474.26 474.26Z"/></svg>`
      let successIcon = `<svg class="copy-btn-icon success-icon" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path d="m389-377.13 294.7-294.7q12.58-12.67 29.52-12.67 16.93 0 29.61 12.67 12.67 12.68 12.67 29.53 0 16.86-12.28 29.14L419.07-288.41q-12.59 12.67-29.52 12.67-16.94 0-29.62-12.67L217.41-430.93q-12.67-12.68-12.79-29.45-.12-16.77 12.55-29.45 12.68-12.67 29.62-12.67 16.93 0 29.28 12.67L389-377.13Z"/></svg>`
      copyButton.innerHTML = `<div>${copyIcon} ${successIcon}</div>
      `

      wrapper.appendChild(codeBlock);
      wrapper.appendChild(copyButton);

      let timeout: ReturnType<typeof setTimeout>;
      copyButton.addEventListener("click", async () => {
        if (timeout) {
            clearTimeout(timeout);
        }
        let text = codeBlock?.querySelector("code")?.innerText;
        if (text === undefined) return;
        await navigator.clipboard.writeText(text);
        copyButton.classList.add("success");
        timeout = setTimeout(() => {
          copyButton.classList.remove("success");
        }, 1000);
      });
    }
    
    observer.observe(document.body, { childList: true, subtree: true });
  }
</script>
-->

```

# おわりに

Astroは今回のサイトのリメイクで初めて触れましたが、比較的入りやすかったです。  
まだ深く理解できていないので今後も色々作りながら学んでいければと思っています。

# 参考にさせて頂いたありがたいサイト

https://expressive-code.com/

https://sur33.com/posts/remark-link-card-with-astro/
