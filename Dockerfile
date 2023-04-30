FROM node

WORKDIR /usr/src/blog_forum-backend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 4444

CMD ["npm", "start"]