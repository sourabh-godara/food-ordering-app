import mongoose, { InferSchemaType, Model } from "mongoose";
import { Types } from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          default: 1,
          minimum: 0,
        },
      },
    ],
    total_quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export type CartType = InferSchemaType<typeof cartSchema> & {
  _id: Types.ObjectId;
};

const Cart =
  (mongoose.models.Cart as Model<CartType>) ||
  mongoose.model<CartType>("Cart", cartSchema);

export default Cart;
