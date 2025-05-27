import React from 'react'
import useConnector from './useConnector'

const ConnectorView = () => {
  const { isSubmitting, errorMessage, isInitializing, handleSubmit } = useConnector()

  const onClick = () => {
    handleSubmit([
      {
        fetcher: 'LoadCsvDataFetcher',
        parser: 'taco:csv-file-parser',
        data: {},
        name: 'merged-csv-data',
      },
    ])
  }

  if (isInitializing) {
    return <div className="p-3 text-muted text-center">Initializing...</div>
  }

  return (
    <>
      <div className="box">
        <button className="btn btn-success px-5" onClick={onClick} disabled={isSubmitting}>
          Get Data
        </button>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </>
  )
}

export default ConnectorView
