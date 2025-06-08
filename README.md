# 🛍️ Price Calculation API

An API endpoint that receives a shopping cart with items and campaigns, then calculates the final price after applying discounts.

---

## 📦 Requirements

* Node.js (v14 or higher recommended)
* npm or yarn

---

## 🚀 Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Finn-Fastest/itemCartDiscountCal.git
   cd itemCartDiscountCal
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the server:**

   ```bash
   node index.js
   # or with nodemon if available
   npx nodemon index.js
   ```

4. The server will run on `http://localhost:3000`.

---

## 🧪 Test the Endpoint

### ✅ Using cURL

```bash
curl --location 'http://localhost:3000/calculate-price' \
--header 'Content-Type: application/json' \
--data '{
    "cartItems": [
        {
            "name": "T-Shirt",
            "category": "Clothing",
            "price": 100,
            "amount": 1
        },
        {
            "name": "Hat",
            "category": "Accessories",
            "price": 250,
            "amount": 1
        },
        {
            "name": "Watch",
            "category": "Electronics",
            "price": 850,
            "amount": 1
        }
    ],
    "campaigns": [
        {
            "type": "coupon",
            "subtype": "percent",
            "amount": 20
        },
        {
            "type": "ontop",
            "subtype": "category",
            "category": "Clothing",
            "percent": 15
        },
        {
            "type": "seasonal",
            "threshold": 20,
            "discountPerThreshold": 10
        }
    ],
    "customerPoints": 1
}'
```

### ✅ Using Postman

1. Open Postman.
2. Set the request method to **POST**.
3. URL: `http://localhost:3000/calculate-price`
5. import file json collection


---

## 📂 Project Structure (Minimal Example)

```
price-calculation-api/
│
├── index.js                 # Express server with /calculate-price route
├── validators/
│   └── cartValidation.js    # Joi schema for request validation
├── collection
│   └── discount_service.js  # controller on first layer
├── service
│   └── cart.js              # service contain business logic or handler event
├── middleware               # contain middlewares
├── README.md
├── package.json
```

---

Let me know if you want to include response examples or test cases in the README too.
