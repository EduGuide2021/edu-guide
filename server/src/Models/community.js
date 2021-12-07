import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

const Community = mongoose.model('Community', communitySchema);

export default Community;
