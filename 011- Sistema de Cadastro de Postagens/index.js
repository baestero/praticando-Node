const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const Post = require("./models/Post");

// Config
//Template Engine
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas
app.get("/", (req, res) => {
  Post.findAll({ order: [["id", "DESC"]] }).then((posts) => {
    res.render("home", { posts: posts });
  });
});

app.get("/cad", (req, res) => {
  res.render("formulario");
});

app.post("/add", (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((erro) => {
      res.send("Ocorreu um erro " + erro);
    });
});

app.get("/deletar/:id", (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("Postagem deletada com sucesso!");
    })
    .catch((erro) => {
      console.log("Esta postagem não existe! ", +erro);
    });
});

app.listen(3000, () =>
  console.log("Servidor Rodando na url http://localhost:3000/")
);
