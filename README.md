# Care.io

Trusted care for your loved ones. Book trained caregivers for children, elderly people and your family anywhere in Bangladesh, pay securely online and manage everything from one dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)

[Live Demo](https://careio.vercel.app)

## Features

- Sign up and log in with email and password or Google (NextAuth)
- Browse care services and book by date, time and hours
- Secure online payment with Stripe Checkout
- Booking confirmation email (Nodemailer)
- Dashboard with booking overview, booking history and payment history
- Give reviews after a service and manage them in My Reviews
- Delete booking information after the service is completed
- View and edit your profile
- Coverage across 8 regions and 64 districts of Bangladesh

## Services

| Service | Category |
| --- | --- |
| Trusted Child Care | `child-care` |
| Elder Care | `elder-care` |
| Personal Care Assistance | `personal-care` |
| Home Care Support | `home-care` |
| Special Needs Care | `special-care` |
| Flexible Care Plans | `care-plans` |

## Tech Stack

Next.js 16 (App Router), React 19, Tailwind CSS, daisyUI, NextAuth.js, MongoDB, Stripe, Nodemailer, bcryptjs, react-hot-toast, react-toastify, SweetAlert2, react-icons.

## Getting Started

**Requirements:** Node.js 20.9+, a MongoDB database, a Stripe account (test mode), a Google OAuth client and an SMTP email account.

```bash
git clone https://github.com/azizulnwu/Care.IO
cd care-io
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file (match the names to your code):

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
STRIPE_SECRET_KEY=sk_test_xxx
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
```

Never commit `.env.local`.

## Main Routes

| Route | Description |
| --- | --- |
| `/` | Home |
| `/all-service` | All services |
| `/service-page/[id]` | Service details |
| `/mission-vision` | Mission and vision |
| `/contact` | Contact |
| `/login`, `/register` | Authentication |
| `/dashboard` | User dashboard |
| `/my-profile` | Profile |
| `/booking/[serviceId]` | Book a service |
| `/api/checkout` | Creates a Stripe Checkout session |

## How Booking Works

1. Choose a service, date, time, hours and area. The total cost is calculated automatically.
2. Pay on Stripe's hosted checkout page. Test card: `4242 4242 4242 4242`.
3. After payment, the booking is saved and a confirmation email is sent.
4. Track bookings in the dashboard, then review or delete the booking once the service is completed.

## Security

- Passwords are hashed with bcryptjs
- Private pages require a NextAuth session and are not indexed by search engines
- Card details are handled by Stripe and never stored on Care.io servers
- Secrets are kept in environment variables

## Deployment

Deploy on [Vercel](https://vercel.com/): add the environment variables, set `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your domain, and add `https://your-domain.com/api/auth/callback/google` to your Google OAuth redirect URIs.

## Contributing

Fork the repo, create a branch, commit your changes and open a Pull Request.

## License

MIT

## Contact

support@care.io · Khulna, Bangladesh