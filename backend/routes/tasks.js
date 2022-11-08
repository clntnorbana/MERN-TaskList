const express = require('express')
const { getAllTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getAllTasks)
router.get('/:id', getTask)
router.post('/', createTask)
router.delete('/:id', deleteTask)
router.patch('/:id', updateTask)

module.exports = router