const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入姓名'],
    },
    tags: [
      {
        type: String,
        required: [true, '請輸入貼文標籤'],
      },
    ],
    type: {
      type: String,
      // 允許輸入的集合
      enum: ['group', 'person'],
      required: [true, '請輸入貼文類型'],
    },
    image: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: [true, '請輸入貼文內容'],
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    versionKey: false,
  }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post
