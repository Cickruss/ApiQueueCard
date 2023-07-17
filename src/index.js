require('dotenv').config()
const amqplib = require('amqplib')
const express = require("express")
const app = express()
const createMessageChannel = require('./messages/messageChannel')

const jsonTest = JSON.stringify({
    "Agency": "0001",
    "account": 10101,
    "cpf" : 12122121,
    "dateOfBirth": 12112003,
    "fullName": "icaro macedo",
    "flag": "Mastercard",
    "type": "Platinum",
    "expirationDate": 15
})

const CreateMessage = async (jsonTest) => {

    const messageChannel = await createMessageChannel()
    

    if (messageChannel) {
        messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(jsonTest))
        console.log("Json send to queue");
    }
}

CreateMessage(jsonTest)









/*
app.use(express.json())

app.get('/', (req,res) => {

    res.send('Rabbit API')
})

app.listen(process.env.PORT, () => {
    console.log('Server on: http://localhost:' + process.env.PORT)
})
 */
