import { Schema, model } from 'mongoose';

const modalSchema = new Schema({
  userId: { type: String, required: true },
  character: {
    name: { type: String, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
  },
});

const Modal = model('Modal', modalSchema);

export default Modal;
