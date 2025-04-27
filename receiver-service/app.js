const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT;
const pubSub = require('./src/receiver-service');


app.post('/receiver', pubSub.receiver);

app.listen(port, (err)=>{
    console.log("Server is Listen at Port: ",port);
})