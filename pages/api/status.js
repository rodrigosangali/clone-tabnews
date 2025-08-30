function status(request, response) {
  response
    .status(200)
    .json({ mensagem: "numa relacao nao discuta com mulher" });
}

export default status;
