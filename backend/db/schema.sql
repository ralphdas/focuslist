-- Disable foreign key constraints
PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `todos`;

-- Create tables
CREATE TABLE `users` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `username` TEXT NOT NULL,
    `clerk_id` TEXT NOT NULL UNIQUE
);

CREATE TABLE `todos` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL DEFAULT '',
    `user_id` INTEGER NOT NULL,
    `status` TEXT NOT NULL DEFAULT 'pending' CHECK(`status` IN ('pending', 'done')),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX `idx_todos_user_id` ON `todos` (`user_id`);
CREATE INDEX `idx_users_username` ON `users` (`username`);

-- Re-enable foreign key constraints
PRAGMA foreign_keys = ON;