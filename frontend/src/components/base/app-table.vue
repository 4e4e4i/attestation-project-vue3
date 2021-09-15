<template>
  <div class="app-table">
    <table class="app-table__container">
      <thead>
        <tr>
          <th
            v-for="(headerCell, index) in header"
            :key="headerCell._id"
          >
            <div class="app-table__cell-border">
              <app-textarea
                v-if="isEditable"
                :textarea-value="headerCell.text"
                :textarea-label="headerCell.value"
                class="app-table__input"
                @change-value="(value) => changeHeaderInput({ index, value })"
              />

              <span v-else>{{ headerCell.text }}</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="(row, rowIndex) in body"
        :key="row._id || rowIndex"
        class="app-table__row"
        :class="{
          'app-table__row--removed': row.status === 'removed',
          'app-table__row--changed': row.status === 'changed',
          'app-table__row--new': row.status === 'new'
        }"
      >
        <td
          v-for="(cell, cellIndex) in row.cells"
          :key="cell._id || cellIndex"
        >
          <div class="app-table__cell-border">
            <app-textarea
              v-if="isEditable"
              :textarea-value="cell.text"
              :textarea-label="cell.value"
              class="app-table__input"
              @input-value="(value) => changeBodyInput({ rowIndex, cellIndex, value })"
            />

            <vue-showdown
              v-else
              class="app-table__markdown"
              :markdown="cell.text"
              flavor="github"
            />
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import AppTextarea from '@/components/base/app-textarea.vue'

import { VueShowdown } from 'vue-showdown'
import PerfectScrollbar from 'perfect-scrollbar'

import { ChangedBodyRow, ChangedHeaderCell, TableBody, TableHeader } from '@/services/interfaces/table'

export default defineComponent({
  name: 'app-table',

  components: {
    AppTextarea,
    VueShowdown
  },

  props: {
    header: {
      type: Array as PropType<TableHeader>,
      default: () => []
    },

    body: {
      type: Array as PropType<TableBody>,
      default: () => []
    },

    isEditable: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      scrollbarInstance: null as unknown as PerfectScrollbar
    }
  },

  computed: {
    bodyLength () {
      return this.body.length
    }
  },

  methods: {
    changeHeaderInput (changedCell: ChangedHeaderCell) {
      this.$emit('change-header', changedCell)
    },

    changeBodyInput (changedRow: ChangedBodyRow) {
      this.$emit('change-body-row', changedRow)
    }
  },

  mounted () {
    this.scrollbarInstance = new PerfectScrollbar('tbody')
  },

  beforeUnmount () {
    this.scrollbarInstance.destroy()
  },

  watch: {
    bodyLength () {
      this.$nextTick(() => {
        this.scrollbarInstance.update()
      })
    }
  }
})
</script>

<style lang="scss">
@import "~perfect-scrollbar/css/perfect-scrollbar.css";

.app-table {
  color: $white;
  display: flex;
  flex-direction: column;

  &__container {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    border-collapse: collapse;
  }

  tr, thead {
    display: table;
    width: 100%;
    table-layout: fixed;/* even columns width , fix width of table too*/
    border-collapse: collapse;
    box-sizing: border-box;
  }

  thead {
    position: relative;
    margin-bottom: 15px;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 0;
      right: 0;
      height: 4px;
      background: url("../../assets/img/white_line.png") repeat-x;
      object-fit: contain;
    }
  }

  tbody {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-bottom: 5px;
    overflow: hidden;
  }

  th, td {
    height: 70px;
    border: none;
  }

  &__cell-border {
    box-sizing: border-box;
    height: 100%;
    padding: 5px;
    border: solid transparent;
    border-width: 10px;
    border-image: url("../../assets/img/white_border.png") 4% repeat round;
    overflow: hidden;
  }

  &__row {
    flex: 1;

    &:last-of-type {
      td {
        //border-bottom: none;
      }
    }

    &--removed {
      background-color: rgba($red, 0.4);
    }

    &--changed {
      background-color: rgba($blue, 0.4);
    }

    &--new {
      background-color: rgba($green, 0.4);
    }
  }

  &__input {
    width: 100%;
    padding: 0;
    box-sizing: border-box;
  }

  &__markdown {
    height: 100%;

    ul {
      list-style: initial;
    }
  }
}
</style>
