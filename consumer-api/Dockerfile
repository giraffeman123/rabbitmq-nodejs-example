FROM node:current-alpine3.18

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production
# RUN npm install prom-client
# RUN npm install request-ip

COPY . .

#CMD [ "node", "index.js" ]
CMD ["tail", "-f", "/dev/null"]