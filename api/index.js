const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const fs = require('node:fs');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3500;
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "public"))); //diky tomu fungujou .css, obrazky a .txt (static files)

async function writeToLog(content, page) {
    content = JSON.stringify(content);
    if (fs.existsSync(path.join(__dirname, "logs.json"))) {
        fs.readFile(path.join(__dirname, "logs.json"), 'utf8', (err, data) => {
            if (err) console.log(err);
            data = JSON.parse(data);
            data[page][uuidv4()] = content;

            fs.writeFile(path.join(__dirname, "logs.json"), JSON.stringify(data), (err) => {
                if (err) console.log(err);
            })
        })
    }
    else {
        data = {
            pg1: {},
            pg2: {},
            pg3: {},
            pg4: {}
        };
        data[page][uuidv4()] = content;
        fs.writeFile(path.join(__dirname, "logs.json"), JSON.stringify(data), (err) => {
            if (err) console.log(err);
        });
    }
}

app.post("/submit_form1", async (req, res) => {
    await writeToLog(req.body, "pg1");
    res.redirect("dotaznik2.html");
});

app.post("/submit_form2", async (req, res) => {
    await writeToLog(req.body, "pg2");
    res.redirect("dotaznik3.html");
});

app.post("/submit_form3", async (req, res) => {
    Object.keys(req.body).forEach(key => {

        req.body[key] = true;
    
    });
    await writeToLog(req.body, "pg3");
    res.redirect("dotaznik4.html");
});

app.post("/submit_form4", async (req, res) => {
    Object.keys(req.body).forEach(key => {

        req.body[key] = true;
    
    });
    await writeToLog(req.body, "pg4");
    res.redirect("dekujeme.html");
});

app.get("/resultsOfHacking", (req, res) => {
    fs.readFile(path.join(__dirname, "logs.json"), 'utf8', (err, data) => {
        var json = JSON.parse(data);
        res.json({ json });
    });
});



module.exports = app;