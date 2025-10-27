import { model, Schema } from "mongoose";

const commentsSchema = new Schema({
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  blog: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
},{
    timestamps: true,
});

const Comments = model("Comments", commentsSchema);

export default Comments;
