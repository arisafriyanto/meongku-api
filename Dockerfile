FROM node:14.21.2-alpine
WORKDIR /app
ENV PORT 3000
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start"]