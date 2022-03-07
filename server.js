import express from "express";
import * as api from "./api.js";
import cors from "cors";
import bodyParser from "body-parser";
import {Url} from "./url.js";
import mongoose from "mongoose";

const app = express();


app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
  next();
});

const connect = mongoose.connect('mongodb://admin:root@localhost:27017/Articles').then(() => {
    console.log("Connecté à la BDD")
})

// JSON API

app.get(Url._articleUrl, api.listAll);
app.get(Url._articleUrl + '/random', api.getRandom);
app.get(Url._articleUrl + '/:id', api.get);
app.get(Url._articleUrl + '/name/:name', api.filterByName);
app.post(Url._articleUrl, api.create);
app.put(Url._articleUrl + '/:id', api.update);
app.delete(Url._articleUrl + '/:id', api.del);

app.listen(app.get('port'), function() {
  console.log('✔ Express server listening on http://localhost:%d/', app.get('port'));
});
