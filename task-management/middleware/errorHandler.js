const { CustomError } = require('../errors/custom-error')
const errorHandleMid = (err, req, res, next) => {
  console.log(err)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something Went Wrong' })
}

module.exports = errorHandleMid
