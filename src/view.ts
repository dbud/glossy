import { html } from "lit"
import { Definition } from "./background"

export function view(definition: Definition) {
  console.log(definition)
  const { word, entries, source } = definition
  return html`
    <div class="word">${word}</div>
    <div class="entries">
      ${entries.map(viewEntry)}
    </div>
    <div class="license">${source.license.name}</div>`
}

type Entry = Definition["entries"][number]
const viewEntry = ({ partOfSpeech, pronunciations, senses }: Entry) => html`
  <div class="entry">
    <div class="pos">${partOfSpeech}</div>
    <div class="pronunciations">
      ${pronunciations.map(viewPronunciation)}
    </div>
    <ol class="senses">
      ${senses.map(viewSense)}
    </ol>
  </div>`

type Pronunciation = Entry["pronunciations"][number]
const viewPronunciation = ({ text, tags }: Pronunciation) => html`
  <div class="pronunciation">
    <span class="text">${text}</span>
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
