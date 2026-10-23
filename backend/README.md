# Shazlo Backend - Pre-Registration System

A Node.js/Express backend with MongoDB for handling pre-registration functionality.

## Features

- User pre-registration with email, name, and preferences
- Email validation and duplicate prevention
- Interest tracking and referral source analytics
- Rate limiting and security middleware
- MongoDB Atlas integration
- RESTful API design

## Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Environment Setup:**

   - Copy `.env.example` to `.env`
   - Update the MongoDB connection string with your credentials:

   ```
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority
   ```

   - Generate a strong JWT secret
   - Update CORS origin to match your frontend URL

3. **Database Setup:**
   - The application will automatically create the database and collections
   - Make sure your MongoDB Atlas cluster is running
   - Whitelist your IP address in MongoDB Atlas Network Access

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on port 5000 (or the port specified in your .env file).

## API Endpoints

### Pre-Registration

- **POST** `/api/preregister/register`

  - Register a new user for pre-registration
  - Body: `{ email, name, phone?, interests?, referralSource?, notificationPreferences? }`

- **GET** `/api/preregister/check/:email`

  - Check if an email is already registered

- **GET** `/api/preregister/confirm/:token`

  - Confirm email with confirmation token

- **GET** `/api/preregister/stats`
  - Get registration statistics (admin endpoint)

### Health Check

- **GET** `/api/health`
  - API health check

## Data Models

### PreRegister Schema

```javascript
{
  email: String (required, unique),
  name: String (required),
  phone: String (optional),
  interests: [String],
  referralSource: String,
  notificationPreferences: {
    email: Boolean,
    sms: Boolean
  },
  status: String (pending, confirmed, notified),
  confirmationToken: String,
  ipAddress: String,
  userAgent: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- Helmet.js for security headers
- Rate limiting (100 requests per 15 minutes globally, 5 registrations per 15 minutes per IP)
- Input validation and sanitization
- CORS protection
- MongoDB injection protection

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
```

## Development

### Adding New Features

1. Create new routes in `/routes`
2. Add data models in `/models`
3. Update server.js to include new routes
4. Test endpoints using tools like Postman or curl

### Database Queries

The application uses Mongoose for MongoDB operations. Key features:

- Automatic validation
- Pre/post middleware hooks
- Static methods for complex queries
- Indexing for performance

## Deployment

### MongoDB Atlas Setup

1. Create a cluster in MongoDB Atlas
2. Create a database user
3. Whitelist IP addresses
4. Get connection string and update .env

### Production Deployment

1. Set NODE_ENV=production
2. Update CORS_ORIGIN to your production frontend URL
3. Use a strong JWT_SECRET
4. Consider using PM2 for process management
5. Set up SSL/TLS certificates
6. Configure reverse proxy (nginx)

## Monitoring

- Health check endpoint at `/api/health`
- Console logging for development
- Consider adding production logging (Winston, etc.)

## Testing

```bash
npm test
```

Currently uses basic error handling. Consider adding:

- Unit tests (Jest)
- Integration tests
- API testing (Supertest)

## License

MIT
