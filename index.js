const express = require("express");
const cors = require("cors");
const books = require("./moduleBook");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/catalogue', (req, res) => {
    res.status(207).json(books.livres);
})

app.get('/livre/:id', (req, res) => {
    const id = req.params.id;
    const livre = books.GetLivre(id);

    if(livre === -1)
        res.sendStatus(404);
    else 
        res.status(207).json(livre);
})


app.post('/livre', (req, res) => {
    const livre = req.body;
    books.AddLivre(livre);
    res.end();
})

app.put('/livre', (req, res) => {
    const livre = req.body;
    if(books.update(livre) === 1)
        res.sendStatus(202);
    else
        res.sendStatus(404);

})

app.delete('/livre/:id', (req, res) => {
    const id = req.params.id;
    if(books.delete(id)===0)
        res.sendStatus(404);
    else 
        res.sendStatus(210);
})

app.listen(3000, () => {
  console.log("Serveur lance au port 3000");
});
