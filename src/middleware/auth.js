const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no válido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (req.user.rol !== "admin") {
      return res
        .status(403)
        .json({ msg: "Acceso denegado: no eres administrador" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token no es válido" });
  }
};

module.exports = auth;
