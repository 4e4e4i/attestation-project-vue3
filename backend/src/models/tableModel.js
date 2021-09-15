import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const tableCellSchema = new Schema({
  value: 'string',
  text: 'string'
});

const tableRowSchema = new Schema({
  cells: [tableCellSchema]
})

const tableSchema = new Schema({
  header: [tableCellSchema],
  body: [tableRowSchema]
})


const TableSchema = mongoose.model('Table', tableSchema);



export default TableSchema;
