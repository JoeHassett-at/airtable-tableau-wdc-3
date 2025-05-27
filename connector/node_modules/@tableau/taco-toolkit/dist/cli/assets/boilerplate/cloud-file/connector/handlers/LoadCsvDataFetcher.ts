import { Fetcher, FetchUtils } from '@tableau/taco-toolkit/handlers'

export default class LoadCsvDataFetcher extends Fetcher {
  async *fetch() {
    const csvDataUrls = [
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.csv',
      'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.csv',
    ]

    for (const url of csvDataUrls) {
      await FetchUtils.loadCsvData(url, {
        trimColumnHeader: true,
      })
    }
    yield
  }
}
