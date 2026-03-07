# Poshak Ecommerce

A full-stack ecommerce application built with React, Node.js/Express, and MongoDB. This project provides a complete online shopping experience with user authentication, product management, cart functionality, and order processing.

## 🌐 Live Demo
Visit the live application: [https://poshak-ecommerce-mauve.vercel.app](https://poshak-ecommerce-mauve.vercel.app)

## 📋 Project Structure

```
Poshak_Ecommerce/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable React components (Navbar, Footer, etc.)
│   │   ├── pages/        # Page components (Home, Collection, Product, Cart, Orders, etc.)
│   │   ├── context/      # React Context for state management
│   │   ├── assets/       # Images, icons, and other static assets
│   │   ├── App.jsx       # Main App component with routing
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── public/           # Static files
│   ├── package.json      # Frontend dependencies
│   ├── vite.config.js    # Vite configuration
│   ├── vercel.json       # Vercel deployment config
│   └── README.md         # Frontend-specific documentation
├── backend/              # Node.js/Express backend API
├── admin/                # Admin dashboard
└── .vscode/              # VSCode settings

```

## 🎯 Features

### User Features
- **User Authentication**: Register, login, and email verification
- **Product Browsing**: Browse through product collections
- **Product Details**: View detailed product information
- **Shopping Cart**: Add/remove items, manage quantities
- **Order Placement**: Place orders and track them
- **Order History**: View previous orders
- **User Account**: Manage user profile and preferences

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View and manage customer orders
- **User Management**: Monitor and manage users
- **Dashboard**: Administrative dashboard for insights

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.0) - UI library
- **React Router DOM** (v7.13.0) - Client-side routing
- **Vite** (v7.2.4) - Build tool and dev server
- **Tailwind CSS** (v4.1.18) - Utility-first CSS framework
- **Axios** (v1.13.5) - HTTP client for API calls
- **React Toastify** (v11.0.5) - Toast notifications
- **ESLint** - Code quality tool

### Backend
- Node.js
- Express.js
- MongoDB
- (Additional backend details available in backend folder)

### Deployment
- **Frontend**: Vercel
- **Backend**: (Configured as per backend setup)

## 📦 Frontend Dependencies

```json
{
  "@tailwindcss/vite": "^4.1.18",
  "axios": "^1.13.5",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^7.13.0",
  "react-toastify": "^11.0.5",
  "tailwindcss": "^4.1.18"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB (for backend)

### Installation & Setup

#### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The frontend will be available at `http://localhost:5173` (Vite default)

#### Backend Setup
(Instructions to be added based on backend configuration)

```bash
cd backend
npm install
npm start
```

## 📄 Frontend Pages

The application includes the following pages:

| Page | Path | Purpose |
|------|------|---------|
| Home | `/` | Landing page with featured products |
| Collection | `/collection` | Browse all products |
| Product Details | `/product/:productId` | View product details |
| Cart | `/cart` | View shopping cart |
| About | `/about` | About the store |
| Contact | `/contact` | Contact information |
| Login | `/login` | User authentication |
| Verify | `/verify` | Email verification |
| Placed Orders | `/placedorders` | View placed orders |
| Orders | `/orders` | View order history |

## 🧩 Frontend Components

Key components include:
- **Navbar** - Navigation bar with links and user menu
- **Footer** - Footer with company information
- Additional components in `/src/components`

## 🎨 Styling

The project uses **Tailwind CSS** for styling with responsive design utilities:
- Mobile-first responsive design
- Padding scales: `px-4` (mobile), `sm:px-[5vw]`, `md:px-[7vw]`, `lg:px-[10vw]`
- Custom component styling available in `index.css`

## 🔄 State Management

The application uses **React Context API** for state management:
- Context files located in `/src/context`
- Centralized state for user, cart, products, and orders

## 🌐 API Integration

The frontend communicates with backend APIs using **Axios**:
- Base URL configured in axios instance
- Error handling with toast notifications
- Request/response interceptors for authentication

## 📱 Responsive Design

The application is fully responsive across:
- Mobile devices (small screens)
- Tablets (medium screens)
- Desktops (large screens)

## 🔐 Security Features

- User authentication and authorization
- Email verification for new accounts
- Protected routes for authenticated users
- Secure API calls with tokens

## 🚢 Deployment

### Frontend Deployment (Vercel)

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel
```

The production build is automatically deployed via Vercel configuration in `vercel.json`.

## 📚 Development Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint code quality checks
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change the port in vite.config.js or kill the process using the port
2. **Module not found**: Run `npm install` to ensure all dependencies are installed
3. **API connection errors**: Verify backend server is running and API URLs are correct
4. **CORS errors**: Ensure backend has proper CORS configuration

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**JatinDohale**
- GitHub: [@JatinDohale](https://github.com/JatinDohale)

## 📧 Support

For support, email support@poshak-ecommerce.com or open an issue on GitHub.

---

**Last Updated**: 2026-03-07 07:36:15
**Repository**: [https://github.com/JatinDohale/Poshak_Ecommerce](https://github.com/JatinDohale/Poshak_Ecommerce)