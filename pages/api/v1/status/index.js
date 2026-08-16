function status(req, res) {
  res.status(200).json({ chave: "Status postado" });
}

export default status;
