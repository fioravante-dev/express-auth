FROM node:23-slim

WORKDIR /app

COPY package.json package-lock.json ./

ENV NODE_ENV=development

RUN npm install

COPY . .

# Important: generate Prisma client
RUN npx prisma generate

EXPOSE 3333

CMD ["npm", "run", "dev"]