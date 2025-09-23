const userModel = require('../model/userModel');

exports.register = (req, res) => {
  const { username, password, favorecidos } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }
  if (userModel.findUser(username)) {
    return res.status(409).json({ message: 'Usuário já existe.' });
  }
  userModel.addUser({ username, password, favorecidos: favorecidos || [], saldo: 10000 });
  res.status(201).json({ message: 'Usuário registrado com sucesso.' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }
  const user = userModel.findUser(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos.' });
  }
  res.status(200).json({ message: 'Login realizado com sucesso.' });
};

exports.getAll = (req, res) => {
  const users = userModel.getAllUsers().map(u => ({ username: u.username, favorecidos: u.favorecidos, saldo: u.saldo }));
  res.status(200).json(users);
};
