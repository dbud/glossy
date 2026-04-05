export function createShadow() {
  const host = document.createElement("div")
  const shadow = host.attachShadow({ mode: "closed" })
  document.body.appendChild(host)
  return shadow
}
