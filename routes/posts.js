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
      data: list,
    })
  } catch ({ errors }) {
    errorHandle({ res, message: '資料錯誤', errors })
  }
})

router.delete('/', async (req, res) => {
  try {
  } catch {}
})

router.delete('/:id', async (req, res) => {
  try {
  } catch {}
})

router.patch('/:id', async (req, res) => {
  try {
  } catch {}
})

module.exports = router
