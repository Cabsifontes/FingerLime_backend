const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Il nome è obbligatorio"],
  },
  email: {
    type: String,
    required: [true, "L'email è obbligatoria"],
    unique: true, 
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Inserisci un email valida",
    ],
  },
  password: {
    type: String,
    required: [true, "La password è obbligatoria"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user", 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
