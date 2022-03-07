FROM mongo:latest
COPY ./init/mongo-init.js /mongo-init.js
# CMD  mongoimport --host mongodb --username admin --password root --db GraphQL --collection users --type json --file initData.json --jsonArray   
