import Connector from '@tableau/taco-toolkit'
import 'bootstrap/dist/css/bootstrap.min.css'

let connectorInitialized = false
let pageLoaded = false

const connector = new Connector(() => {
  connectorInitialized = true
  enableButtonWhenReady()
})

function submit() {
  const username = document.querySelector<HTMLInputElement>('#username')?.value
  const password = document.querySelector<HTMLInputElement>('#password')?.value
  if (!username || !password) {
    return
  }

  connector.secrets = { username, password }
  connector.handlerInputs = [
    {
      fetcher: 'DataFetcher',
      parser: 'taco:excel-file-parser',
      data: {},
      name: 'unique-workbook-name',
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

    document.querySelector<HTMLInputElement>('#username')?.focus()
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
