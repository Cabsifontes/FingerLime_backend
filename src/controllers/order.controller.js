const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, subtotal, shipping, total, paymentMethod } = req.body;

    const newOrder = await Order.create({
      user: userId,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
    });

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server" });
  }
};
