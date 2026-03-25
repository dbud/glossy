export function createContainer({ containerId, style: styleText }: {
  containerId: string,
  style: string,
}) {
  const host = document.createElement("div")
  const shadow = host.attachShadow({ mode: "closed" })

  const container = document.createElement("div")
  container.id = containerId

  const style = document.createElement("style")
  style.textContent = styleText

  shadow.appendChild(style)
  shadow.appendChild(container)
  document.body.appendChild(host)

  return container
}
