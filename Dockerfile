FROM node:19

#Working Dir
WORKDIR /usr/src/path

#Copy Package Json Files
COPY package*.json ./

#Install Files 
RUN npm install

#Copy Source Files 
COPY . .

#Build
RUN npm run build

#Expose the API Port
EXPOSE 5000

CMD [ "node" , "index.js"]