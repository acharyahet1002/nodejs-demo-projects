const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
  // res.send('All')
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })
  if (!task) {
    const error = new Error('Not Found')
    error.status = 404
    return next(createCustomError('Task Not Found', 404))
  }
  res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true, //for getting new value
    runValidators: true,
    // overwrite: true  when using put method,if not passed in body, old value is used, this behaviour is default in patch
  })
  if (!task) {
    return next(createCustomError('Task Not Found', 404))
  }
  res.status(200).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findOneAndDelete({ _id: taskId })
  if (!task) {
    return next(createCustomError('Task Not Found', 404))
  }
  res.status(200).json({ task })
})

module.exports = { getAllTasks, deleteTask, updateTask, getTask, createTask }
