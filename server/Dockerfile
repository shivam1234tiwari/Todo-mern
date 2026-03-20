FROM node:18-alpine
# set working directory
WORKDIR /app

# COPY .json file
COPY package*.json ./
RUN npm install
# copy rest of code
COPY . .

EXPOSE 8000
# start backend application
CMD ["nodemon server.js"]