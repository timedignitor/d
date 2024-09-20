import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.name} @ ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

export default connectdb;


