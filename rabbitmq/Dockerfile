FROM rabbitmq:3-management-alpine

RUN wget https://github.com/noxdafox/rabbitmq-message-deduplication/releases/download/0.6.0/rabbitmq_message_deduplication-0.6.0.ez
RUN wget https://github.com/noxdafox/rabbitmq-message-deduplication/releases/download/0.6.0/elixir-1.13.4.ez

RUN mv rabbitmq_message_deduplication-0.6.0.ez /opt/rabbitmq/plugins/
RUN mv elixir-1.13.4.ez /opt/rabbitmq/plugins/

RUN rabbitmq-plugins enable rabbitmq_message_deduplication
