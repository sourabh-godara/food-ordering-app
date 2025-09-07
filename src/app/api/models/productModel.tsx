import mongoose, { InferSchemaType, Model, Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a product Name"],
      maxlength: 42,
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please add a product Description"],
      maxlength: 2000,
    },
    prices: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: String,
          required: true,
        },
      },
    ],
    imageUrl: {
      type: String,
    },
    category: {
      //type: mongoose.SchemaTypes.ObjectId,
      type: String,
      ref: "Category",
      //required: [true, "Product must belong to a category"],
    },
  },
  { timestamps: true }
);

export type ProductType = InferSchemaType<typeof productSchema> & {
  _id: Types.ObjectId;
};

const Product =
  (mongoose.models.Product as Model<ProductType>) ||
  mongoose.model<ProductType>("Product", productSchema);

export default Product;
