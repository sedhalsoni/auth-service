# Use Node.js base image
FROM node:20

# Set working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN rm -rf /usr/src/app/node_modules && npm install

# Copy the .env file into the container
COPY .env .env

# Copy the rest of your code
COPY . .

# Expose the desired port
EXPOSE 8000

# Run the app
CMD ["npm", "run", "start"]
