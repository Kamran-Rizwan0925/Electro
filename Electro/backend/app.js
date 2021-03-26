const express = require('express')
const path = require('path');
require('dotenv').config()

const app = express()
var morgan = require('morgan')
const port = 3000
const cors = require('cors');


app.use(cors({
  origin: '*',
  methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  allowedHeaders: "Content-Type, Authorization, Origin, X-Requested-With, Accept"
}))
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

// app.use(express.static(path.join(__dirname, "public")))

const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
// const usersRoute = require('./routes/users');

app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);

// app.use('/api/users', usersRoute);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})