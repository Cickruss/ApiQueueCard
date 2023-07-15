const { config } = require('dotenv')
const {connect} = require('amqplib')
require('dotenv').config()

const createMessageChannel = async () => {

    try {
        const connection = await connect(process.env.AMQP_SERVER)
        console.log("Rabbit Connected");
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.QUEUE_NAME)
        console.log("Queue created");
    } catch (error) {
        console.log('Error while trying to connect to RabbitMQ')
        console.log(error)
        return null
    }
}

module.exports = createMessageChannel
