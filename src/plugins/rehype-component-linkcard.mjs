/// <reference types="mdast" />
import { h } from 'hastscript'

/**
 * Creates a Link Card component styled like a GitHub Card.
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} properties.url - The URL of the link to be embedded.
 * @param {string} properties.name - The URL of the link to be embedded.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created Link Card component.
 */
export function LinkCardComponent(properties, children) {
  if (Array.isArray(children) && children.length !== 0)
    return h('div', { class: 'hidden' }, [
      'Invalid directive. ("linkcard" directive must be leaf type "::linkcard{url="https://example.com"}")',
    ])

  if (!properties.url)
    return h(
      'div',
      { class: 'hidden' },
      'Invalid URL. ("url" attribute must be provided in the format "https://example.com")',
    )

  const url = properties.url
  const name = properties.name || "No Title"
  const cardUuid = `LC${Math.random().toString(36).slice(-6)}` // ランダムな識別子を作成

  // プレースホルダー要素
  //const nAvatar = h(`div#${cardUuid}-avatar`, { class: 'gc-avatar' })
  const nTitle = h(`div#${cardUuid}-title`, { class: 'gc-title' }, name)
  const nDescription = h(`div#${cardUuid}-description`,url,)

  return h(
    `a#${cardUuid}-card`,
    {
      class: 'card-github no-styling mb-3 overflow-hidden',
      href: url,
      target: '_blank',
      rel: 'noopener noreferrer',
      style: 'margin-bottom:20px'
    },
    [
      h('div', { class: 'flex justify-between items-center' }, [
        h('div', { class: 'text-left' }, [
            h('div', { class: 'text-xl line-clamp-1' }, nTitle),
            h('div', { class: 'font-normal mt-1 line-clamp-1' }, nDescription),
        ]),
        h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '200',
        height: '200',
        fill: 'currentColor',
        class: 'bi bi-link-45deg',
        viewBox: '0 0 16 16',
        class: 'transition text-[15rem] absolute pointer-events-none right-6 top-1/2 -translate-y-1/2 text-black/5 dark:text-white/5'
        }, [
            h('path', { d: 'M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z' }),
            h('path', { d: 'M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z' })
        ])
    ])
    ],
  )
}
