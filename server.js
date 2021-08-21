var express = require("express");
var app = express();
var cors = require('cors');
var redis = require('redis');
var client = redis.createClient();

//Routes
const ProductRoute = require("./Routes/ProductRoute");


//connection to redis
client.on('connect', function () {
    console.log('Redis client bağlandı');
});
 
client.on('error', function (err) {
    console.log('Redis Clientda bir hata var ' + err);
});



//express http config
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
  
//CORS Config
app.use(cors());

//middleware layer
//app.use(middleware.requiredAuthantication);


// Controllers(Routes)
app.use("/product", ProductRoute);

//host config layer
app.listen(1515 || 8080 , () => {
    console.log("express server is running on 1515 port :)");
});