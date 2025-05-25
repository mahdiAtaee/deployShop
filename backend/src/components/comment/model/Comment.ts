import { model, Schema } from "mongoose";
import AdviceToBuy from "./AdviceToBuy";
import CommentStatus from "./CommentStatus";
import IComment from "./IComment";

const commentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  isBuyer: { type: Boolean, default: false },
  adviceToBuy: { type: Number, enum: AdviceToBuy, default: AdviceToBuy.NOT_SURE },
  status: { type: Number, enum: CommentStatus, default: CommentStatus.PENDING },
  createdAt: { type: Date, default: Date.now },
});

export default model<IComment>("Comment", commentSchema);
