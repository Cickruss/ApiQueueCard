require('dotenv').config()
const amqplib = require('amqplib')
const express = require("express")
const app = express()
const createMessageChannel = require('./messages/messageChannel')


const CreateMessage = async () => {

    const messageChannel = await createMessageChannel()
    const jsonTest = JSON.stringify({
        "name": "Ícaro",
        "age": 19,
        "favoriteColor" : "Red"
    })

    if (messageChannel) {
        messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(jsonTest))
        console.log("Json send to queue");
    }
}

CreateMessage()









/*
app.use(express.json())

app.get('/', (req,res) => {

    res.send('Rabbit API')
})

app.listen(process.env.PORT, () => {
    console.log('Server on: http://localhost:' + process.env.PORT)
})
 */
