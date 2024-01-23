# Use the official Node.js image as a base image
FROM node:18-alpine

# Remove the original Yarn version that comes with the Node.js image
RUN rm /usr/local/bin/yarn /usr/local/bin/yarnpkg

# Install Yarn version 4.0.2
RUN npm install --global yarn && \
    corepack enable && \
    yarn set version latest --yarn-path && \
    yarn set version stable && \
    corepack prepare yarn@4.0.2 --activate

# Set the working directory in the container
WORKDIR /opt/gim-dashboard/reactApp/build

# Expose the port on which the app will run
EXPOSE 3001

# Define the command to run the application
CMD ["yarn", "dlx", "serve", "--single", "-p", "3001"]
