-- Seed data for ClipperCuts barbershop booking system

-- Insert barbers
INSERT INTO barbers (name, role, image_url, experience, bio)
VALUES
  ('James Wilson', 'Master Barber', 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80', '10+ years', 'James is our most experienced barber with a passion for classic cuts and hot towel shaves.'),
  ('Michael Brown', 'Senior Barber', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80', '8 years', 'Michael specializes in modern styles and is known for his attention to detail.'),
  ('David Thompson', 'Style Specialist', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', '5 years', 'David is our creative expert who excels at trendy cuts and styling techniques.');

-- Insert services
INSERT INTO services (title, description, price, duration)
VALUES
  ('Classic Haircut', 'Traditional haircut with modern techniques. Includes consultation, shampoo, and styling.', 25.00, 30),
  ('Beard Trim', 'Expert beard shaping and trimming to enhance your facial features.', 15.00, 20),
  ('Hot Towel Shave', 'Luxurious straight razor shave with hot towel treatment for the ultimate smooth finish.', 30.00, 45),
  ('Hair & Beard Combo', 'Complete grooming package with haircut and beard trim for a polished look.', 35.00, 50);

-- Insert barber schedules (Monday to Saturday, 9 AM to 6 PM)
-- James Wilson
INSERT INTO barber_schedules (barber_id, day_of_week, start_time, end_time)
VALUES
  ((SELECT id FROM barbers WHERE name = 'James Wilson'), 1, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'James Wilson'), 2, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'James Wilson'), 3, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'James Wilson'), 4, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'James Wilson'), 5, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'James Wilson'), 6, '09:00:00', '16:00:00');

-- Michael Brown
INSERT INTO barber_schedules (barber_id, day_of_week, start_time, end_time)
VALUES
  ((SELECT id FROM barbers WHERE name = 'Michael Brown'), 1, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'Michael Brown'), 2, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'Michael Brown'), 3, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'Michael Brown'), 4, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'Michael Brown'), 5, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'Michael Brown'), 6, '09:00:00', '16:00:00');

-- David Thompson
INSERT INTO barber_schedules (barber_id, day_of_week, start_time, end_time)
VALUES
  ((SELECT id FROM barbers WHERE name = 'David Thompson'), 1, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'David Thompson'), 2, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'David Thompson'), 3, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'David Thompson'), 4, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'David Thompson'), 5, '09:00:00', '18:00:00'),
  ((SELECT id FROM barbers WHERE name = 'David Thompson'), 6, '09:00:00', '16:00:00');

-- Insert sample testimonials
INSERT INTO testimonials (customer_name, rating, comment, is_approved)
VALUES
  ('John D.', 5, 'Best haircut I''ve ever had! James really knows what he''s doing.', true),
  ('Mike S.', 5, 'Great atmosphere and professional service. Will definitely be back!', true),
  ('Robert K.', 4, 'Very satisfied with my beard trim. Michael has magic hands!', true);

-- Insert settings
INSERT INTO settings (key, value)
VALUES
  ('business_hours', '{"monday":"9:00-18:00","tuesday":"9:00-18:00","wednesday":"9:00-18:00","thursday":"9:00-18:00","friday":"9:00-18:00","saturday":"9:00-16:00","sunday":"closed"}'),
  ('contact_info', '{"phone":"+1 (555) 123-4567","email":"info@clippercuts.com","address":"123 Main Street, Anytown, USA"}'),
  ('booking_settings', '{"min_advance_hours":1,"max_advance_days":14,"slot_duration_minutes":30}');

-- Insert special dates (holidays for 2025)
INSERT INTO special_dates (date, description, is_closed)
VALUES
  ('2025-01-01', 'New Year''s Day', true),
  ('2025-07-04', 'Independence Day', true),
  ('2025-12-25', 'Christmas Day', true),
  ('2025-12-31', 'New Year''s Eve', false);
