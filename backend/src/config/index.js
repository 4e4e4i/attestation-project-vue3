import configValues from './config.js'
const { uname, pdw } = configValues

function getDbConnectionString () {
  return `mongodb+srv://${uname}:${pdw}@cluster0.x4tac.mongodb.net/SMAttestation?retryWrites=true&w=majority`
}

export {
  getDbConnectionString
}
