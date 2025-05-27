import { Fetcher, FetchUtils, FetchOptions, getBasicAuthHeader } from '@tableau/taco-toolkit/handlers'

export default class DataFetcher extends Fetcher {
  async *fetch({ secrets }: FetchOptions) {
    const { username, password } = secrets
    const headers = getBasicAuthHeader(username, password)

    // PLACEHOLDER: the url is NOT real endpoint.
    // Replace the url with actual endpoint that supports basic auth for corresponding file type.
    // Note: the permission setting in connector.json also needs to be updated accordingly.
    const url = 'https://www.example.com/api/user'

    yield await FetchUtils.loadExcelData(url, { headers })
  }
}
