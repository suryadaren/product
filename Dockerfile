# Use Node.js Alpine image for the base image
FROM node:alpine

# Set the working directory for all build stages
WORKDIR /usr/src/app

# Install Prisma globally
RUN npm install -g prisma

# Leverage caching to speed up dependency installation
COPY package*.json ./
RUN npm install

# Copy the rest of the source files into the image
COPY . .

# Run the Prisma generate command
RUN prisma generate

# Run the build script
RUN npm run build


# Set the production node environment by default
ENV NODE_ENV production

# Run the application as a non-root user
USER node

# Expose the port that the application listens on
EXPOSE 3000
