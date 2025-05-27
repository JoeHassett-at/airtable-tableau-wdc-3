import { Fetcher, FetchUtils, FetchOptions } from '@tableau/taco-toolkit/handlers'

export default class MyFetcher extends Fetcher {
  async *fetch({ handlerInput }: FetchOptions) {
    yield await FetchUtils.fetchJson(handlerInput.data.url)
  }
}
