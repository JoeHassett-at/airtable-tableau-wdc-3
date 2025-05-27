import { Parser } from '@tableau/taco-toolkit/handlers'

export default class MyParser extends Parser {
  parse(fetcherResult, { dataContainer, handlerInput }) {
    const { tableName } = handlerInput.data
    const containerBuilder = Parser.createContainerBuilder(dataContainer)
    const { isNew, tableBuilder } = containerBuilder.getTable(tableName)

    const { records = [] } = fetcherResult ?? {}

    if (records.length === 0) {
      console.warn(`⚠️ No records to parse for ${tableName}`)
      return containerBuilder.getDataContainer()
    }

    // Only define columns ONCE
    if (isNew) {
      const firstRecord = records.find(r => r.fields && Object.keys(r.fields).length > 0)
      const sampleFields = firstRecord?.fields || {}

      const safeHeaders = Object.keys(sampleFields).map(fieldName => ({
        id: this.normalizeFieldName(fieldName),
        dataType: this.detectDataType(sampleFields[fieldName])
      }))

      tableBuilder.addColumnHeaders([
        { id: 'record_id', dataType: 'string' },
        ...safeHeaders
      ])
    }

    // Always add rows (even if not isNew)
    for (const record of records) {
      const baseRow = { record_id: record.id || '' }

      for (const [key, value] of Object.entries(record.fields ?? {})) {
        const normalizedKey = this.normalizeFieldName(key)
        baseRow[normalizedKey] = this.formatValue(value)
      }

      tableBuilder.addRow(baseRow)
    }

    return containerBuilder.getDataContainer()
  }

  detectDataType(value) {
    if (value === null || value === undefined) return 'string'
    
    // Handle arrays - if all elements are same type, use that type
    if (Array.isArray(value)) {
      if (value.length === 0) return 'string'
      const elementType = this.detectDataType(value[0])
      if (value.every(item => this.detectDataType(item) === elementType)) {
        return elementType
      }
      return 'string' // Mixed types in array, default to string
    }

    // Handle dates
    if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
      return 'datetime'
    }

    switch (typeof value) {
      case 'boolean':
        return 'boolean'
      case 'number':
        return Number.isInteger(value) ? 'int' : 'float'
      case 'object':
        return 'string' // JSON stringify objects
      default:
        return 'string'
    }
  }

  normalizeFieldName(name) {
    return name
      .replace(/\s+/g, '_')
      .replace(/[^\w_]/g, '')
      .toLowerCase()
      .substring(0, 50)
  }

  formatValue(value) {
    try {
      if (value === null || value === undefined) return null
      
      // Handle arrays
      if (Array.isArray(value)) {
        if (value.length === 0) return null
        // If all elements are the same type, format each element
        const formattedValues = value.map(v => this.formatValue(v))
        return formattedValues.join(', ')
      }

      // Handle dates
      if (value instanceof Date) {
        return value.toISOString()
      }
      if (typeof value === 'string' && !isNaN(Date.parse(value))) {
        return new Date(value).toISOString()
      }

      // Handle other types
      switch (typeof value) {
        case 'boolean':
          return value
        case 'number':
          return value
        case 'object':
          return JSON.stringify(value)
        default:
          return String(value)
      }
    } catch {
      return '[unreadable]'
    }
  }
}

