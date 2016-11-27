import marked from 'marked'
import Prism from 'prismjs'

// https://github.com/chjj/marked#overriding-renderer-methods
const renderer = new marked.Renderer()

/**
 * modify anchor tag for Non-English languages
 *
 * @override
 * @param {any} text
 * @param {any} level
 * @returns
 */
renderer.heading = (text, level) => {
  const slug = text.replace(/<(?:.|\n)*?>/gm, '').toLowerCase().replace(/[\s\n\t]+/g, '-')
  return `<h${level} id="${slug}">${text}</h${level}>`
}
/**
 * highlight my code
 *
 * @override
 * @param {any} code
 * @param {any} lang
 * @returns
 */
renderer.code = (code, lang) => {
  const highlight = Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript)
  return `<pre><code class="lang-${escape(lang, true)}">${highlight}</code></pre>`
}
marked.setOptions({
  renderer,
  breaks: true,
  gfm: true
})

export default marked
