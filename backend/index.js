const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let livros = [];

app.get('/api/livros', (req, res) => res.json(livros));

app.post('/api/livros', (req, res) => {
  const novo = req.body;
  novo.id = Date.now();
  livros.push(novo);
  res.status(201).json(novo);
});

app.put('/api/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const i = livros.findIndex(l => l.id === id);
  if (i !== -1) {
    livros[i] = { ...livros[i], ...req.body };
    res.json(livros[i]);
  } else {
    res.status(404).send();
  }
});

app.delete('/api/livros/:id', (req, res) => {
  const id = parseInt(req.params.id);
  livros = livros.filter(l => l.id !== id);
  res.status(204).send();
});

app.listen(3001, () => console.log('Backend rodando na porta 3001'));