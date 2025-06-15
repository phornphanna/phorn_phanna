const Task = require("../models/task");
const { responseSuccess, responseFail } = require("../helpers/reponseHelper");
const { logError } = require("../configs/service");
const {createTaskSchema, updateTaskSchema} = require("../validations/taskValidation");


class TaskController {
    async getAllTasks(req, res) {
        try {
            const { search } = req.query;
            const tasks = await Task.getAllTasks(search);
          return  res.json(responseSuccess("success", tasks));
        } catch (error) {
            await logError("TaskController", error, res);

        }
    }

    async getTaskById(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.getTaskById(id);
            if (!task) await  res.status(404).json(responseFail("Task not found"));
            return res.json(responseSuccess("success", task));
        } catch (error) {
            await logError("TaskController", error.message , res);

        }
    }

    async createTask(req, res) {
        try {
           
             const { error } = createTaskSchema.validate(req.body);
            if (error) return await res.status(400).json(responseFail(error.details[0].message));
            const task = await Task.createTask(req.body);
          return res.json(responseSuccess("success", task));
        } catch (error) {
            await logError("TaskController", error, res);

        }
    }

    async updateTask(req, res) {
        try {
             const { error } = updateTaskSchema.validate(req.body);
            if (error) return await res.status(400).json(responseFail(error.details[0].message));
            const { id } = req.params;
            const isTask = await Task.isTaskExist(id);
             if (isTask.length === 0 ) await res.status(404).json(responseFail("Task not found"));
            const task = await Task.updateTask(id, req.body);

            return res.json(responseSuccess("success", task));
        } catch (error) {
            await logError("TaskController", error, res);

        }
    }

    async updateTaskStatus(req, res) {
        try {
            const { id } = req.params;
            const isTask = await Task.isTaskExist(id);
             if (isTask.length === 0 ) await res.status(404).json(responseFail("Task not found"));
            const task = await Task.updateTaskStatus(id, req.body.completed);
            return res.json(responseSuccess("success", task));
        } catch (error) {
            await logError("TaskController", error, res);

        }
    }

    async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const result = await Task.deleteTask(id);
            if (result.affectedRows === 0) {
                return res.status(404).json(responseFail("Task not found"));
            }
            res.json(responseSuccess("Task deleted successfully"));
        } catch (error) {
            await logError("TaskController", error, res);

        }
    }
}

module.exports = new TaskController();