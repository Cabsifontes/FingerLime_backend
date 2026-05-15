const Cart = require("../models/cart.model");

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    let cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server" });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, cantidad } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, cantidad }],
      });
      return res.status(201).json(cart);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].cantidad = cantidad;
    } else {
      cart.items.push({ product: productId, cantidad });
    }

    await cart.save();
    const updatedCart = await cart.populate("items.product");
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Errore nel server" });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(200).json({ message: "Carrello svuotato con successo" });
  } catch (error) {
    res.status(500).json({ message: "Errore nel server" });
  }
};
