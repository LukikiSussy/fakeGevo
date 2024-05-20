const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

//custom middleware logger

app.use(logger); // je to napsany v logEvents.js

//3rd party middleware (stazeny npm install)

const whitelist = ["https://www.google.com", "http://127.0.0.1.5500", "http://localhost:3500"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {   //v logu se ukaze undefined -> !origin povoli i undefined, po skonceni developmentu odebrat
            callback(null, true);   // 1. parametr je error, 2. je jestli to muze nebo ne
        }
        else {
            callback(new Error("Not allowed by cors"))
        }
    },
    optionsSuccessStatus: 200 
}
app.use(cors(corsOptions)); //Cross Origin Resource Sharing



//built in middleware

app.use(express.urlencoded({extended: false}));  //app.use se pouziva na middleware
// pro vice informaci do dokumentace

//json...
app.use(express.json());


app.use(express.static(path.join(__dirname, "/public"))); //diky tomu fungujou .css, obrazky a .txt (static files)




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////






app.get("^/$|/index(.html)?", (req, res) => {   // ^ = musi zacinat, $ = musi koncit, | = nebo, (...)? = nemusi to tam byt/optional
    //res.sendFile("./views/index.html", {root: __dirname});   
    //res.send("...")

    res.sendFile(path.join(__dirname, "public", "index.html"))
});

app.get("/new-page(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "new-page.html"))
});

app.get("/old-page(.html)?", (req, res) => {   //redirect na jinou url
    res.redirect(301, "/new-page.html");  //302 defaultne
});



app.get("/hello(.html)?", (req, res, next) => {
    console.log("attempted to load hello.html");
    next()  //next() jde na dalsi funkci / nepouziva se moc
}, (req, res) => {
    res.send("hello world")
});


const one = (req, res, next) => {
    console.log("one");
    next();
}
const two = (req, res, next) => {
    console.log("two");
    next();
}
const three = (req, res) => {
    console.log("three");
    res.send("finished");
}
app.get("/chain(.html)?", [one, two, three]);



app.all("*", (req, res) => {   //jde zezhora dolu, tohle bude default kdyz to nic nenajde
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({error: "404 Not Found"});
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});


app.use(errorHandler); //errorHandler.js

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});