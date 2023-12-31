const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 80;

const amqp = require("amqplib");
var channel, connection;


connectQueue() // call connectQueue function
async function connectQueue() {
    try {

        connection = await amqp.connect("amqp://rabbitmq:5672");
        channel = await connection.createChannel()
        
        // connect to 'correo-masivo', create one if doesnot exist already
        await channel.assertQueue("correo-masivo")
        
        channel.consume("correo-masivo", data => {
            // console.log(data)
            console.log("Data received : ", `${Buffer.from(data.content)}` );
            channel.ack(data)
        })

    } catch (error) {
        console.log(error)
    }
}

app.listen(PORT, () => console.log("Server running at port " + PORT));