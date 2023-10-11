# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock (if available) to the container
COPY package.json yarn.lock* ./

# Install app dependencies
RUN yarn install

# Copy the rest of your application code to the container
COPY . .

# Build the React app for production
RUN yarn build

# Expose a port (e.g., 80)
EXPOSE 80

# Start the application
CMD [ "yarn", "start" ]
