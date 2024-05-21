const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3500;
app.use(express.json());


app.use(express.static(path.join(__dirname, "www.gevo.cz"))); //diky tomu fungujou .css, obrazky a .txt (static files)


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});