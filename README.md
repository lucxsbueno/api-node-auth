## API de autenticação (com JWT (Json Web Token))

### Necessário
 - [Node](https://nodejs.org/en/download/)
 - [MySQL](https://www.mysql.com/downloads/)
### Instalação
Primeiro, baixe as dependências do projeto:
```bash
npm install
```
Depois, na pasta <b>`database`</b> rode o arquivo <b>`.sql`</b>, ou se preferir, cole este código no seu <b>command line client</b>:
```sql
CREATE DATABASE auth;

USE auth;

CREATE TABLE user(
	id INT  PRIMARY KEY  AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	pass VARCHAR(255) NOT NULL);
```
### Ambiente de desenvolvimento
Crie um arquivo chamado <b>`.env`</b> na raíz do projeto, nele irá conter as variáveis de desenvolvimento que serão utilizadas em várias partes do código. Cole as variáveis e insira as informações necessárias para que seja possível a conexão com o banco:
```
#server
PORT=

#jwt secret key
SECRET_KEY=

#database
DB_PORT=
DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=auth
```

<b>⚠️ Crie uma senha forte para o seu jwt</b>

Para criar uma senha forte para o jwt, rode o seguinte comando no terminal:
```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```
Ele irá criar uma string com letras, números e símbolos, utilize em `SECRET_KEY=` do arquivo <b>`.env`</b>.

<b>Tudo pronto! agora é só rodar:</b>
```bash
npm run dev
```
<b>Enjoy!</b> 😊
