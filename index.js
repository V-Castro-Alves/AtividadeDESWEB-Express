const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let items = [
    {id: 1, name: "Engenharia de Software"},
    {id: 2, name: "Sistemas de Informação"},
];

app.get('/item', (req, res) => {
    res.status(200).json(items);
});

//Exercício 5
app.get('/item/count', (req, res) => {
    res.status(200).json({count: items.length});
});

//Exercício 2
app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    if (item) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

//Exercício 1
app.post('/item', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.length < 3) {
        return res.status(400).json({
            error: 'Erro',
            message: 'Nome muito pequeno (<3 caracteres)'
        });
    }
    const newItem = {id: items.length + 1, name};
    items.push(newItem);
    res.status(201).json(newItem);
});

//Exercício 3
app.patch('/item/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) {
        return res.status(404).json({message: 'Item não encontrado'});
    }
    const { name } = req.body;
    if (name) {
        item.name = name;
        res.status(200).json(item);
    } else {
        return res.status(400).json({message: 'Nome não pode ser vazio'});
    }
});

//Exercício 4
app.delete('/item', (req, res) => {
    items = [];
    res.status(200).json({message: 'Todos os items removidos'});
});

app.listen(port, () => {
    console.log(`Server rodando em http://localhost:${port}`);
});