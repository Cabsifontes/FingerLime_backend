const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "L'utente esiste già" });

    user = new User({ nombre, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ msg: "Utente registrato correctamente" });
  } catch (err) {
    res.status(500).send("Errore del server");
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar email
    const user = await User.findOne({ nombre: email });
    if (!user) return res.status(400).json({ msg: "Credenziali non valide" });

    // Verificar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Credenziali non valide" });

    const payload = { user: { id: user.id, role: user.role } };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { nombre: user.nombre, role: user.role } });
      },
    );
  } catch (err) {
    res.status(500).send("Errore del server");
  }
};
