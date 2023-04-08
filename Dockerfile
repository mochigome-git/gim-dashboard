FROM node:16.15.0-alpine
WORKDIR /opt/gim-dashboard/reactApp
EXPOSE 3001
 
CMD [ "npm", "start" ]