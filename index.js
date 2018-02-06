const express = require('express')
const bodyParser = require('body-parser')
const data = require('./data')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: true }))

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/:name', (req, res) => {
    const name = req.params.name
    res.send(`Hello ${name}!`)
})

app.post('/bot', (req, res) => {

    const params = req.body.queryResult.parameters

    const brand = params.item
    const limit = params.number
    const order = params.descriptor

    let items = []

    if (brand === 'Phone') {
        items = data
    } else if (brand) {
        items = data.filter(item => item.brand === brand)
    }

    if (order && items.length > 0) {
        if (order === 'cheapest') {
            items = items.sort((a, b) => {
                return a.price > b.price
            })
        } else {
            items = items.sort((a, b) => {
                return a.price < b.price
            })
        } 
    }

    if (limit  && items.length > 0) {
        items = items.slice(0, limit)
    }

    let message = 'This is what I found! '
    if (items.length > 0) {
        items.forEach(item => {
            message += `${item.model} for R ${item.price.toFixed(2)}, `
        })
        message = message.slice(0, -2);
    } else {
        message = `Sorry, I couldn't find anything! :O`
    }

    console.log(params, message)
    
    const botResponse = { fulfillmentText: message }
    res.json(botResponse)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
