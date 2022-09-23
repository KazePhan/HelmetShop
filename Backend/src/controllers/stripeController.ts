import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import UIDGenerator from 'uid-generator';
import sanitizedConfig from '../config';

const key: string | undefined = sanitizedConfig.STRIPE_SECRET_KEY || '';

const stripe = require(key);

const uidgen = new UIDGenerator();

// @desc    payment with stripe
// @route   Post /api/orders/stripe
// @access  Private

export const stripePay = asyncHandler(async (req, res) => {
  const { token, amount } = req.body;
  const idempotencyKey = await uidgen.generate();
  return stripe.customers
    .create({
      email: token?.email,
      source: token,
    })
    .then((customer: { id: any; }) => {
      stripe.charges.create(
        {
          amount: amount * 100,
          currency: 'vnd',
          customer: customer.id,
          receipt_email: token?.email,
        },
        { idempotencyKey }
      );
    })
    .then((result: any) => {
      res.status(200).json(result);
    });
});
