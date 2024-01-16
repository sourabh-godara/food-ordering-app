import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a category Name"],
      maxlength: 32,
    },
    imageUrl:{
        type: String,
        required: [true, "Please add a category Image"]
    },
    isActive:{
      type:Boolean,
      default:true
    }
},
  { timestamps: true }
);

export const Category =  mongoose.models.Category || mongoose.model('Category', categorySchema);
