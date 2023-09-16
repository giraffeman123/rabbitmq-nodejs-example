FROM node:current-alpine3.18

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "index.js" ]
#CMD ["tail", "-f", "/dev/null"]
