import { Schema } from "mongoose";

const AddressSchema: Schema = new Schema({
  title: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  zipCode: { type: String },
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
});

export default AddressSchema;
