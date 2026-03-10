export const normalizeEndpoint = (endpoint) => endpoint.replace(/^\/+|\/+$/g, "")

export const toStableId = (endpoint, index) => `${normalizeEndpoint(endpoint)}:${index}`

export const normalizeIndexItem = (endpoint, item) => {
  const cleanedEndpoint = normalizeEndpoint(endpoint)

  return {
    id: toStableId(cleanedEndpoint, item.index),
    index: item.index,
    name: item.name,
    endpoint: cleanedEndpoint,
    apiUrl: item.url,
    source: "5e-srd-api",
  }
}

export const indexById = (items) => Object.fromEntries(items.map((item) => [item.id, item]))

export const indexByName = (items) =>
  Object.fromEntries(items.map((item) => [item.name.toLowerCase(), item]))
