-- Disable foreign key constraints
PRAGMA foreign_keys = OFF;

-- Drop existing tables
DROP TABLE IF EXISTS `todos`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `username` TEXT NOT NULL UNIQUE,
    `clerk_external_id` TEXT NOT NULL UNIQUE,
);

CREATE TABLE `todos` (
    `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `title` TEXT NOT NULL,
    `description` TEXT NOT NULL DEFAULT '',
    `user_id` INTEGER NOT NULL,
    `status` TEXT NOT NULL DEFAULT 'pending' CHECK(`status` IN ('pending', 'done'))
);

-- Create indexes
CREATE INDEX `idx_todos_user_id` ON `todos` (`user_id`);
CREATE INDEX `idx_users_clerk_external_id` ON `users` (`clerk_external_id`);
CREATE INDEX `idx_todos_clerk_external_id` ON `todos` (`clerk_external_id`);

-- Re-enable foreign key constraints
PRAGMA foreign_keys = ON;