CREATE TABLE usuarios(
  nome varchar(50), 
  email varchar (100),
  idade int 
);

INSERT INTO usuarios(nome, email, idade) VALUES(
  "Leonardo Baestero",
  "leonardo@email.com",
  26
);

INSERT INTO usuarios(nome, email, idade) VALUES(
  "Joao Pedro",
  "Joao@email.com",
  35
);

INSERT INTO usuarios(nome, email, idade) VALUES(
  "Luis Silva",
  "luis@email.com",
  28
);

INSERT INTO usuarios(nome, email, idade) VALUES(
  "Ana Julia",
  "ana@email.com",
  26
);

INSERT INTO usuarios(nome, email, idade) VALUES(
  "Maria Clara",
  "maria@email.com",
  8
);

SELECT * FROM usuarios = listar todos os dados da tabela (usando asterisco)

SELECT * FROM usuarios WHERE idade = 8; = WHERE é a condição de idade ser = 8 pra listar os específicos

SELECT * FROM usuarios WHERE nome = 'Leonardo Baestero'; = WHERE POR NOME;

SELECT * FROM usuarios WHERE idade >= 18  = usuários maior ou igual a 18 

DELETE FROM usuarios WHERE nome = 'Leonardo Baestero';

UPDATE usuarios SET nome = "FLAVIO PRADO" WHERE nome = "Luis Silva";



