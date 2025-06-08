// discount-api-backend/index.js

const express = require('express');
const app = express();
const PORT = 3000;
const bodyValidate = require('./middleware/bodyMiddleware')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cartValidator = require('./validator/cart');

const calculateFinalPrice  = require('./controller/discount_service');
app.use(express.json());

// POST /calculate-price
// Request body:
// {
//   "cartItems": [
//     { "name": "T-Shirt", "category": "Clothing", "price": 350 },
//     { "name": "Hat", "category": "Accessories", "price": 250 }
//   ],
//   "campaigns": [
//     { "type": "coupon", "subtype": "fixed", "amount": 50 },
//     { "type": "ontop", "subtype": "category", "category": "Clothing", "percent": 15 },
//     { "type": "seasonal", "threshold": 300, "discountPerThreshold": 40 }
//   ],
//   "customerPoints": 60
// }

app.post( '/calculate-price', bodyValidate(cartValidator.priceCaculate) , calculateFinalPrice.priceCaculate );

app.use((req, res, next) => {
    res.status(404).send('Sorry, the page you requested could not be found.');
});

app.listen(PORT, () => {
  console.log(`Discount API running at http://localhost:${PORT}`);
});


