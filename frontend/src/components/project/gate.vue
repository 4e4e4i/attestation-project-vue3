<template>
  <div class="gate">
    <button
      v-if="!isOpenTable"
      class="gate__btn"
      type="button"
      @click="openTable"
    >
      MB
    </button>

    <section
      v-else
      class="gate__table-container"
      :class="{
          'gate__table-container--loading': isFetchingTable,
          'gate__table-container--error': !!isError
        }"
    >
      <p v-if="isError">
        Что-то пошло не так. We are sorry.
      </p>

      <template v-else>
        <app-loader v-if="isFetchingTable"/>

        <editable-table
          v-if="initialTableData && !isFetchingTable"
          :data="initialTableData"
          @save-edit="saveTableData"
        />
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppLoader from '@/components/base/app-loader.vue'
import EditableTable from '@/components/project/editable-table.vue'

import { useTableService } from '@/services/modules/use-table-service'

export default defineComponent({
  name: 'Gate',

  components: {
    AppLoader,
    EditableTable
  },

  setup () {
    const {
      isFetchingTable,
      isError,
      initialTableData,
      methodsTableService: { fetchTableData, saveTableData }
    } = useTableService()

    return { isFetchingTable, initialTableData, isError, saveTableData, fetchTableData }
  },

  data () {
    return {
      isShakeAnimation: false,
      isOpenTable: false
    }
  },

  methods: {
    async openTable () {
      this.isOpenTable = true
      await this.fetchTableData()
    }
  }
})
</script>

<style lang="scss">
.gate {
  &__btn {
    position: absolute;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 60px;
    background-color: black;
    border-radius: 50%;
    cursor: pointer;
    transition: 500ms ease;
    animation: 3s infinite linear;
    animation-name: gate-color;
  }

  &__table-container {
    width: 80vw;
    max-height: 80vh;
    padding: 10px;
    background-color: rgba(black, 0.7);
    border-radius: 8px;

    &--loading {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 180px;
      width: 180px;
      border-radius: 50%;
    }

    &--error {
      height: auto;
      width: auto;
      color: white;
    }
  }
}

@keyframes gate-color {
  20% {
    box-shadow: 0 0 10px cadetblue;
  }
  40% {
    box-shadow: 2px 2px 10px cadetblue;
  }
  60% {
    box-shadow: 10px 10px 20px cadetblue;
  }
  80% {
    box-shadow: 5px 5px 10px cadetblue;
  }
}
</style>
