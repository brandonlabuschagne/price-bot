const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/:name', (req, res) => {
    const name = req.params.name
    res.send(`Hello ${name}!`)
})

app.post('/bot', (req, res) => {
    //console.log(req)
    const params = req.body.queryResult.parameters
    const item = params.item
    const message = `You asked about ${item}.`
    const botResponse = {
        fulfillmentText: message
    }
    console.log(params, botResponse)
    res.json(botResponse)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
