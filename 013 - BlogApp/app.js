// Carregando módulos
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const admin = require("./routes/admin");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");

// Configurações
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessão
app.use(
  session({
    secret: "cursodenode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// Handlebars
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

// Mongoose
mongoose.Promise = global.Promisse;
mongoose
  .connect("mongodb://localhost/blogapp")
  .then(() => {
    console.log("Conectado ao mongo");
  })
  .catch((err) => {
    console.log("Erro ao se conectar " + err);
  });

// Public
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("Oi eu sou um middleware!");
  next();
});

// Rotas
app.use("/admin", admin);
// Outros
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor Rodando na porta ${PORT}`));
