# Image Management API

A robust REST API for image upload and management built with Node.js, Express, and MongoDB. This application provides secure image storage with metadata management and efficient retrieval capabilities.

## Features

- Image upload with metadata storage
- Image download and retrieval
- Image metadata querying
- File type validation
- MongoDB storage with GridFS
- Comprehensive test suite
- File size limits and validation

## Prerequisites

- Node.js (v20.18.3 or later)
- MongoDB (v4.4 or later)
- Docker and Docker Compose
- NVM (Node Version Manager)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Testing**: Jest & Supertest
- **Image Processing**: Multer
- **Containerization**: Docker
- **Documentation**: Swagger/OpenAPI

## Project Structure

```
project-root/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── utils/          # Utility functions
├── tests/
│   ├── integration/    # Integration tests
│   └── unit/          # Unit tests
├── public/            # Static files
└── docs/             # Documentation
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd image-management
   ```

2. Install the correct Node.js version:

   ```bash
   nvm install
   nvm use
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Start MongoDB:

   ```bash
   docker-compose up -d
   ```

## Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## API Endpoints

### Image Upload

- **POST** `/api/images/upload`
  - Accepts multipart/form-data
  - Field name: `image`
  - Supports: JPEG, PNG, GIF, WebP
  - Max size: 5MB

### Image Retrieval

- **GET** `/api/images`

  - Returns list of all images with metadata
  - Excludes binary data

- **GET** `/api/images/:id`

  - Returns specific image with binary data
  - Sets appropriate content-type header

## Configuration

### Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/imagedb
NODE_ENV=development
```

### File Limits

- Maximum file size: 5MB
- Allowed types: image/jpeg, image/png, image/gif, image/webp

## Testing

The project includes both unit and integration tests:

- Unit tests for services and utilities
- Integration tests for API endpoints
- In-memory MongoDB for testing
- Automated test coverage reporting

## Error Handling

The API implements standardized error responses:

```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## License

ISC

## Author

[Your Name]
