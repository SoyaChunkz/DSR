const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dsrSchema = new Schema({
  srNo: {
    type: Number,
    required: true,
  },
  componentName: {
    type: String,
    required: true,
  },
  config: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  pod: {
    type: Date,
    required: true,
  },
  vendor: {
    type: String,
    required: true,
  },
  purchaseOrderNum: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  perUnitPrice: {
    type: Number,
    required: true,
  },
  balanceAmt: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  locationOfComponent: {
    type: String,
    required: true,
  },
  validatedBy: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: false,
  }
});

const Dsr = mongoose.model('dsrSchema', dsrSchema);

module.exports = Dsr;
