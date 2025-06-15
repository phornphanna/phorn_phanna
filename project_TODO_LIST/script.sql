create database todolist_db 
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
CREATE TABLE  tasks (
  id INT unsigned  AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false, 
  due_date datetime
);

