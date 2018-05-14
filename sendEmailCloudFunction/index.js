const functions = require('firebase-functions');
const fetch = require('isomorphic-fetch')
const FormData = require('form-data')

const token = new Buffer(`api:key-659b00c7026c30725ad1d031ff1f5329`).toString('base64')
const url = 'https://api.mailgun.net/v3/sandbox241a79084dfd45e2b64b8aca947c4870.mailgun.org/messages'
exports.sendEmail = functions.https.onRequest((request, response) => {
  // const {
  //   name,
  //   imgUrl
  // } = event.data.Customer.node

  // 4. Prepare body of POST request
  const form = new FormData()
  form.append('from', 'Admin <bilalcrmorph@gmail.com>')
  form.append('to', `User <bilalsaeedhb@gmail.com>`)
  form.append('subject', `Campaign Deleted`)
  form.append('text', `Campaign has been deleted!`)

  // 5. Send request to Mailgun API
  return fetch(url, {
    headers: {
      'Authorization': `Basic ${token}`
    },
    method: 'POST',
    body: form
  })
});
