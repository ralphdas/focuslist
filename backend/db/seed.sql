-- Clear existing data
DELETE FROM `todos`;
DELETE FROM `users`;

-- Reset AUTOINCREMENT counters (SQLite does this automatically, but you can use this if needed)
DELETE FROM sqlite_sequence WHERE name='todos';
DELETE FROM sqlite_sequence WHERE name='users';

-- Insert sample data into `users`
INSERT INTO `users` (`id`, `username`, `clerk_id`) VALUES
(1, 'john_doe', 'clerk_123'),
(2, 'jane_smith', 'clerk_456'),
(3, 'alice_jones', 'clerk_789');

-- Insert sample data into `todos`
INSERT INTO `todos` (`title`, `description`, `user_id`, `status`) VALUES
('Buy groceries', 'Milk, eggs, bread, and butter', 1, 'pending'),
('Complete project', 'Finish the report and send it to the manager', 2, 'done'),
('Workout', 'Go to the gym for an hour', 3, 'pending'),
('Read a book', 'Start reading "The Great Gatsby"', 1, 'pending'),
('Plan vacation', 'Research destinations and book flights', 2, 'pending');