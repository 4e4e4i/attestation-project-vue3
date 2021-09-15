import express from 'express'
import cors from 'cors'
import handleTableRequest from './table/index.js'
import adaptRequest from './helpers/adapt-request.js'

const port = process.env.PORT || 8081;
const baseUrl = '/api'

const app = express()
app.use(cors())
app.use(express.json())

app.all(`${baseUrl}/table`, tableController)

function tableController (req, res) {
  const httpRequest = adaptRequest(req)
  handleTableRequest(httpRequest)
      .then(({ headers, statusCode, data }) =>
          res
              .set(headers)
              .status(statusCode)
              .send(data)
      )
      .catch(e => res.status(500).end())
}

app.listen(port)
