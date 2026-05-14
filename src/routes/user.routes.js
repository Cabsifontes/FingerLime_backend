const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).send("Errore del server");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).send("Errore nell'aggiornamento");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Utente eliminato" });
  } catch (err) {
    res.status(500).send("Errore nell'eliminazione");
  }
});

router.get("/:userId/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("favoritos");
    res.json(user.favoritos || []);
  } catch (err) {
    res.status(500).send("Errore en el servidor");
  }
});

router.post("/:userId/favorites", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { favoritos: req.body.productId } },
      { new: true },
    );
    res.json(user.favoritos);
  } catch (err) {
    res.status(500).send("Errore aggiungendo preferito");
  }
});

router.delete("/:userId/favorites/:productId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { favoritos: req.params.productId } },
      { new: true },
    );
    res.json(user.favoritos);
  } catch (err) {
    res.status(500).send("Errore eliminando preferito");
  }
});

module.exports = router;
