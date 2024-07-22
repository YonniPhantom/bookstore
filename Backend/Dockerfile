
    # Use an official Node.js runtime as the base image
    FROM node:16-bullseye
    
    # Set the working directory in the container
    WORKDIR /usr/app
    # Copy package.json and package-lock.json
    COPY package*.json ./

    # Install Node.js dependencies
    RUN npm install
    RUN npm install nodemon -g
    
    # Define the command to run the app
    CMD ["npm","run", "dev"]