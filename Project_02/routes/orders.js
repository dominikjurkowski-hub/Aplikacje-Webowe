const express = require('express');
const Order = require('../models/order');
const Book = require('../models/book');
const User = require('../models/user');

const router = express.Router();


router.get('/:userId', async (req, res) => {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    });
    res.json(orders);
});


router.post('/', async (req, res) => {
  const { bookId, quantity, userId } = req.body;
  
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.send('BookId not found');
        }

        const userExists = await User.findByPk(userId);
        if (!userExists) {
            return res.send('UserId not found');
        }


        const newOrder = await Order.create({
            bookId,
            quantity,
            userId,
        });

        res.json({ id: newOrder.id }); 
});

router.delete('/:orderId', async (req, res) => {
    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      return res.send('OrderId not found');
    }

    await order.destroy();
    res.send('Order deleted');
});


router.patch('/:orderId', async (req, res) => {
  const { quantity } = req.body;

    const order = await Order.findByPk(req.params.orderId);
    if (!order) {
      return res.send('OrderId not found');
    }


    order.quantity = quantity;
    await order.save();
    
    res.json(order); 
  
});

module.exports = router;
