import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
  },
  agencia: {
    type: Number,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const accountModel = mongoose.model("accounts", accountSchema, "accounts");

export { accountModel };
