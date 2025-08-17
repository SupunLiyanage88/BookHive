# Library Management System

A full-stack library management application built with React (Vite) frontend and Spring Boot backend, featuring JWT authentication and comprehensive book and rental management.

## 🚀 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Material-UI (MUI)** for UI components
- **JWT** for authentication

### Backend
- **Java 17**
- **Spring Boot** framework
- **JWT Authentication** with Bearer tokens
- **MySQL** database

### Development Environment
- **XAMPP** for MySQL database management

## 📋 Features

### Authentication
- User registration and login
- JWT token-based authentication
- Bearer token authorization
- Secure password handling

### Book Management
- Add new books to the library
- View all books
- Update book information
- Delete books
- Update book status (Available, Checked Out, Unavailable, Borrow)

### Rental Management
- Create new book rentals
- Update rental information
- View all rentals
- Track rental and return dates

### User Management
- View all registered users
- User authentication and authorization

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- Java 17
- XAMPP (for MySQL)
- Git

### Backend Setup (Spring Boot)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library-management-backend
   ```

2. **Start XAMPP**
   - Launch XAMPP Control Panel
   - Start Apache and MySQL services

3. **Database Configuration**
   - Create a new database named `library_db` in phpMyAdmin
   - Update `application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/library_db
   spring.datasource.username=root
   spring.datasource.password=
   spring.jpa.hibernate.ddl-auto=update
   ```

4. **Run the Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will be available at `http://localhost:8080`

### Frontend Setup (React + Vite)

1. **Navigate to frontend directory**
   ```bash
   cd library-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API base URL**
   - Update the base URL in your environment configuration
   - Set `{{baseURL}}` to `http://localhost:8080`

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register a new user | `{"username": "demologin", "email": "demo@example.com", "password": "demo123"}` |
| POST | `/api/auth/login` | User login | `{"username": "supun123", "password": "mypassword123"}` |
| GET | `/api/auth/all` | Get all users | - |

### Book Management Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/books/add` | Add a new book | `{"title": "Atomic Habits", "author": "James Clear", "genre": "Self-Help", "status": "Checked Out"}` |
| GET | `/api/books/all` | Get all books | - |
| PUT | `/api/books/{id}` | Update book details | `{"title": "Test Update", "author": "Alex", "genre": "Test Genre", "status": "Unavailable"}` |
| DELETE | `/api/books/{id}` | Delete a book | - |
| PUT | `/api/books/{id}/status` | Update book status | `{"status": "Borrow"}` |

### Rental Management Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/rentals/add` | Create a new rental | `{"bookId": 101, "username": "supun", "rentalDate": "2025-08-18", "returnDate": "2025-08-25"}` |
| PUT | `/api/rentals/update/{id}` | Update rental information | - |
| GET | `/api/rentals/all` | Get all rentals | - |

## 🔐 Authentication

The application uses JWT (JSON Web Token) for authentication:

1. **Registration/Login**: Users receive a JWT token upon successful authentication
2. **Bearer Token**: Include the token in the Authorization header for protected routes
   ```
   Authorization: Bearer <your-jwt-token>
   ```
3. **JWT Filter**: Backend validates tokens on protected endpoints

## 📊 Book Status Types

- **Available**: Book is available for borrowing
- **Checked Out**: Book is currently borrowed
- **Unavailable**: Book is not available (maintenance, lost, etc.)
- **Borrow**: Book is in the process of being borrowed

## 🏗️ Project Structure

```
library-management-system/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   ├── src/main/resources/
│   └── pom.xml
├── frontend/               # React + Vite application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🔧 Additional Features

### Security Features
- **JWT Authentication**: Secure token-based authentication
- **Bearer Token Authorization**: Stateless authentication mechanism
- **Password Encryption**: Secure password storage
- **JWT Filter**: Automatic token validation for protected routes

### Database Features
- **MySQL Integration**: Reliable relational database
- **JPA/Hibernate**: Object-relational mapping
- **Auto DDL**: Automatic table creation and updates

### Frontend Features
- **Material-UI**: Professional and responsive UI components
- **TypeScript**: Type-safe development
- **Vite**: Fast development and build tool
- **Responsive Design**: Mobile-friendly interface

## 🚀 Usage

1. **Register a new account** or login with existing credentials
2. **Add books** to the library inventory
3. **Manage rentals** by creating and tracking book loans
4. **Update book status** as needed
5. **View reports** of all books and rentals

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Note**: Make sure to replace `{{baseURL}}` with `http://localhost:8080` in your actual implementation and update any placeholder values with your specific configuration.
