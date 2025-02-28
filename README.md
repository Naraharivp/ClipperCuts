# ClipperCuts - Barbershop Booking Website

ClipperCuts is a modern, responsive web application for a barbershop that allows customers to view services, select a barber, and book appointments. Barbers can manage their schedules and bookings via an admin panel.

## Features

### Customer Features
- Browse services and pricing
- View barber profiles and specialties
- Book appointments by selecting a date, time, service, and barber
- Responsive design for mobile and desktop

### Admin Features
- Dashboard with booking statistics
- Manage bookings (view, update status, cancel)
- Manage barbers (add, edit, remove)
- Manage services (add, edit, remove)
- Configure business settings (hours, pricing, etc.)

## Tech Stack

- **Frontend Framework:** Next.js 14 (App Router)
- **UI Library:** Tailwind CSS with Radix UI components
- **Backend:** Supabase (Authentication, Database, Storage)
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18.17.0 or later
- npm or yarn

### Setting Up Environment Variables

1. Copy the `.env.local.example` file to a new file named `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Update the Supabase credentials in `.env.local` with your own Supabase project credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. For development purposes, you can bypass authentication by setting:
   ```
   NEXT_PUBLIC_BYPASS_AUTH=true
   ```
   Note: Only use this in development, never in production!

### Authentication Troubleshooting

If you encounter authentication issues:

1. Make sure your Supabase credentials are correct in `.env.local`
2. Check that you have created users in your Supabase authentication system
3. For testing purposes, you can enable bypass authentication in development mode
4. Clear your browser cookies if you're experiencing persistent login issues

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/clippercuts.git
cd clippercuts
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up Supabase:
   - Create a new project in [Supabase](https://app.supabase.com)
   - Go to the SQL Editor in your Supabase dashboard
   - Run the SQL scripts in the `supabase` directory in the following order:
     - First run `schema.sql` to create the tables
     - Then run `policies.sql` to set up security policies
     - Finally run `seed.sql` to populate the database with initial data
   - Copy your Supabase URL and anon key from Project Settings > API and update your `.env.local` file

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Database Schema

The database consists of the following tables:

- `barbers`: Information about the barbers
- `services`: List of services offered by the barbershop
- `bookings`: Customer booking information
- `barber_schedules`: Working hours for each barber
- `testimonials`: Customer reviews and testimonials
- `settings`: Application settings
- `special_dates`: Holidays and special events

## Project Structure

```
clippercuts/
├── app/                  # Next.js app directory
│   ├── admin/            # Admin panel pages
│   ├── booking/          # Booking page
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Landing page
├── components/           # Reusable components
│   ├── ui/               # UI components
│   ├── Footer.jsx        # Footer component
│   └── Navbar.jsx        # Navigation component
├── lib/                  # Utility functions
│   ├── supabase.js       # Supabase client and helpers
│   └── utils.js          # Utility functions
├── public/               # Static assets
├── supabase/             # Supabase setup scripts
│   ├── schema.sql        # Database schema
│   ├── policies.sql      # Security policies
│   └── seed.sql          # Initial data
├── .env.local.example    # Example environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
└── tailwind.config.js    # Tailwind CSS configuration

## Deployment

The application can be deployed to Vercel with the following steps:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy

## License

This project is licensed under the MIT License.
