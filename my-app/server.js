const http = require("http")
const express = require("express")

const app = express();

app.get("/api/list", (req, res) => {
    res.status(200).json({
        code: 1,
        data: ['lala', 'llazz', 'zzzkkaa']
    })
})
app.listen(3001, () => console.log("express is listening 3001!"))