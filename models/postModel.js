import mongoose from 'mongoose'

const commentSchema = mongoose.Schema(
    {
      post_title: { type: String, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
  );

const postSchema = mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    post_title: {
      type: String,
      required: true,
    },
    post_content: {
      type: String,
      required: true,
    },
    image: {
        type: String,
        required: false,
      },

      comment: [commentSchema],
  },
  {
    timestamps: true,
  }
)


const Post = mongoose.model('Post', postSchema)

export default Post