import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, unique: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true },
  types: [String],
  image: String,
});

export const Article = mongoose.model("Article", articleSchema);
