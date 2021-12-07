import mongoose from 'mongoose';

const specialtestSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

const SpecialTest = mongoose.model('SpecialTest', specialtestSchema);

export default SpecialTest;
