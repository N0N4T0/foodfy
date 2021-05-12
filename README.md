<h1 align="center">
   Foodfy
</h1>

<h4 align="center"> 
	LaunchBase Bootcamp 🚀
</h4>

---

## Sobre o projeto 

Foodfy é um site de exibição de receitas e chefs. No site principal são listadas as receitas permitindo buscar também. Na parte administrativa permite-se cadastrar, editar, visualizar e deletar receitas, usuários e chefs.

---

## Tecnologias 

- **NodeJS**
- **Express**
- **Express Session**
- **Method Override**
- **Multer**
- **Bcrypt**
- **Nodemailer**
- **Nunjucks**
- **Faker**

---

## Funcionalidades

- [x] Controle de sessão (login e logout)
- [x] Cadastro de usuários
- [x] Edição de usuários
- [x] Remoção de usuários
- [x] Listagem de usuários
- [x] Recuperação de senha
- [x] Cadastro de chefs
- [x] Edição de chefs
- [x] Remoção de chefs
- [x] Listagem de chefs
- [x] Cadastro de receitas
- [x] Edição de receitas
- [x] Remoção de receitas
- [x] Listagem de receitas
- [x] Pesquisa de receitas

---

## Como executar o projeto
<p>Após download do projeto</p>


```bash

# Acesse a pasta do projeto pelo terminal/cmd
$ cd foodfy

# Instale as dependências
$ npm install

```

### Configurar o banco de dados

```
Importar arquivo do projeto:

database.sql
```

Após isso executar os scripts no banco


#### Observações

```
Você deverá indicar suas informações de usuário e senha do postgres no arquivo:

db.js
```


#### Populando o banco de dados

Afim de gerar dados randômicos, executar a seguinte instrução no terminal:

```bash

$ node seeds.js

```

### Configurar o Mailtrap

O Mailtrap será responsável por simular uma caixa de e-mails permitindo receber o acesso quando clicaldo em recuperar senha por exemplo.

Entre no site do [Mailtrap](https://mailtrap.io/) para começar.

```javascript

const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "746d74c0a1e9b4",
    	pass: "e8ad98395a606a"
    }
});

```

É importante que o código preenchido no aquivo mailer.js seja o gerado em sua conta do Mailtrap, caso contrário você não receberá os e-mails corretamente.

```
Você precisará alterar esses campos no Mailtrap:
...
	user: "746d74c0a1e9b4",
	pass: "e8ad98395a606a"
...
```

### Executar o projeto.

Finalizando todos os passos descritos, executar o projeto do seguinte modo:


```bash

# Acesse a pasta do projeto pelo terminal/cmd
$ cd foodfy

# Execute a aplicação
$ npm start

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

#### Observações

Ao acessar *localhost:3000* você estará na seção pública do foodfy. Para ter acesso ao setor administrativo entre em *localhost:3000/admin*. O administrador padrão do sitema tem o email *admin@admin.com* e senha *admin*. Os outros usuários que são gerados automaticamente possuem e-mails aleatórios e senha *1234*.

---
