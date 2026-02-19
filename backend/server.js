const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando 🚀');
});

app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'demo@email.com' && password === '123456') {
    return res.json({ token: 'fake-jwt-token' });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
