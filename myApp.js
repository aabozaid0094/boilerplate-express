let express = require('express');
let app = express();
require('dotenv').config()

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

app.get("/json", (req, res)=>{
    let helloMessage = "Hello json"
    let {MESSAGE_STYLE} = process.env
    if (MESSAGE_STYLE=="uppercase") {
        helloMessage = helloMessage.toUpperCase()
    }
    res.json({"message": helloMessage})
})

 module.exports = app;