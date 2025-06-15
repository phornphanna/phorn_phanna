const db = require("../configs/db");

class Task {
    async getAllTasks(search) {
        try {
            let sql = "SELECT * FROM tasks";
            let params = [];

            if(search) {
                sql += " WHERE title LIKE ?";
                params.push(`%${search}%`);
            }
            sql += " ORDER BY id DESC";
            const [rows] = await db.execute(sql, params);            
            return rows;
        } catch (error) {
            throw new Error("Failed to fetch tasks");
        }
    }
   
    async getTaskById(id) {
        try {
            const [rows] = await db.execute("SELECT * FROM tasks WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Failed to fetch task by ID");
        }
    }

    async createTask(data) {
        try {
            const [rows] = await db.execute("INSERT INTO tasks (title, completed , due_date) VALUES (?, ?, ?)",
                [
                    data.title, false, data.due_date
                ]);
            return {
                id: rows.insertId, 
                title: data.title,
                completed: data.completed,
                dueDate: data.due_date
            };
        } catch (error) {
            throw new Error("Failed to create task");
        }
    }

    async updateTask(id, data) {
        try {
            const [rows] = await db.execute("UPDATE tasks SET title = ?, completed = ? , due_date = ? WHERE id = ?", 
                [data.title, data.completed , data.due_date, id]
            );
            return {
                id: id, 
                title: data.title,
                completed: data.completed,
                dueDate: data.due_date
            };
        } catch (error) {
            throw new Error("Failed to update task");
        }
    }

    async deleteTask(id) {
        try {
            const [rows] = await db.execute("DELETE FROM tasks WHERE id = ?", [id]);
            return rows;
        } catch (error) {
            throw new Error("Failed to delete task");
        }
    }

    async updateTaskStatus(id, status) {
        try {
            const [rows] = await db.execute("UPDATE tasks SET completed = ? WHERE id = ?", [status, id]);
            return {
                id: id, 
                completed: status
            };
        } catch (error) {
            throw new Error("Failed to update task status");
        }
    }

    async isTaskExist(id) {
        try {
            const rows = await db.execute("SELECT * FROM tasks WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error("Failed to check task existence");
        }
    }

}

module.exports = new Task();