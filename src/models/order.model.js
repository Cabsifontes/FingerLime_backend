const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        nombre: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precio: { type: Number, required: true },
        imagen: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, required: true, default: 10 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["Stripe", "Bonifico", "Contrassegno"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pendiente", "Pagado", "Enviado", "Cancelado"],
      default: "Pendiente",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("Order", OrderSchema);
