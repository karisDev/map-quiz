FROM node:16

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node package.json ./

RUN npm install

COPY --chown=node:node . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
