const express = require('express')

const app = express()

const PORT = 9876


app.get("/test/p", (req, res) => {

})

app.listen(PORT, () => {
    console.log("Server Running")
})