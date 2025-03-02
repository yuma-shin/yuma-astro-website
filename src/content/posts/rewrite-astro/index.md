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
nextSlug: "fuwari-expressive-code"
nextTitle: "FuwariでExpressive Codeを使用しコードブロックをカスタマイズする"
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

以下で記事にしています。  
[FuwariでExpressive Codeを使用しコードブロックをカスタマイズする](/posts/fuwari-expressive-code/)

# おわりに

Astroは今回のサイトのリメイクで初めて触れましたが、比較的入りやすかったです。  
まだ深く理解できていないので今後も色々作りながら学んでいければと思っています。

# 参考にさせて頂いたありがたいサイト

https://sur33.com/posts/remark-link-card-with-astro/
