require('dotenv').config()
const amqplib = require('amqplib')
const express = require("express")
const app = express()
const createMessageChannel = require('./messages/messageChannel')



app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/front/index.html')
})
app.post('/', (req,res) => {

    const card = JSON.stringify({
        "Agency": parseInt(req.body.agency),
        "account": parseInt(req.body.account),
        "cpf" : parseInt(req.body.cpf),
        "dateOfBirth": req.body.dateOfBirth,
        "fullName": req.body.fullName,
        "nameForCard": CreateNameForCard(req.body.fullName),
        "flag": req.body.flag,
        "type": req.body.type,
        "expirationDate": parseInt(req.body.expirationDate)
    })

    console.log(card);
    
    CreateMessage(card)
    res.send("Formulario enviado!")
})

app.listen(process.env.PORT, () => {
    console.log('Server on: http://localhost:' + process.env.PORT);
})



const CreateMessage = async (card) => {

    const messageChannel = await createMessageChannel()
    

    if (messageChannel) {
        messageChannel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(card))
        console.log("Json send to queue");
    }
}

function CreateNameForCard(name) {
    const names = name.trim().split(' ')
    const firstName = names[0]
    const lastName = names[names.length - 1]
    const nameForCard = firstName + ' ' + lastName

    return nameForCard
  }


