# Supabase Setup for ClipperCuts

This directory contains SQL scripts to set up the Supabase database for the ClipperCuts barbershop booking website.

## Files

- `schema.sql`: Creates the database tables and enables Row Level Security (RLS)
- `policies.sql`: Sets up Row Level Security policies for each table
- `seed.sql`: Populates the database with initial data

## Setup Instructions

1. Create a new Supabase project at [https://app.supabase.com](https://app.supabase.com)
2. Go to the SQL Editor in your Supabase dashboard
3. Run the SQL scripts in the following order:
   - First run `schema.sql` to create the tables
   - Then run `policies.sql` to set up security policies
   - Finally run `seed.sql` to populate the database with initial data

## Environment Variables

After setting up your Supabase project, update the `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You can find these values in your Supabase dashboard under Project Settings > API.

## Database Schema

The database consists of the following tables:

- `barbers`: Information about the barbers
- `services`: List of services offered by the barbershop
- `bookings`: Customer booking information
- `barber_schedules`: Working hours for each barber
- `testimonials`: Customer reviews and testimonials
- `settings`: Application settings
- `special_dates`: Holidays and special events

## Row Level Security

Row Level Security is enabled for all tables with the following policies:

- Public tables (viewable by everyone): barbers, services, barber_schedules, approved testimonials, special_dates
- Protected tables (manageable by authenticated users only): settings
- Mixed access tables: bookings, testimonials (customers can create, admins can manage)

## Next Steps

After setting up the database, you'll need to:

1. Update the `.env.local` file with your Supabase credentials
2. Connect the front-end components to the Supabase API
3. Implement the booking functionality to save data to Supabase
