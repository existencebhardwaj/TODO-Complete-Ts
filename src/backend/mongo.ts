import mongoose, { Document, Model } from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/react-login-tut")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log('failed');
  });

interface ICollection extends Document {
  email: string;
  password: string;
}

const newSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection: Model<ICollection> = mongoose.model("collection", newSchema);

export default collection;
