import makeHttpError from '../helpers/http-error.js'
import { mockTableData } from '../test/mocks/mock-table-data.js'

export default function makeTableEndpointHandler ({ tableData }) {
    return async function handle (httpRequest) {
        switch (httpRequest.method) {
            case 'GET':
                return getTableData(httpRequest)

            case 'PUT':
                return updateTableData(httpRequest)

            // TODO: для теста с чужой базой, чтобы создать seed Для таблицы, т.к. функционал создания еще не запущен в MVP
            // на фронте метод не используется - через POSTMAN
            case 'POST':
                return createTableData(httpRequest)

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed`
                })
        }
    }

    async function getTableData () {
        const result = await tableData.getData()
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }

    async function updateTableData (httpRequest) {
        let { body } = httpRequest
        if (!body) {
            return makeHttpError({
                statusCode: 400,
                errorMessage: 'Bad request. No PUT body.'
            })
        }

        if (typeof httpRequest.body === 'string') {
            try {
                body = JSON.parse(body)
            } catch {
                return makeHttpError({
                    statusCode: 400,
                    errorMessage: 'Bad request. PUT body must be valid JSON.'
                })
            }
        }

        const result = await tableData.updateTable(body)
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }

    async function createTableData () {
        const newTable = mockTableData
        const result = await tableData.createTable(newTable)
        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }
}
