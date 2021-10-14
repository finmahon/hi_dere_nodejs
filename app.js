const express = require('express')
const cors = require('cors')
const health = require('@cloudnative/health-connect');
let healthcheck = new health.HealthChecker();
const app = express()
const appHealth = express()
let port =  process.env.OPENSHIFT_NODEJS_PORT || 3000
const portHealth =  process.env.OPENSHIFT_NODEJS_PORT_HEALTH || 8080

if (port == portHealth) {
  port = parseInt(port,10)+1
}

app.use(cors())
appHealth.use(cors())

appHealth.use('/live', health.LivenessEndpoint(healthcheck))
appHealth.use('/ready', health.ReadinessEndpoint(healthcheck))
appHealth.use('/health', health.HealthEndpoint(healthcheck))
appHealth.get('/', (req, res) => {
  console.log(new Date() + " app health root " + req.url)
  res.send('hello from health root')
})

appHealth.get('/*', (req, res) => {
  console.log(new Date() + " default endpoint " + req.url)
  res.send('hello from default endpoint')
})


app.get('/', (req, res) => {
  console.log(new Date() + " app root " + req.url)
  res.send('hello from app root')
})

app.get('/test1', (req, res) => {
  console.log(new Date() + " test1 endpoint  " + req.url)
  res.send('hello from test1')
})

app.get('/test2', (req, res) => {
  console.log(new Date() + " test2 endpoint  " + req.url)
  res.send('hello from test2')
})

app.get('/*', (req, res) => {
  console.log(new Date() + " default endpoint " + req.url)
  res.send('hello from default endpoint')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

appHealth.listen(portHealth, () => {
  console.log(`Example app health listening at http://localhost:${portHealth}`)
})