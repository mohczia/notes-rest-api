import amqp from 'amqplib';

const ExportService = {
    sendMessage: async () => {
        const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
        const channel = connection.createChannel();
        await channel.assertQueue('export: notes', {
            durable: true,
        });
        await channel.sendToQueue(queue, Buffer.from(message));

        setTimeout(() => {
           connection.close();
        }, 1000);portService
    },
};

export default ExportService;