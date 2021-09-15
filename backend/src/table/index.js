import makeDb from '../db/index.js'
import makeTableData from './table-data.js'
import makeTableEndpointHandler from './table-endpoint.js'

const database = makeDb()
const tableData = makeTableData({ database })
const tableEndpointHandler = makeTableEndpointHandler({ tableData })

export default tableEndpointHandler
