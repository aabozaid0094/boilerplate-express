let express = require('express');
let app = express();

console.log("Hello World");

let absolutePath = __dirname + '/views/index.html'

// app.get("/", (req, res)=>{
//     res.send("Hello Express")
// })

let middlewareFunction = express.static(__dirname)
app.use(middlewareFunction)

app.get("/", (req, res)=>{
    res.sendFile(absolutePath)
})

 module.exports = app;