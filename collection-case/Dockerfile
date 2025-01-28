# Base image
FROM node:18

# Working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the project files
COPY . .

# Build the project
RUN npm run build

# Expose the port and run the app
EXPOSE 3000
CMD ["npm", "start"]