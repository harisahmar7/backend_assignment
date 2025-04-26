const express = require('express');
const app = express();
app.use(express.json());
const port = 3000;
const pubSub = require('./src/controller');

app.post('/receiver', pubSub.receiver);

app.listen(port, (err)=>{
    console.log("Server is Listen at Port: ",port);
})