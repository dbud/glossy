import { html } from "lit"
import { Definition } from "./background"

const style = `
  .entries {
    line-height: 1.3;
  }

  .word {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0.6rem;
  }

  .pos {
    font-family: sans-serif;
  }

  .example {
    font-style: italic;
    opacity: 0.5;
  }

  .license, .tags {
    font-family: sans-serif;
    font-size: 0.8rem;
    opacity: 0.5;
  }

  .license {
    padding-top: 1rem;
  }
`

export function view(definition: Definition) {
  const { word, entries, source } = definition
  return html`
    <style>${style}</style>
    <div class="word">${word}</div>
    <div class="entries">
      ${entries.length === 0 && html`<p>No definitions found.</p>`}
      ${entries.map(viewEntry)}
    </div>
    <div class="license">${source.license.name}</div>`
}

type Entry = Definition["entries"][number]
const viewEntry = ({ partOfSpeech, pronunciations, senses }: Entry) => html`
  <div class="entry">
    <div class="pos">${partOfSpeech}</div>
    <div class="pronunciations">
      ${compressPronunciations(pronunciations).map(viewPronunciation)}
    </div>
    <ol class="senses">
      ${senses.map(viewSense)}
    </ol>
  </div>`

function append<K extends string | number | symbol, V>(map: [K, V[]][], k: K, v: V) {
  const idx = map.findIndex(e => e[0] === k)
  if (idx >= 0)
    map[idx][1].push(v)
  else
    map.push([k, [v]])
}

type Pronunciation = Entry["pronunciations"][number]

type PronunciationVariants = {
  variants: string[]
  tags: string[]
}

function compressPronunciations(list: Pronunciation[]): PronunciationVariants[] {
  const compressed: [string, Pronunciation[]][] = []
  for (const p of list) {
    const key = p.tags.join(":")
    append(compressed, key, p)
  }
  return compressed.map(([_, vs]) => ({
    tags: vs[0].tags,
    variants: vs.map(v => v.text)
  }))
}

const viewPronunciation = ({ tags, variants }: PronunciationVariants) => html`
  <div class="pronunciation">
    <span class="text">${variants.join(" ")}</span>
    <span class="tags">${tags.join(", ")}</span>
  </div>`

type Sense = Entry["senses"][number]
const viewSense = ({ definition, examples }: Sense) => html`
  <li class="sense">
    <div class="definition">${definition}</div>
    <div class="examples">
      ${examples.map(example => html`
        <div class="example">${example}</div>`)}
    </div>
  </li>`

export function error(message: unknown) {
  return html`
    <div class="error">${message}</div>
  `
}
