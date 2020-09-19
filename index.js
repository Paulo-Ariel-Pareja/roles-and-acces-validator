const authMiddleware = require('./app/middlewares/authorization-middleware');
const validBody = require('./app/middlewares/validate-body');

const bodyParser = require('body-parser');
const path = require('path');
const casbin = require('casbin');

const express = require('express');

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = 3001

app.use(validBody.validateBodyContentMiddleware, authMiddleware.authz(async () => {
  const enforcer = await casbin.newEnforcer(path.join(__dirname, 'app/casbin_conf/model.conf'), path.join(__dirname, 'app/casbin_conf/policy.csv'));
  return enforcer;
}));

app.post('/', (req, res) => {
  res.status(200).json({ message: "guaranteed access" });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 
