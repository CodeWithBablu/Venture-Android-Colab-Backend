import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
  }
});

orderSchema.set('timestamps', true);

const order = mongoose.model('orders', orderSchema);

export default order;