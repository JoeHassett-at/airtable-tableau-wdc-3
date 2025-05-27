import Connector from '@tableau/taco-toolkit'

let connectorInitialized = false
let pageLoaded = false

const connector = new Connector(() => {
  connectorInitialized = true
  enableButtonWhenReady()
})

function submit() {
  connector.handlerInputs = [
    {
      fetcher: 'MyFetcher',
      parser: 'MyParser',
      data: {
        url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
      },
    },
  ]
  connector.submit()
}

function handleSubmit() {
  const button = getSubmitButton()

  button.toggleAttribute('disabled')
  button.innerText = 'Processing...'

  submit()
}

function enableButtonWhenReady() {
  if (connectorInitialized && pageLoaded) {
    const button = getSubmitButton()

    button.innerText = 'Get Earthquake Data!'
    button.removeAttribute('disabled')
    button.addEventListener('click', handleSubmit, { once: true })
  }
}

function getSubmitButton(): HTMLElement {
  const button = document.getElementById('submitButton')
  if (!button) {
    throw new Error('Submit button is not present on the page.')
  }

  return button
}

window.addEventListener('load', function () {
  pageLoaded = true
  enableButtonWhenReady()
})
