-- Row Level Security Policies for ClipperCuts

-- Barbers table policies
-- Anyone can view barbers
CREATE POLICY "Barbers are viewable by everyone" ON barbers
  FOR SELECT USING (true);

-- Only authenticated users can insert, update, delete barbers
CREATE POLICY "Barbers can be managed by authenticated users only" ON barbers
  FOR ALL USING (auth.role() = 'authenticated');

-- Services table policies
-- Anyone can view services
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

-- Only authenticated users can insert, update, delete services
CREATE POLICY "Services can be managed by authenticated users only" ON services
  FOR ALL USING (auth.role() = 'authenticated');

-- Bookings table policies
-- Customers can view their own bookings
CREATE POLICY "Customers can view their own bookings" ON bookings
  FOR SELECT USING (
    auth.uid() IS NULL OR -- Allow anonymous bookings for now
    customer_email = auth.email()
  );

-- Customers can create bookings
CREATE POLICY "Customers can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can update or delete bookings
CREATE POLICY "Bookings can be managed by authenticated users only" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Bookings can be deleted by authenticated users only" ON bookings
  FOR DELETE USING (auth.role() = 'authenticated');

-- Barber schedules table policies
-- Anyone can view barber schedules
CREATE POLICY "Barber schedules are viewable by everyone" ON barber_schedules
  FOR SELECT USING (true);

-- Only authenticated users can insert, update, delete barber schedules
CREATE POLICY "Barber schedules can be managed by authenticated users only" ON barber_schedules
  FOR ALL USING (auth.role() = 'authenticated');

-- Testimonials table policies
-- Anyone can view approved testimonials
CREATE POLICY "Approved testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_approved = true);

-- Anyone can create testimonials
CREATE POLICY "Anyone can create testimonials" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can update or delete testimonials
CREATE POLICY "Testimonials can be managed by authenticated users only" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Testimonials can be deleted by authenticated users only" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Settings table policies
-- Only authenticated users can view, insert, update, delete settings
CREATE POLICY "Settings can be managed by authenticated users only" ON settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Special dates table policies
-- Anyone can view special dates
CREATE POLICY "Special dates are viewable by everyone" ON special_dates
  FOR SELECT USING (true);

-- Only authenticated users can insert, update, delete special dates
CREATE POLICY "Special dates can be managed by authenticated users only" ON special_dates
  FOR ALL USING (auth.role() = 'authenticated');
