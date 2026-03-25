import { render } from "lit"
import { close, container, open } from "./popup"
import { createSelectionHandler } from "./selection-handler"
import { error, view } from "./view"

import example from "./example.json"
console.log(example)
container.style.top = "40px"
container.style.left = "40px"
render(view(example), container)

async function define(text: string) {
  try {
    const definition = await browser.runtime.sendMessage({ type: "DEFINE", word: text })
    render(view(definition), container)
    open()
  }
  catch (e) {
    console.error(e)
    render(error(e), container)
    open()
  }
}

const handleSelection = createSelectionHandler({
  callback: define,
  cancel: close,
})

document.addEventListener("selectionchange", () => {
  const text = window.getSelection()?.toString().trim()
  handleSelection(text)
})
