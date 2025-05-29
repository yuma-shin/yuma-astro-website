import type { APIContext, ImageMetadata, InferGetStaticPropsType } from "astro";
import satori, { type SatoriOptions } from "satori";
import { html } from "satori-html";
import { getCollection } from 'astro:content';
import { Resvg } from "@resvg/resvg-js";
import { siteConfig } from '@/config';

import fs from "fs"; // ファイルシステムを利用してバッファを読み込む
import path from "path";

/* TTF, OTF and WOFF, this import may not compatible with all static pages services (?) */
import Roboto300 from "node_modules/@fontsource/roboto/files/roboto-latin-300-normal.woff";
import Roboto700 from "node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff";

const Round1C300 = fs.readFileSync("./src/pages/open-graph/MPLUSRounded1cLight.ttf");
const Round1C700 = fs.readFileSync("./src/pages/open-graph/MPLUSRounded1cBold.ttf");

const ogOptions: SatoriOptions = {
	width: 1200,
	height: 630,
	// debug: true,
	fonts: [
		{
      name: '"M PLUS Rounded 1c"',
      data: Round1C300, // Buffer.from は省略、すでにバッファとして読み込まれている
      weight: 300,
      style: "normal",
    },
    {
      name: '"M PLUS Rounded 1c"',
      data: Round1C700,
      weight: 700,
      style: "normal",
    }
	],
};

const markup = (title: string, published: Date, description?: string, category?: string, tags?: string[]) =>
  /* Satori uses tailwind! Create or view a desing using https://og-playground.vercel.app/ */
html`<div tw="flex flex-col w-full h-full bg-[#1d1f21] text-[#c9cacc]">
      <div tw="flex flex-col flex-1 w-full p-10 justify-center">
        <p tw="text-2xl mb-6">${published.toDateString()}</p>
        <h1 tw="text-6xl font-bold leading-snug text-white">${title}</h1>
        <p tw="text-2xl text-white">${description}</p>
      </div>
      <div tw="flex items-center justify-between w-full p-10 border-t border-[#2bbc89] text-xl">
        <div tw="flex flex-col">
          <p tw="ml-3 font-semibold">Category : ${category}</p>
          <p tw="ml-3 font-semibold">Tags : ${tags}</p>
        </div>
        <p>by Yuma Shintani</p>
      </div>
      </div>`;

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

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
        const {title, description, published, category, tags } = context.props as Props;
        const svg = await satori(markup(title, published, description, category, tags), ogOptions);
        const png = new Resvg(svg).render().asPng();

        return new Response(png, {
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
      getStaticPaths: async function getStaticPaths() {
        const posts = await getCollection("posts");
        const result = posts.filter(({ data }) => !data.draft)
          .map((post) => ({
            params: { slug: post.slug },
            props: {
              title: post.data.title,
              description: post.data.description,
              published: post.data.published,
              category: post.data.category,
              tags: post.data.tags,
            },
          }));
        return result
      }
    }
  } else {
    return { getStaticPaths: {}, GET: {} } ;
  }
}

export const { getStaticPaths, GET } = await getOpenGraphData();
