const { Router } = require('express')
const router = Router()
const Post = require('../model/post')

const { successHandle, errorHandle } = require('../utils/responseHandle')

const getPostsHandle = async (res) => {
  try {
    const list = await Post.find()
    return list
  } catch {
    errorHandle({ res, message: '取得 posts 列表錯誤' })
  }
}

// 取得列表
router.get('/', async (req, res) => {
  try {
    const list = await getPostsHandle(res)
    successHandle({
      res,
      data: list,
    })
  } catch {
    errorHandle({ res, message: '發生問題，無法取得列表' })
  }
})

// 新增 posts
router.post('/', async (req, res) => {
  try {
    const { name, tags, type, image, content, like, comments } = req.body

    await Post.create({
      name,
      tags,
      type,
      image,
      content,
      like,
      comments,
    })

    const list = await getPostsHandle(res)
    successHandle({
      res,
      statusCode: 201,
      data: list,
    })
  } catch ({ errors }) {
    errorHandle({ res, message: '資料錯誤', errors })
  }
})

router.delete('/', async (req, res) => {
  try {
    await Post.deleteMany({})
    const list = await getPostsHandle(res)
    successHandle({
      res,
      statusCode: 201,
      data: list,
    })
  } catch {
    errorHandle({ res })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const resData = await Post.findByIdAndDelete(req.params.id)
    if (!resData) throw false

    const list = await getPostsHandle(res)
    successHandle({
      res,
      statusCode: 201,
      data: list,
    })
  } catch {
    errorHandle({ res })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const { name, tags, type, image, content, likes, comments } = req.body

    const updateItem = await Post.findByIdAndUpdate(
      id,
      {
        name,
        tags,
        type,
        image,
        content,
        likes,
        comments,
      },
      { runValidators: true }
    )

    if (!updateItem) throw false

    const list = await getPostsHandle(res)
    successHandle({
      res,
      statusCode: 200,
      data: list,
    })
  } catch ({ errors }) {
    errorHandle({ res, errors })
  }
})

module.exports = router
