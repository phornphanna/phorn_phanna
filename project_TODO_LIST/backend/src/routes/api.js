const express = require('express');
const router = express.Router();
const  taskController = require('../controllers/taskController');



router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);
router.put('/tasks/status/:id', taskController.updateTaskStatus);






module.exports = router;