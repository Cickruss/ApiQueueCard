const { config } = require('dotenv')
const {connect} = require('amqplib')


const createMessageChannel = async () => {
    const AMQP_SERVER = "amqp://dev:devsenha@localhost:5672"
    const QUEUE_NAME = "invites"
    config()

    try {
        const connection = await connect(AMQP_SERVER)
        console.log("Rabbit Connected");
        const channel = await connection.createChannel()
        await channel.assertQueue(QUEUE_NAME)
        console.log("Queue created");
    } catch (error) {
        console.log('Error while trying to connect to RabbitMQ')
        console.log(error)
        return null
    }
}

module.exports = createMessageChannel
