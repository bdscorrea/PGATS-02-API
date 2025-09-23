const userModel = require('../model/userModel');

exports.transfer = (req, res) => {
  const { remetente, destinatario, valor } = req.body;
  if (!remetente || !destinatario || typeof valor !== 'number') {
    return res.status(400).json({ message: 'Remetente, destinatário e valor são obrigatórios.' });
  }
  const userFrom = userModel.findUser(remetente);
  const userTo = userModel.findUser(destinatario);
  if (!userFrom || !userTo) {
    return res.status(404).json({ message: 'Usuário remetente ou destinatário não encontrado.' });
  }
  const isFavorecido = userFrom.favorecidos.includes(destinatario);
  if (!isFavorecido && valor >= 5000) {
    return res.status(403).json({ message: 'Transferências acima de R$ 5.000,00 só são permitidas para favorecidos.' });
  }
  if (userFrom.saldo < valor) {
    return res.status(400).json({ message: 'Saldo insuficiente.' });
  }
  userFrom.saldo -= valor;
  userTo.saldo += valor;
  res.status(200).json({ message: 'Transferência realizada com sucesso.' });
};
