import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  text: string;
  completed: boolean;
  createdAt: Date;
}

const todoSchema = new Schema<ITodo>({
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
