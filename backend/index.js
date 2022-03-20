const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const PORT = 4880

const list = require('./list')
app.use('/list', list)

app.listen(PORT, () => {
    console.log("server run on port " + PORT)
})