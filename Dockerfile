FROM node:18-alpine
WORKDIR /ecommercebe
COPY . .
RUN yarn install --production
CMD ["npm", "start"]