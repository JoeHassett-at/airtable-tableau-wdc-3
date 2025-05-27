import Connector from '@tableau/taco-toolkit'

let connectorInitialized = false
let pageLoaded = false

const connector = new Connector(() => {
  connectorInitialized = true
  submitWhenReady()
})

async function submit() {
  try {
    const baseId = document.getElementById('baseId').value.trim()
    const airtablePAT = document.getElementById('airtablePAT').value.trim()
    const tableName = document.getElementById('tableName').value.trim()

    // Validate inputs
    if (!baseId || !airtablePAT || !tableName) {
      alert('Please fill in all fields')
      resetSubmitButton()
      return
    }

    const urlBase = `https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}`
    const headers = {
      Authorization: `Bearer ${airtablePAT}`,
      'Accept': 'application/json'
    }

    connector.handlerInputs = [{
      fetcher: 'MyFetcher',
      parser: 'MyParser',
      data: {
        tableName,
        url: urlBase,
        headers
      }
    }]

    connector.submit()
  } catch (error) {
    console.error('Error submitting connector:', error)
    alert('Failed to load Airtable data. Check console for details.')
    resetSubmitButton()
  }
}

function resetSubmitButton() {
  const elem = document.getElementById('submitButton')
  elem.removeAttribute('disabled')
  elem.classList.remove('button-loading')
  elem.innerText = 'Get Airtable Data!'
}

function isReadyToSubmit() {
  return connectorInitialized && pageLoaded
}

function handleSubmit() {
  const elem = document.getElementById('submitButton')
  elem.setAttribute('disabled', '')
  elem.classList.add('button-loading')
  elem.innerText = 'Pulling records from Airtable...'

  submit()
}

function submitWhenReady() {
  if (isReadyToSubmit()) {
    const elem = document.getElementById('submitButton')
    elem.innerText = 'Get Airtable Data!'
    elem.removeAttribute('disabled')
    elem.addEventListener('click', handleSubmit, { once: true })
  }
}

window.addEventListener('load', function () {
  pageLoaded = true
  submitWhenReady()
})
