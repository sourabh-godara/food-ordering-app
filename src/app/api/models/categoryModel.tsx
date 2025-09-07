import mongoose, { InferSchemaType, Model, Types } from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a category Name"],
      maxlength: 32,
    },
    imageUrl: {
      type: String,
      required: [true, "Please add a category Image"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export type CategoryType = InferSchemaType<typeof categorySchema> & {
  _id: Types.ObjectId;
};

const Category =
  (mongoose.models.Category as Model<CategoryType>) ||
  mongoose.model<CategoryType>("Category", categorySchema);

export default Category;
