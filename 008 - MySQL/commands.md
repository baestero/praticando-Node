Comando O que faz
\c Cancela o comando atual (quando esqueceu o ; e ficou no ->)
\q Sai do MySQL (equivalente a exit ou quit)
\G Mostra o resultado da última query em formato vertical (útil pra tabelas com muitas colunas)
\P nome_arquivo Define um arquivo para redirecionar a saída dos resultados (tee)
\. caminho_arquivo.sql Executa um script SQL salvo em arquivo
\T nome_arquivo Grava resultados em um arquivo de saída
\h ou help Mostra a ajuda interativa dentro do MySQL
\! comando Executa um comando do sistema sem sair do MySQL (ex: \! cls no Windows limpa a tela)

Entrar no mysql
mysql -h localhost -u root -p
mysql -u root -p


SHOW DATABASES; = Mostrar Banco de Dados

CREATE DATABASE nome do banco; = criar base de dados e nome do banco

USE nome do banco; = acessar banco de dados específico

SHOW TABLES; = mostrar todas as tabelas

+--------------------+
| Database |
+--------------------+
+--------------------+
| information_schema |
| mysql |
| performance_schema |
| sistemadecadastro |
| sys |
+--------------------+

CREATE TABLE nome da tabela; = criar tabela

CREATE TABLE usuarios(
nome varchar(50),
email varchar (100),
idade int (50)
);

DESCRIBE nome da tabela = para verificar a tabela

+-------+--------------+------+-----+---------+-------+
| Field | Type | Null | Key | Default | Extra |
+-------+--------------+------+-----+---------+-------+
| nome | varchar(50) | YES | | NULL | |
| email | varchar(100) | YES | | NULL | |
| idade | int | YES | | NULL | |
+-------+--------------+------+-----+---------+-------+

Inserindo dados na tabela na mesma ordem que informadas.

INSERT INTO usuarios(nome, email, idade) VALUES(
"Leonardo Baestero",
"leonardo@email.com",
26
);

SELECT \* FROM nome da tabela = listar todos os dados da tabela (usando asterisco)

SELECT \* FROM nome da tabela WHERE idade = 8; = WHERE é a condição de idade ser = 8 pra listar os específicos

SELECT \* FROM nome da tabela WHERE nome = 'Leonardo Baestero'; = WHERE POR NOME;

SELECT \* FROM nome da tabela WHERE idade > 18 = usuários maiores de 18

DELETE FROM nome da tabela nome da tabela = toda tabela será excluida.

DELETE FROM nome da tabela WHERE nome = 'Leonardo Baestero'; = Deletar usuario específico por nome

UPDATE nome_da_tabela  SET qual_dado_quer_atualizar = "Nome de teste"; = Se usado sem where todos os dados do banco serão atualizados.

NÃO USAR UPDATE OU DELETE SEM WHERE

UPDATE nome_da_tabela  SET qual_dado_quer_atualizar = "Nome de teste" WHERE nome = 'Leonardo Baestero'; = vai atualizar a coluna nome, na tabela usuarios no registro Leonardo Baestero para Nome de teste.