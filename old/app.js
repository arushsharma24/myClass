const Express = require('express');
const path=require('path');
const app = Express();

app.get('/', function (req, res) {
   res.send('Hello World');
})


const server = app.listen(3000, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("listening at http://%s:%s", host, port)
})