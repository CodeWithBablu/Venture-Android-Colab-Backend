import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import Stripe from 'stripe';

import db from './db/conn.js'

import order from './models/orderHistoryModel.js';

dotenv.config({ path: "./.env" });


const app = express();

// const URL = process.env.BASE_URL;
const PORT = process.env.PORT || 5002;

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_URL = 'http://localhost:';

app.listen(PORT, () => {
  console.log(`Server Running`);
  console.log(`Server Running on Port ${API_URL}${PORT}`);

})

const stripe = new Stripe(process.env.STRIPI_SECRET_KEY);

// Return payment Intent

app.post('/payment-sheet', async (req, res) => {

  const TotalAmount = req.body.totalAmount;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: TotalAmount * 100,
    currency: 'inr',
    // automatic_payment_methods: {
    //   enabled: true,
    // },
    payment_method_types: ['card'],
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    publishableKey: 'pk_test_51MIoHBSCINSp2FCQvOTV2e6sTvhi4gdRcoHVrXbHVCuMnNcnuNptxSnJ9khQmvjs0hMK2Ag9KWXnzzWN2ZUZxnq90029R8GkL3'
  });

});


//create new record
app.post('/add-order', (req, res) => {

  const orderData = req.body;


  let newOrder = new order({
    name: orderData.name,
    phone: orderData.phone,
    email: orderData.email,
    address: orderData.address,
    items: orderData.items
  });

  newOrder.save().then(() => {
    res.send("Order Added")
  }).catch((error) => {
    res.send(error.message);
  });

})


//// Get all Data
//get all records
app.get('/', (req, res) => {

  order.find({})
    .then((response) => {
      if (response) res.send(response);
    })
    .catch((err) => {
      res.send(err);
    })

})


// //// Get Success data
// app.get('/order/:id', async (req, res) => {

//   const order = await stripe.checkout.sessions.retrieve(
//     req.params.id,
//     {
//       expand: ["line_items"],
//     }
//   );

//   res.status(200).json(order);

// }
// );

// //// POST getUserOrders
// app.post('/userorders', async (req, res) => {
//   const user = req.body;

//   const stripeCusId = user['http://127.0.0.1:5173/stripe_customer_id'];

//   const paymentIntents = await stripe.paymentIntents.list({
//     customer: stripeCusId,
//   });

//   res.status(200).json(paymentIntents.data);

// }
// );


