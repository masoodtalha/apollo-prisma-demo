const fetch = require('isomorphic-fetch')
const FormData = require('form-data')

// 2. Mailgun data
const token = new Buffer(`api:key-0dc7bfa57c04d6fddafb3f0c8ef3dbd4`).toString('base64')
const url = 'https://api.mailgun.net/v3/sandbox78c15ed221834753908825ce6d13ead7.mailgun.org/messages'

module.exports = function (event) {

  // 3. Extract info about new customer
  const {
    name,
    imgUrl
  } = event.data.Customer.node

  // 4. Prepare body of POST request
  const form = new FormData()
  form.append('from', 'Admin <bilalsaeedhb@gmail.com>')
  form.append('to', `User <bilalcrmorph@gmail.com>`)
  form.append('subject', `Campaign Deleted ${name}`)
  form.append('text', `Campaign has been deleted ${name} with image: ${imgUrl}!`)

  // 5. Send request to Mailgun API
  return fetch(url, {
    headers: {
      'Authorization': `Basic ${token}`
    },
    method: 'POST',
    body: form
  })
}