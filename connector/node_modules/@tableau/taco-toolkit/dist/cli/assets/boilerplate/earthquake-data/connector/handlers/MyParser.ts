import { DataContainer, DataType, log, ParseOptions, Parser } from '@tableau/taco-toolkit/handlers'

interface FeatureRow {
  id: string
  properties: {
    mag: number
    title: string
  }
  geometry: {
    type: string
    coordinates: [number, number, number]
  }
}

interface FetcherResult {
  features: FeatureRow[]
}

export default class MyParser extends Parser<FetcherResult> {
  parse(fetcherResult: FetcherResult, { dataContainer }: ParseOptions): DataContainer {
    const tableName = 'My Sample Data'
    log(`parsing started for '${tableName}'`)

    const containerBuilder = Parser.createContainerBuilder(dataContainer)
    const { isNew, tableBuilder } = containerBuilder.getTable(tableName)

    if (isNew) {
      tableBuilder.setId('mySampleData')
      tableBuilder.addColumnHeaders([
        {
          id: 'id',
          dataType: DataType.String,
        },
        {
          id: 'mag',
          alias: 'magnitude',
          dataType: DataType.Float,
        },
        {
          id: 'title',
          alias: 'title',
          dataType: DataType.String,
        },
        {
          id: 'location',
          dataType: DataType.Geometry,
        },
      ])
    }

    tableBuilder.addRows(
      fetcherResult.features.map((row) => {
        return { id: row.id, mag: row.properties.mag, title: row.properties.title, location: row.geometry }
      })
    )

    return containerBuilder.getDataContainer()
  }
}
