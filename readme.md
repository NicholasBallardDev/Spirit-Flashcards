# Spirit Flashcards

## Project Description

Spirit Flashcards is a web application designed to help users learn new concepts through digital flashcards. My main goal in creating Spirit is to create a free alternative to Quizlet, and implement premium features such as spaced repetition and adding images to your card sets free of charge.

## Tools Used

This project uses the following technologies:

### Frontend

- **[![Next][Next.js]][https://nextjs.org/]**

### Backend

- **[NestJS](https://nestjs.com/)**

### Database & ORM

- **[PostgreSQL](https://www.postgresql.org/)**
- **[TypeORM](https://typeorm.io/)**

## Getting Started

To run Spirit locally follow these steps.

### Prerequisites Downloads

- Node.js
- PostgreSQL

### Installation

1. Clone the repo
2. Install NPM packages

   **Frontend**

   ```sh
   cd spirit-frontend
   npm install
   ```

   **Backend**

   ```sh
   cd spirit-flashcard-api
   npm install
   ```

### Running the Application Locally

**Frontend (Next.js)**

To run the frontend development server, navigate to the `spirit-frontend` directory and run:

```sh
npm run dev
```

The application will be available at http://localhost:4000.

**Backend (NestJS)**

To run the backend server, navigate to the `spirit-flashcard-api` directory and run:

```sh
npm run start:dev
```

The API will be running at http://localhost:3000.
