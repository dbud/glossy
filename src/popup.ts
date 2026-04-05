import { html, render } from "lit";
import { createShadow } from "./shadow-container"

const style = `
  :host {
    all: initial;
  }

  #popup.is-open {
    transform: translateY(0);
  }

  #popup {
    // display: none;
    position: fixed;
    z-index: 10000;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 80vh;
    overflow-y: scroll;

    transform: translateY(calc(100% + 10px));
    transition: transform 0.25s ease-out;

    background: #fff;
    color: #000;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);

    font-family: "EB Garamond";
    font-size: 16px;
    padding: 12px;
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

export function createPopup() {
  const root = createShadow();
  render(html`
    <style>${style}</style>
    <div id="popup" />
  `, root)
  const popup = root.querySelector('#popup') as HTMLElement
  return {
    popup,
    open: () => popup.classList.add('is-open'),
    close: () => popup.classList.remove('is-open')
  }
}
