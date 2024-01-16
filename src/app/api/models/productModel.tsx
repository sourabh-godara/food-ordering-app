import mongoose from 'mongoose';

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
      /* type:mongoose.SchemaTypes.ObjectId, */
      type:String,
      /* ref: "Category", */
      //required: [true, "Product must belong to a category"],
    },
    isCombo: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      required: [true, "Please add a quantity"],
      default: 1,
    },
  },
  { timestamps: true }
);

export const Product =  mongoose.models.Product || mongoose.model('Product', productSchema);
