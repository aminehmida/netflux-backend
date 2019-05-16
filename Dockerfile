FROM node:10

COPY package.json /app/
COPY yarn.lock /app/
COPY .env /app/
COPY .babelrc /app/

COPY ./src /app/src

WORKDIR /app

RUN yarn

EXPOSE 3000

CMD ["yarn", "start"]
