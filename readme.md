# MERN Bookstore Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) bookstore application with role-based functionalities for users and admins. It uses Context API and Redux Toolkit for state management, Redux Toolkit Query for API fetching, Firebase for Google authentication, and features an intuitive UI for managing books and user carts.Also special dashboard for admin to manage their books and get real time data of it.

---

## How to Start

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/jithu5/Book-store.git

   cd Book-store
   ```

2. Navigate to the backend folder:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend server:

   ```bash
   npm run dev
   ```

---

## Technologies Used

- **Frontend**: React, Redux Toolkit, Context API, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase for Google Authentication, JWT for secure token-based authentication
- **State Management**: Context API and Redux Toolkit
- **Image Upload**: Cloudinary for uploading images

## Future Enhancements

- Add payment gateway integration
- Implement advanced analytics for admin users
- Improve search and filter functionalities for books
- Add wishlist feature for users

---

## Features

### User Features

- Register and Login (Google Authentication via Firebase, Google's email and password authentication)
- Add books to the cart
- Remove books from the cart
- View and manage their cart
- Checkout functionality

### Admin Features

- Register and Login
- Create, update, and delete books
- View all books they have created
- View the number of users who have added a specific book to their cart
- Retrieve detailed data about their books

---

## Environment Variables

Create a `.env` file in the provided directories and add the following:

### Client

```env
VITE_SERVER_URL= <Your Server Url>
FIREBASE_API_KEY=<Your Firebase API Key>
FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>
FIREBASE_PROJECT_ID=<Your Firebase Project ID>
VITE_FIREBASE_STORAGE_BUCKET=<Your Firebase storage Bucket>
VITE_FIREBASE_MESSAGING_SENDER_ID=<Your Firebase Sender ID>
VITE_FIREBASE_APP_ID=<Your Firebase App ID>

```

### server

```env
MONGODB_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
CLIENT_URI=<Your Client URI>
PORT=<Your Server Port>
ADMIN_SECRET=<Secret Code for Admin Authenticaton>
CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
CLOUDINARY_API_KEY=<Your Cloudinary API Key>
CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
```

---

## API Endpoints

### Admin APIs

- **POST** `/api/admin/register`: Register a new admin
- **POST** `/api/admin/login`: Admin login
- **GET** `/api/admin/book-users`: Get a list of users that have added admins book to their cart
- **GET** `/api/admin/books`: Get all books that admin has created
- **GET** `/api/admin`: Get admin's data
- **POST** `/api/admin/logout`: Logout admin

### User APIs

- **POST** `/api/user/register`: Register a new user
- **POST** `/api/user/login`: User login
- **GET** `/api/user/cart`: Get cart Books
- **POST** `/api/user/logout`: Logout user

### Book API

#### Admin

- **POST** `/api/books/create-book`: Create a new Book  
- **PUT** `/api/books/edit/:bookId`: Update a Book by its id
- **DELETE** `/api/books/delete/:bookId`: Delete a Book  by its id

#### User

- **GET** `/api/books`: Get all books
- **GET** `/api/books/:bookId`: Get book by its id
- **POST** `/api/books/add-cart/:bookId`: Add a new Book to user's cart
- **DELETE** `/api/books/remove-cart/:cartId`: Remove a Book from user's cart by cart data (schema) id

---

## Models

- **Admin Model**: Data model for the admin
- **User Model**: Data model for the user
- **Book Model**: Data model for the books
- **Cart Model**: Data model for the cart

Feel free to contribute or suggest improvements to make this project even better!
