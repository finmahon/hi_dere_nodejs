const express = require('express')
var cors = require('cors')
const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();
const app = express()
const port = 3000

app.use(cors())

app.use('/live', health.LivenessEndpoint(healthcheck))
app.use('/ready', health.ReadinessEndpoint(healthcheck))
app.use('/health', health.HealthEndpoint(healthcheck))

app.get('/', (req, res) => {
  console.log(new Date() + "  " + req.url)
  res.send('hey dere')
})

app.get('/wut', (req, res) => {
  console.log(new Date() + " wut  " + req.url)
  res.send('hey dere 2')
})

app.get('/*', (req, res) => {
  console.log(new Date() + " default  " + req.url)
  res.send('hey dere default')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})