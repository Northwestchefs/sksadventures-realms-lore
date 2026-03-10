const DEFAULT_SRD_BASE_URL = "https://www.dnd5eapi.co/api/2014"

export class SrdClient {
  constructor(options = {}) {
    this.baseUrl = (options.baseUrl ?? DEFAULT_SRD_BASE_URL).replace(/\/$/, "")
    this.fetchImpl = options.fetchImpl ?? fetch
  }

  async listResources(endpoint) {
    return this.#request(endpoint)
  }

  async fetchResource(pathOrUrl) {
    return this.#request(pathOrUrl)
  }

  async fetchByIndex(endpoint, index) {
    return this.#request(`${endpoint}/${index}`)
  }

  async #request(pathOrUrl) {
    const url = this.#toUrl(pathOrUrl)
    const response = await this.fetchImpl(url, {
      headers: { Accept: "application/json" },
    })

    if (!response.ok) {
      throw new Error(`SRD request failed (${response.status} ${response.statusText}) for ${url}`)
    }

    return response.json()
  }

  #toUrl(pathOrUrl) {
    if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
      return pathOrUrl
    }

    const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`
    return `${this.baseUrl}${path}`
  }
}

export const createSrdClient = (options) => new SrdClient(options)
export const SRD_2014_API_BASE_URL = DEFAULT_SRD_BASE_URL
