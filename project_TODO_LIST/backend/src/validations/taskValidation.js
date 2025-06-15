const Joi = require('joi');

const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean().valid(true, false),
    due_date: Joi.string().isoDate().required()
});

const updateTaskSchema = Joi.object({
    title: Joi.string().required(),
    completed: Joi.boolean().valid(true, false), 
    due_date: Joi.string().isoDate().required()
});

const updateTaskStatusSchema = Joi.object({
    completed: Joi.boolean().valid(true, false).required()
})

module.exports = { createTaskSchema, updateTaskSchema  , updateTaskStatusSchema };