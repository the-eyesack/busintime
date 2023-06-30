const express = require('express')
const app = express()
const port = 4000

app.get('/whoami', (req, res) => {
    res.send('Who is anybody?')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})