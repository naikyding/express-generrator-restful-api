const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const postDBConnect = require('./DB/post')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

const app = express()
postDBConnect()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

// 404 不存在 api
app.use((req, res, next) => {
  res.status(404).send('不存在的 API')
})

// 500 程式錯誤
app.use((err, req, res, next) => {
  res.status(500).send(`程式錯誤: ${err}`)
})
module.exports = app
