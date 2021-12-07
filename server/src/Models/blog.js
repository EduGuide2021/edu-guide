import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    isApproved: {
        type: Boolean,
        required: true
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

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
