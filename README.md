# 👕 The Four DressOut — Clothes E-Commerce REST API

A production-style **Clothes E-Commerce REST API** built with **ASP.NET Core 8**, featuring multi-role authentication, product management, cart system, and complete order lifecycle management.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core 8 Web API |
| ORM | Entity Framework Core |
| Database | SQL Server |
| Authentication | JWT Bearer Tokens |
| Password Hashing | BCrypt.Net |
| API Docs | Swagger / OpenAPI |
| Validation | Data Annotations |

---

## ✨ Features

- 🔐 **Multi-role JWT Authentication** — Admin, Seller, Customer
- 👕 **Product Management** — CRUD with filters (category, size, color, price range, search)
- 🗂️ **Category Management** — Admin-controlled categories
- 🛒 **Cart System** — Add, update, remove, clear cart items
- 📦 **Order Management** — Place orders, track status, cancel orders
- 🔒 **Role-based Authorization** — Each role has strict access control
- 💰 **Price Snapshot** — Locks product price at time of purchase

---

## 👥 Role Permissions

| Feature | Admin | Seller | Customer |
|---|---|---|---|
| Manage Categories | ✅ | ❌ | ❌ |
| Add / Edit Products | ❌ | ✅ (own only) | ❌ |
| Browse Products | ✅ | ✅ | ✅ |
| Cart Management | ❌ | ❌ | ✅ |
| Place Orders | ❌ | ❌ | ✅ |
| Update Order Status | ❌ | ✅ | ❌ |
| View All Orders | ✅ | ❌ | ❌ |
| Cancel Orders | ❌ | ❌ | ✅ (Pending only) |

---

## 📁 Project Structure

```
The_Four_DressOut_Web/
├── Controllers/
│   ├── AuthController.cs        # Register & Login
│   ├── CategoryController.cs    # Category CRUD
│   ├── ProductController.cs     # Product CRUD + Filters
│   ├── CartController.cs        # Cart management
│   └── OrderController.cs       # Order lifecycle
├── Context/
│   └── AppDbContext.cs          # EF Core DbContext
├── DTO/
│   ├── LoginDTO.cs              # Auth DTOs
│   ├── ProductDTO.cs            # Product DTO
│   ├── CartItemDTO.cs           # Cart DTO
│   └── OrderDTO.cs              # Order status DTO
├── Model/
│   ├── User.cs                  # User entity
│   ├── Product.cs               # Product entity
│   ├── Category.cs              # Category entity
│   ├── CartItem.cs              # Cart entity
│   ├── Order.cs                 # Order entity
│   └── OrderItem.cs             # Order line items entity
├── Migrations/                  # EF Core migrations
├── appsettings.json             # Configuration
└── Program.cs                   # App entry point
```

---

## ⚙️ Setup & Installation

### Prerequisites
- .NET 8 SDK
- SQL Server
- Visual Studio 2022 or VS Code

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/the-four-dressout-web.git
cd the-four-dressout-web
```

**2. Update `appsettings.json`**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=The_Four_DressOut_Web;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "Key": "YourSecretKeyHere",
    "Issuer": "TheFourDressOut",
    "Audience": "TheFourDressOutUsers",
    "ExpiryInDays": 7
  }
}
```

**3. Run migrations**
```bash
Update-Database
```

**4. Run the project**
```bash
dotnet run
```

**5. Open Swagger**
```
https://localhost:7256/swagger
```

---

## 📬 API Endpoints

### 🔐 Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login & get JWT token |

### 🗂️ Category
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/category` | Public | Get all categories |
| GET | `/api/category/{id}` | Public | Get category by ID |
| POST | `/api/category` | Admin | Create category |
| PUT | `/api/category/{id}` | Admin | Update category |
| DELETE | `/api/category/{id}` | Admin | Delete category |

### 👕 Product
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/product` | Public | Get all products (with filters) |
| GET | `/api/product/{id}` | Public | Get product by ID |
| POST | `/api/product` | Seller | Add new product |
| PUT | `/api/product/{id}` | Seller | Update own product |
| DELETE | `/api/product/{id}` | Admin/Seller | Delete product |

**Query Filters:**
```
/api/product?category=Men&size=L&color=Blue&minPrice=500&maxPrice=2000&search=jacket
```

### 🛒 Cart
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/cart` | Customer | View cart |
| POST | `/api/cart` | Customer | Add item to cart |
| PUT | `/api/cart/{id}` | Customer | Update item quantity |
| DELETE | `/api/cart/{id}` | Customer | Remove item |
| DELETE | `/api/cart` | Customer | Clear entire cart |

### 📦 Order
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/order` | Customer | Place order from cart |
| GET | `/api/order` | Customer | View my orders |
| GET | `/api/order/all` | Admin | View all orders |
| PUT | `/api/order/{id}/status` | Seller/Admin | Update order status |
| DELETE | `/api/order/{id}` | Customer | Cancel pending order |

---

## 🔄 Order Status Flow

```
Pending → Confirmed → Shipped → Delivered
                                    
Any Status → Cancelled (Customer can cancel only Pending orders)
```

---

## 🧪 Testing with Postman

**1. Register as Admin:**
```json
POST /api/auth/register
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@test.com",
  "password": "Admin@1234",
  "confirmPassword": "Admin@1234",
  "role": "Admin"
}
```

**2. Login to get token:**
```json
POST /api/auth/login
{
  "email": "admin@test.com",
  "password": "Admin@1234"
}
```

**3. Use token in Authorization header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

---

## 🔒 Security Features

- Passwords hashed using **BCrypt** before storing
- JWT tokens expire after **7 days**
- Role-based route protection using `[Authorize(Roles = "...")]`
- Sellers can only modify **their own products**
- Customers can only access **their own cart and orders**

---

## 👨‍💻 Developer

**Sameer Aminnaik**  
Full Stack .NET Developer  
[GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourusername)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
