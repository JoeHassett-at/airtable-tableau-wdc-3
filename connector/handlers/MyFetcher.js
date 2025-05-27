import { Fetcher, FetchUtils } from '@tableau/taco-toolkit/handlers'

// Rate limiter to avoid rate limits
const createRateLimiter = (maxRequests, timeWindow) => {
  const requests = []
  
  return async () => {
    const now = Date.now()
    requests.splice(0, requests.length, ...requests.filter(time => now - time < timeWindow))
    
    if (requests.length >= maxRequests) {
      const oldestRequest = requests[0]
      const waitTime = timeWindow - (now - oldestRequest)
      await new Promise(resolve => setTimeout(resolve, waitTime))
      return createRateLimiter(maxRequests, timeWindow)()
    }
    
    requests.push(now)
  }
}

const throttle = createRateLimiter(5, 1000)

export default class MyFetcher extends Fetcher {
  async *fetch({ handlerInput }) {
    const { data } = handlerInput
    const headers = data.headers

    let baseUrl = data.url
    let nextOffset = null
    let pageCounter = 0

    console.log(`🚀 Starting fetch for table: ${data.tableName}`)

    do {
      // Throttle before each request
      await throttle()

      let urlToFetch
      if (nextOffset) {
        const baseUrlNoOffset = baseUrl.split("?")[0]
        urlToFetch = `${baseUrlNoOffset}?offset=${encodeURIComponent(nextOffset)}`
      } else {
        urlToFetch = baseUrl
      }

      console.log(`📄 Fetching page ${pageCounter + 1} with URL: ${urlToFetch}`)

      const response = await FetchUtils.fetchJson(urlToFetch, { headers })

      if (response.records && response.records.length > 0) {
        yield {
          tableName: data.tableName,
          records: response.records
        }
      }

      nextOffset = response.offset || null
      pageCounter++

    } while (nextOffset)

    console.log(`✅ Finished fetching all pages for table: ${data.tableName}`)
  }
}

