type TableHeaderCell = {
  text: string,
  value: string,
  _id: number
}

type TableBodyCell = {
  text: string,
  value: string,
  _id?: number
}

type TableBodyRow = {
  cells: TableBodyCell[],
  _id?: number
  status?: string
}

type TableHeader = TableHeaderCell[] | []

type TableBody = TableBodyRow[] | []

type TableData = {
  header: TableHeader,
  body: TableBody,
  _id: number
}

type ChangedHeaderCell = {
  index: number,
  value: string
}

type ChangedBodyRow = {
  rowIndex: number,
  cellIndex: number,
  value: string
}

export {
  TableData,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableBodyRow,
  TableBodyCell,
  ChangedHeaderCell,
  ChangedBodyRow
}
