const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

const amqp = require("amqplib");


const sendData = async (data) => {

    try {

        var connection = await amqp.connect("amqp://rabbitmq:5672");
        var channel = await connection.createChannel();

        // connect to 'correo-masivo', create one if doesnot exist already
        await channel.assertQueue("correo-masivo", {
            durable: true,
            arguments: {
                'x-message-deduplication': true,
                //'x-cache-size': ,
                //'x-cache-ttl': ,
                //'x-cache-persistence': ,
            }
        });

        // send data to queue
        await channel.sendToQueue("correo-masivo", Buffer.from(JSON.stringify(data)), {
            headers: {
                'x-deduplication-header': `${data.id}`,
            }
        });

        // close the channel and connection
        await channel.close();
        await connection.close();

    } catch (error) {
        console.log(error)
    }
}

app.get("/send-msg/:id", (req, res) => {

    var idData = req.params.id;
    const data = {
        id: idData,
        title: "Quiúbole con tu cuerpo!",
        author: "Yordi Wild"
    }

    sendData(data);

    console.log(`The following message has been sent to the queue: ${JSON.stringify(data)}`);
    res.send(`Message: ${JSON.stringify(data)}`);

});


app.listen(PORT, () => console.log("Server running at port " + PORT));