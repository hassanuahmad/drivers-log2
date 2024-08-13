# Drivers Log

(Version 2) A comprehensive web app designed for driving instructors to manage lessons, track student progress, and oversee vehicle maintenance. It offers detailed daily, weekly, monthly, and yearly reports. Instructors can individually monitor each student's lessons and conveniently download reports in Word format.

## Tech Stack

-   NextJS
-   TailwindCSS
-   Supabase
-   Stripe
-   Mailgun

## Development Setup

### Prerequisites

-   Node.js: [Download and Install Node.js](https://nodejs.org/)
-   Supabase: [Create an account and start a project on Supabase](https://supabase.com/). Then, add the necessary environment variables to your `.env` file.
-   Stripe: [Create an account on Stripe](https://stripe.com/) and add the required environment variables to your `.env` file.
-   Mailgun: [Create an account on Mailgun](https://www.mailgun.com/) and add the credentials to your Supabase settings.

### Installation

1. Clone this repository:

```bash
git clone git@github.com:hassanuahmad/drivers-log2.git
```

2. Install project dependencies:

```bash
npm install
```

3. Copy the `.env.example` file and rename it to `.env`. Update the variables with appropriate values:

```env
NEXT_PUBLIC_BASE_URL='your-base-url like http://localhost:3000'

# the following are variables for supabase
NEXT_PUBLIC_SUPABASE_URL='your-supabase-url'
NEXT_PUBLIC_SUPABASE_ANON_KEY='your-supabase-anon-key'
SUPABASE_ADMIN='your-supabase-admin-key'

# the following are variables for stripe
STRIPE_SECRET_KEY='your-stripe-secret-key'
STRIPE_WEHBOOK_SECRET='your-stripe-webhook-secret'
STRIPE_PRICE_ID='your-product-price-id'

NEXT_PUBLIC_GOOGLE_PLACES_API='your-google-places-api-key'

# the following are variables for special instructor features
NEXT_PUBLIC_INSTRUCTOR_ID='instructor-id'
NEXT_PUBLIC_INSTRUCTOR_NAME='instructor-name'
NEXT_PUBLIC_INSTRUCTOR_LICENCE='instructor-licence-number'
NEXT_PUBLIC_INSTRUCTOR_LICENCE_EXPIRY='instructor-licence-expiry'
NEXT_PUBLIC_ONTARIO_LICENCE='instructor-ontario-licence-number'
```

### Development

Start the Next.js development server:

```bash
npm run dev
```

Your development environment is now set up and running. Access the site at [http://localhost:3000](http://localhost:3000).
