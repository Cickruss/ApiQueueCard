require('dotenv').config()
const express = require("express")
const app = express()
const createMessageChannel = require('./messages/messageChannel')

createMessageChannel()


app.use(express.json())

app.get('/', (req,res) => {

    res.send('Rabbit API')
})

app.listen(process.env.PORT, () => {
    console.log('Server on: http://localhost:' + process.env.PORT)
})