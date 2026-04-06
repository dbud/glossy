import { html, render } from "lit";
import { createShadow } from "./shadow-container"

const style = `
  :host {
    all: initial;
    font-size: 16px;
  }

  .is-open #backdrop {
    display: block;
  }

  #backdrop {
    z-index: 10000;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.5);
  }

  .is-open #popup {
    transform: translateY(0);
  }

  #popup {
    position: fixed;
    z-index: 10001;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 50vh;
    overflow-y: scroll;

    transform: translateY(calc(100% + 10px));
    transition: transform 0.1s ease-in;

    background: #fff;
    color: #000;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);

    padding: 1em;
    font-family: "EB Garamond";
  }
`

export function createPopup() {
  const shadow = createShadow();
  render(html`
    <style>${style}</style>
    <div id="root">
      <div id="backdrop"></div>
      <div id="popup"></div>
    </div>
  `, shadow)
  const root = shadow.querySelector("#root")
  const popup = shadow.querySelector("#popup") as HTMLElement

  const open = () => {
    root.classList.add("is-open")
    window.document.body.classList.add("scroll-lock")
  }

  const close = () => {
    root.classList.remove("is-open")
    window.document.body.classList.remove("scroll-lock")
  }

  shadow.querySelector("#backdrop").addEventListener("click", close)

  return { popup, open, close }
}
