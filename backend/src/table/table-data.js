import Table from '../models/tableModel.js'

export default function makeTableData ({ database }) {
    return Object.freeze({
        getData,
        updateTable,
        createTable
    })

    async function getData () {
        await database
        try {
            const [dbRes] = await Table.find({})
            return dbRes
        } catch (err) {
            throw new Error(err)
        }
    }

    async function updateTable ({ header, body, _id: tableId }) {
        await database
        const editableRows = body.reduce((acc, item, index) => {
            if (acc[item.status]) {
                acc[item.status].push({
                    ...item,
                    index
                })
            }
            return acc
        }, { removed: [], changed: [], new: [] })

        if (header) {
            await Table.findOneAndUpdate({ _id: tableId }, {
                header
            })
        }

        if (editableRows.changed.length) {
            for (const editableRow of editableRows.changed) {
                await Table.findOneAndUpdate({ "body._id": editableRow._id }, {
                    "body.$": editableRow
                })
            }
        }

        if (editableRows.new.length) {
            for (const newRow of editableRows.new) {
                await Table.findOneAndUpdate({ _id: tableId }, {
                    $push: {
                        body: {
                            $each: [newRow],
                            $position: newRow.index
                        }
                    }
                })
            }
        }

        if (editableRows.removed.length) {
            for (const removedRow of editableRows.removed) {
                await Table.findOneAndUpdate({ "body._id": removedRow._id }, {
                    $pull: {
                        body: {
                            _id: removedRow._id
                        }
                    }
                })
            }
        }

        const [dbRes] = await Table.find({ _id: tableId })
        return dbRes
    }

    async function createTable (tableData) {
        await database
        const dbRes = await Table.create(tableData)
        return dbRes
    }
}
