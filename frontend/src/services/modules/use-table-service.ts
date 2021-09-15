import { ref } from 'vue'

import { TableApi } from '@/api/methods.api'
import { TableData } from '@/services/interfaces/table'
import { isFetchingTableType, isErrorType, initialTableDataType, TableService } from '@/services/interfaces/modules/table-service'

import { ErrorText } from '@/constants/errors'

const isFetchingTable: isFetchingTableType = ref(false)
const isError: isErrorType = ref(null)
const initialTableData: initialTableDataType = ref(null)

const fetchTableData = async () => {
  isFetchingTable.value = true
  isError.value = null
  try {
    initialTableData.value = await TableApi.getTableData()
  } catch (err) {
    isError.value = Error(ErrorText.DEFAULT)
  } finally {
    isFetchingTable.value = false
  }
}

const saveTableData = async (tableData: TableData) => {
  isFetchingTable.value = true
  isError.value = null
  try {
    initialTableData.value = await TableApi.saveTableData(tableData)
  } catch (err) {
    isError.value = Error(ErrorText.DEFAULT)
  } finally {
    isFetchingTable.value = false
  }
}

export const useTableService = (): TableService => {
  return {
    isFetchingTable,
    isError,
    initialTableData,
    methodsTableService: {
      fetchTableData,
      saveTableData
    }
  }
}
