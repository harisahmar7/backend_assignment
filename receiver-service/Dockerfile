# Use official Node.js LTS image
FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install PM2 globally
RUN npm install pm2 -g

# Expose necessary port
EXPOSE 3000

# Start the application using PM2 and server.json
CMD ["pm2-runtime", "server.json"]
