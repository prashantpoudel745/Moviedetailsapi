# Netflix Clone Backend

This is the backend for a Netflix clone application. It provides APIs for user authentication, movie/series management, and subscriptions. The frontend is yet to be developed.

## Features

- User authentication (Signup, Login, Logout)
- JWT-based authentication
- Movie and series management (CRUD operations)
- Subscription plans and payments
- Watch history and favorites

## Technologies Used

- **Node.js** with **Express.js** (Backend Framework)
- **PostgreSQL** with **Sequelize** (Database ORM)
- **Prisma** (Database management)
- **JWT** (Authentication)
- **Stripe or Razorpay** (For Payment Gateway)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/prashantpoudel745/Moviedetailsapi
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```sh
   PORT=5000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get a token
- `POST /api/auth/logout` - Logout a user

### Movies & Series
- `GET /api/movies` - Get all movies
- `POST /api/movies` - Add a new movie
- `GET /api/movies/:id` - Get a specific movie
- `PUT /api/movies/:id` - Update movie details
- `DELETE /api/movies/:id` - Delete a movie

### Subscription
- `GET /api/subscription/plans` - Get available plans
- `POST /api/subscription/subscribe` - Subscribe to a plan

## Future Improvements
- Integration with the frontend
- Enhanced recommendation system
- Multi-user profiles

## Contribution
Feel free to fork the repository and submit pull requests!

## License
This project is licensed under the MIT License.

