-- Clear existing data
DELETE FROM `todos`;

-- Reset AUTOINCREMENT counters (SQLite does this automatically, but you can use this if needed)
DELETE FROM sqlite_sequence WHERE name='todos';


-- Insert sample data into `todos`
INSERT INTO `todos` (`title`, `description`, `clerk_external_id`, `status`) VALUES
('Buy groceries', 'Milk, eggs, bread, and butter', 'user_2yoqUwUhOwtFrmcW7SXiSfW2fpX', 'pending'),
('Finish report', 'Complete the financial report for Q2', 'user_2yoqUwUhOwtFrmcW7SXiSfW2fpX', 'done'),
('Book flights', 'Book tickets to Berlin for the team', 'user_2yoqUwUhOwtFrmcW7SXiSfW2fpX', 'pending'),
('Call plumber', 'Fix the kitchen sink leakage', 'user_2yoqUwUhOwtFrmcW7SXiSfW2fpX', 'pending');