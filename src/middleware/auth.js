const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: "Nessun token, autorizzazione negata" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ msg: "Accesso negato: non sei un amministratore" });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: "Il token non è valido" });
  }
};

module.exports = auth;
