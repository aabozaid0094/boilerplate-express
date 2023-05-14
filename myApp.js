let express = require('express');
let app = express();
require('dotenv').config()
let bodyParser = require('body-parser');

console.log("Hello World");

let absolutePath = __dirname + '/views/index.html'

// app.get("/", (req, res)=>{
//     res.send("Hello Express")
// })

let staticMiddleware = express.static(__dirname)
app.use(staticMiddleware)

let requestLogMiddleware = (req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next()
}
app.use(requestLogMiddleware)

let bodyParserMiddleware = bodyParser.urlencoded({extended: false})
app.use(bodyParserMiddleware)

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

app.get("/now", (req, res, next)=>{
    req.time = new Date().toString()
    next()
}, (req,res)=>{
    res.json({"time":req.time})
})

app.get("/:word/echo", (req, res)=>{
    res.json({"echo":req.params.word})
})

app.get("/name", (req, res)=>{
    res.json({"name": req.query.first + " " + req.query.last})
})

 module.exports = app;