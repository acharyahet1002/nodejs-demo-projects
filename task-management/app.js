// console.log('Task Manager App')
const connectDb = require('./db/connect')
const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found')
const errorHandleMid = require('./middleware/errorHandler')

require('dotenv').config()

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandleMid)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()
