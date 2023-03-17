FROM node:16.15.0-alpine
WORKDIR /opt/inkjet-dashboard-app/reactApp
EXPOSE 3001
 
CMD [ "npm", "start" ]