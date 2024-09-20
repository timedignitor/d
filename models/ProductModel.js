import mongoose from 'mongoose';

// Define schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    Stock: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    productID: {
      type: String,
      unique: true,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

function generateUniqueProductID() {
  // Implement your logic to generate a unique product ID here
  // For example, you can use a combination of letters, numbers, and timestamps
  const uniqueID = "PROD-" + Date.now(); // Example logic, use your own
  return uniqueID;
}

productSchema.pre("save", function (next) {
  const product = this;
  if (!product.productID) {
    // Replace this logic with your own logic for generating a unique productID
    product.productID = generateUniqueProductID();
  }
  next();
});

// Create collection
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;

