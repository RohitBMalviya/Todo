import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    task: [
      {
        subTask: {
          type: String,
          required: true,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
        startDuration: {
          type: Date,
          default: Date.now(),
          required: true,
        },
        endDuration: {
          type: Date,
          default: Date.now(),
          required: true,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
