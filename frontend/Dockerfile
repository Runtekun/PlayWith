FROM node:20

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
