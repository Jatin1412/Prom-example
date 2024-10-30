# Use Node.js image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 3001

# Run the app
CMD ["node", "app.js"]
