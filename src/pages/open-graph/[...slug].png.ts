import type { APIContext, ImageMetadata, InferGetStaticPropsType } from 'astro'
import satori, { type SatoriOptions } from 'satori'
import { html } from 'satori-html'
import { getCollection } from 'astro:content'
import { Resvg } from '@resvg/resvg-js'
import { siteConfig } from '@/config'
import fs from 'fs'; // ファイルシステムを利用してバッファを読み込む
import path from 'path';

/* TTF, OTF and WOFF, this import may not compatible with all static pages services (?) */
//import Roboto300 from 'node_modules/@fontsource/roboto/files/roboto-latin-300-normal.woff'
//import Roboto700 from 'node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff'
//import IBMPlexSansJP300 from 'node_modules/@fontsource/ibm-plex-sans-jp/files/ibm-plex-sans-jp-latin-300-normal.woff'
//import IBMPlexSansJP700 from 'node_modules/@fontsource/ibm-plex-sans-jp/files/ibm-plex-sans-jp-latin-700-normal.woff'
//import test from 'node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-10-300-normal.woff'
//const Roboto300 = fs.readFileSync(path.resolve('node_modules/@fontsource/roboto/files/roboto-latin-300-normal.woff'));
//const Roboto700 = fs.readFileSync(path.resolve('node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff'));

//const ZenKakuGothicNew300 = fs.readFileSync(path.resolve('node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-10-300-normal.woff'));
//const ZenKakuGothicNew700 = fs.readFileSync(path.resolve('node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-10-700-normal.woff'));

const Round1C300 = fs.readFileSync("./src/pages/open-graph/MPLUSRounded1cLight.ttf")
const Round1C700 = fs.readFileSync("./src/pages/open-graph/MPLUSRounded1cBold.ttf")

const ogOptions: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: '"M PLUS Rounded 1c"',
      data: Round1C300, // Buffer.from は省略、すでにバッファとして読み込まれている
      weight: 300,
      style: 'normal',
    },
    {
      name: '"M PLUS Rounded 1c"',
      data: Round1C700,
      weight: 700,
      style: 'normal',
    },
  ],
};

const markup = (
  title: string,
  published: Date,
  description?: string,
  category?: string,
  tags?: string[]
) =>
  html`
    <div
      style="
        width: 1200px;
        height: 630px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: white;
        padding: 40px;
        text-align: center;
      "
    >
      <div
        style="
          width: 80%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        "
      >
        <div style="display: flex; flex-direction: column; align-items: center;">
          <h1 style="font-size: 48px; font-weight: bold; margin-bottom: 10px;">
            ${title}
          </h1>
          <p style="font-size: 24px; opacity: 0.9;">
            ${description ? description: ""}
          </p>
        </div>
        <div
            style="
                margin-top: 20px;
                font-size: 16px;
                opacity: 0.7;
                display: flex;
                justify-content: center;
            "
            >
            <p style="margin-right:100px">Yuma Shintani</p>
            <p style="margin-left:100px">Published on ${published.toDateString()}</p>
        </div>
      </div>
    </div>
  `;

type Props = InferGetStaticPropsType<typeof getStaticPaths>

/**
 * Route for dynamic Open Graph images.
 * This function will generate Open Graph images only if enabled in `config.ts`.
 *
 * @returns {Promise<object>} An object containing the GET, getStaticPaths methods for astro.
 */
async function getOpenGraphData() {
  if (siteConfig.postOGImageDynamic) {
    return {
      GET: async function GET(context: APIContext) {
        const { title, description, published, category, tags } =
          context.props as Props
        const svg = await satori(
          markup(title, published, description, category, tags),
          ogOptions,
        )
        const png = new Resvg(svg).render().asPng()

        console.log(svg)

        return new Response(png, {
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        })
      },
      getStaticPaths: async function getStaticPaths() {
        const posts = await getCollection('posts')
        const result = posts
          .filter(({ data }) => !data.draft)
          .map(post => ({
            params: { slug: post.slug },
            props: {
              title: post.data.title,
              description: post.data.description,
              published: post.data.published,
              category: post.data.category,
              tags: post.data.tags,
            },
          }))
        return result
      },
    }
  }
  return { getStaticPaths: {}, GET: {} }
}

export const { getStaticPaths, GET } = await getOpenGraphData()