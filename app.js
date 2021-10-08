const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(cors())

app.get('/*', (req, res) => {
  console.log(new Date() + "  " + req.url)
  res.send('hey dere')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})