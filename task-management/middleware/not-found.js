const notFound = (req, res, next) => {
  res.status(404).send('Route Does not Exist!')
}

module.exports = notFound
