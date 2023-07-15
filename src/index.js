const dotenv = require('dotenv')
const express = require("express")
const app = express()
const createMessageChannel = require('./messages/messageChannel')


dotenv.config()
createMessageChannel()


app.use(express.json())

app.get('/', (req,res) => {

    res.send('Rabbit API')
})

app.listen(3000, () => {
    console.log('Server on: http://localhost:3000')
})