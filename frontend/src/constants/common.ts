export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE'
}

export const TABLE_ACTIONS = {
  EDIT: {
    name: 'Редактировать',
    type: 'edit'
  },
  CANCEL_EDIT: {
    name: 'Отменить изменения',
    type: 'cancelEdit'
  },
  SAVE_EDIT: {
    name: 'Сохранить',
    type: 'saveEdit'
  },
  REMOVE_ROW: {
    name: 'Удалить строку',
    type: 'removeRow'
  },
  ADD_ROW_BEFORE: {
    name: 'Добавить строку сверху',
    type: 'addRowBefore'
  },
  ADD_ROW_AFTER: {
    name: 'Добавить строку снизу',
    type: 'addRowAfter'
  }
}
