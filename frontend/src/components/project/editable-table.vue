<template>
  <div class="editable-table">
    <app-table
      class="editable-table__table"
      :header="tableEditable.header"
      :body="tableEditable.body"
      :is-editable="isEditable"
      @changeHeader="changeHeaderInput"
      @changeBodyRow="changeBodyInput"
      @contextmenu.prevent="callContextMenu($event)"
    />

    <app-context-menu
      class="editable-table__context-menu"
      ref="contextMenu"
    >
      <li
        v-for="(item, index) in contextMenuItems"
        :key="index"
        class="editable-table__context-item"
        @click="contextItemClick(item.type)"
      >
        {{ item.name }}
      </li>
    </app-context-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import AppTable from '@/components/base/app-table.vue'
import AppContextMenu from '@/components/base/app-context-menu.vue'
import {
  ChangedBodyRow,
  ChangedHeaderCell,
  TableBody,
  TableBodyCell,
  TableBodyRow,
  TableData,
  TableHeaderCell
} from '@/services/interfaces/table'
import { AppContextMenuInterface } from '@/components/base/app-context-menu'

import { TABLE_ACTIONS } from '@/constants/common'

export default defineComponent({
  name: 'EditableTable',

  components: {
    AppTable,
    AppContextMenu
  },

  props: {
    data: {
      type: Object as PropType<TableData>,
      required: true
    }
  },

  data () {
    return {
      isEditable: false,
      tableEditable: null as unknown as TableData,
      isFetchingTable: false,
      editingRowIndex: NaN as number
    }
  },

  computed: {
    contextMenuItems () {
      const { EDIT, ...EDITABLE_ACTIONS } = TABLE_ACTIONS
      return this.isEditable ? EDITABLE_ACTIONS : { EDIT }
    },

    currentRow (): TableBodyRow {
      return this.tableEditable.body[this.editingRowIndex]
    }
  },

  methods: {
    callContextMenu (event: MouseEvent) {
      this.editingRowIndex = this.getEditRowIndex(event)
      const contextMenuComponent = this.$refs.contextMenu as AppContextMenuInterface
      contextMenuComponent.open(event)
    },

    closeContextMenu () {
      const contextMenuComponent = this.$refs.contextMenu as AppContextMenuInterface
      contextMenuComponent.close()
    },

    async contextItemClick (type: string) {
      switch (type) {
        case (TABLE_ACTIONS.EDIT.type):
          this.isEditable = true
          break
        case (TABLE_ACTIONS.CANCEL_EDIT.type):
          this.isEditable = false
          this.cancelEdit()
          break
        case (TABLE_ACTIONS.SAVE_EDIT.type):
          this.isEditable = false
          this.saveEdit()
          break
        case (TABLE_ACTIONS.REMOVE_ROW.type):
          this.removeTableRow()
          break
        case (TABLE_ACTIONS.ADD_ROW_BEFORE.type):
          this.addTableRowBefore()
          break
        case (TABLE_ACTIONS.ADD_ROW_AFTER.type):
          this.addTableRowAfter()
          break
      }
      this.closeContextMenu()
    },

    changeHeaderInput ({ index, value }: ChangedHeaderCell) {
      this.tableEditable.header = [
        ...this.tableEditable.header.slice(0, index),
        {
          ...this.tableEditable.header[index],
          text: value
        },
        ...this.tableEditable.header.slice(index + 1)
      ]
    },

    changeBodyInput ({ rowIndex, cellIndex, value }: ChangedBodyRow) {
      const updatedRow = {
        ...this.tableEditable.body[rowIndex]
      }
      updatedRow.cells[cellIndex].text = value
      updatedRow.status = updatedRow._id ? 'changed' : updatedRow.status

      this.tableEditable.body = this.updateBodyRows(
        this.tableEditable.body,
        updatedRow,
        rowIndex,
        'change'
      )
    },

    removeTableRow () {
      let body: TableBody
      if (this.isRowExist(this.tableEditable.body, this.editingRowIndex)) {
        body = [...this.tableEditable.body]
        body[this.editingRowIndex] = this.createRow('removed', this.currentRow)
      } else {
        body = this.updateBodyRows(
          this.tableEditable.body,
          this.currentRow,
          this.editingRowIndex,
          TABLE_ACTIONS.REMOVE_ROW.type
        )
      }
      this.tableEditable.body = body
    },

    isRowExist (body: TableBody, index: number) {
      return !!body[index]._id
    },

    addTableRowBefore () {
      this.tableEditable.body = this.updateBodyRows(
        this.tableEditable.body,
        this.createRow('new'),
        this.editingRowIndex,
        TABLE_ACTIONS.ADD_ROW_BEFORE.type
      )
    },

    addTableRowAfter () {
      this.tableEditable.body = this.updateBodyRows(
        this.tableEditable.body,
        this.createRow('new'),
        this.editingRowIndex + 1,
        TABLE_ACTIONS.ADD_ROW_AFTER.type
      )
    },

    updateBodyRows (body: TableBody, row: TableBodyRow, idx: number, type?: string): TableBody {
      switch (true) {
        case (type === TABLE_ACTIONS.REMOVE_ROW.type):
          return [
            ...body.slice(0, idx),
            ...body.slice(idx + 1)
          ]
        case (type === TABLE_ACTIONS.ADD_ROW_BEFORE.type && idx === 0):
          return [
            row,
            ...body
          ]
        case (type === TABLE_ACTIONS.ADD_ROW_BEFORE.type && idx === body.length):
          return [
            ...body,
            row
          ]
        case (type === 'change'):
          return [
            ...body.slice(0, idx),
            row,
            ...body.slice(idx + 1)
          ]
        default:
          return [
            ...body.slice(0, idx),
            row,
            ...body.slice(idx)
          ]
      }
    },

    createRow (status: string, previousRow?: TableBodyRow): TableBodyRow {
      if (status === 'new' || previousRow === undefined) {
        const cells: TableBodyCell[] = this.tableEditable.header.map((column: TableHeaderCell) => {
          return {
            value: column.value,
            text: ''
          }
        })
        return {
          cells,
          status
        }
      } else {
        return {
          ...previousRow,
          status
        }
      }
    },

    getEditRowIndex (event: MouseEvent) {
      const target = event.target as Element
      const tableRow = target.closest('.app-table__row')
      if (tableRow) {
        const tableBody = tableRow.closest('tbody')
        if (tableBody) {
          const tableRowsList = [...tableBody.querySelectorAll('.app-table__row')]
          const rowIndex = tableRowsList.indexOf(tableRow)
          return rowIndex
        }
      }
      return NaN
    },

    cancelEdit () {
      this.tableEditable = {
        ...this.data
      }
    },

    saveEdit () {
      this.$emit('save-edit', this.tableEditable)
    }
  },

  beforeMount () {
    this.tableEditable = {
      ...this.data
    }
  }
})
</script>

<style lang="scss">
.editable-table {
  &__table {
    height: 80vh;
  }

  &__context-item {
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
    transition: .2ms ease-in;

    &:hover {
      color: $white;
      background-color: $primary-hover;
    }
  }
}
</style>
