# VS Fashion - Complete B2C E-commerce Platform

A modern, luxury fashion e-commerce website with customer-facing storefront and comprehensive admin panel.

## 🌟 Features

### Customer Frontend
- **Home Page** with hero carousel banners
- **Product Browsing** by categories (New Arrivals, Best Sellers, Collections)
- **Product Details** with image gallery, size selection, quantity picker
- **Shopping Cart** with add/remove functionality
- **Checkout** with order placement (Cash on Delivery)
- **User Authentication** (Register/Login)
- **Customer Dashboard** with profile management and order history
- **Content Pages** (About Us, Terms & Conditions, FAQ)

### Admin Panel
- **Dashboard** with statistics overview
- **Customer Management** - View all registered customers
- **Collection Management** - Create/Edit/Delete product collections
- **Product Management** - Full CRUD with image uploads (up to 4 images per product)
- **Inventory Management** - Track stock levels with low-stock alerts
- **Order Management** - View orders, update order status
- **Content Management** - Edit Terms & Conditions and FAQ

## 🚀 Technology Stack

**Backend:**
- FastAPI (Python)
- MongoDB with Motor (async driver)
- JWT Authentication
- BCrypt password hashing
- SMTP email integration

**Frontend:**
- React 19
- React Router v7
- Zustand (state management)
- Tailwind CSS
- Shadcn UI components
- Framer Motion (animations)
- Axios

## 🎨 Design System

- **Typography:** Playfair Display (headings) + Lato (body)
- **Colors:** 
  - Primary: #1A1A1A (Black)
  - Secondary: #D4AF37 (Gold)
  - Background: #FAFAFA (Off-white)
- **Style:** Modern Luxury - clean, elegant, sophisticated

## 📝 Default Admin Credentials

**Email:** vsfashiiiion@gmail.com  
**Password:** vs@54321

⚠️ **Important:** Change these credentials after first login for security.

## 📧 Email Configuration

To enable order email notifications, configure SMTP settings in `/app/backend/.env`:

```env
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password (not your regular password)

Order emails will be sent to: **vsfashiiiion@gmail.com**

## 🎯 How to Use

### As Admin:
1. Go to `/admin/login`
2. Login with default credentials
3. **Create Collections** (e.g., Sarees, Kurtis, Dresses)
4. **Add Products** with images, sizes, prices
5. **Manage Orders** as they come in
6. **Update Content** (Terms & FAQ)

### As Customer:
1. Browse products on homepage
2. Click on products to view details
3. **Register** or **Login**
4. Add products to cart
5. **Checkout** and place order
6. View orders in dashboard

## 📦 Database Collections

- `users` - Customer accounts
- `admins` - Admin accounts
- `collections` - Product collections
- `products` - Product catalog
- `carts` - Shopping carts
- `orders` - Customer orders
- `banners` - Hero carousel banners
- `content_pages` - Terms & FAQ content

## 🎁 Initial Data

The application comes with seeded data:
- 3 Hero banners
- 2 Sample collections (Sarees, Kurtis)
- Default admin account

---

**Built with ❤️ by Emergent AI**
