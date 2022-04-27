const successHandle = ({
  res,
  statusCode = 200,
  message = '操作成功',
  data = [],
}) => {
  res.status(statusCode).json({
    status: 'Success',
    message,
    data,
  })
}

const errorMessageHandle = (errors) =>
  Object.values(errors).reduce((acc, cur) => {
    return (acc = [...acc, cur.message])
  }, [])

const errorHandle = ({
  res,
  statusCode = 400,
  message = '操作失敗',
  errors,
}) => {
  res.status(statusCode).json({
    status: 'Error',
    message,
    errors: errorMessageHandle(errors),
  })
}

module.exports = {
  successHandle,
  errorHandle,
}
