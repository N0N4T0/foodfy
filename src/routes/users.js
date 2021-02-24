const express = require("express");
const routes = express.Router();

const SessionController = require("../app/controllers/sessionController");//ok
const UserController = require("../app/controllers/userController");//ok

const SessionValidator = require("../app/validators/session");//ok
const UserValidator = require("../app/validators/user");//ok

const { isLoggedRedirectToUsers, onlyUsers } = require("../app/middlewares/session");//ok

routes.get("/login", isLoggedRedirectToUsers, SessionController.loginForm);
routes.get("/forgot-password", SessionController.forgotPasswordForm);//ok
routes.get("/reset-password", SessionController.resetPasswordForm);//ok

routes.post("/login", SessionValidator.login, SessionController.login);
routes.post("/logout", SessionController.logout);
routes.post("/forgot-password", SessionValidator.forgot, SessionController.forgotPassword);
routes.post("/reset-password", SessionValidator.reset, SessionController.resetPassword);

routes.get("/create", onlyUsers, UserValidator.create, UserController.registerForm);
routes.get("/", onlyUsers, UserController.list);
routes.get("/:id/edit", onlyUsers, UserValidator.edit, UserValidator.show, UserController.edit);
routes.post("/create", onlyUsers, UserValidator.create, UserValidator.post, UserController.post);
routes.put("/", onlyUsers, UserValidator.put, UserValidator.update, UserController.put);
routes.delete("/", onlyUsers, UserValidator.deleteValidator, UserController.delete);

module.exports = routes;



























// const express = require('express')
// const routes = express.Router()

// const profileController = require("../app/controllers/profileController")
// const userController = require("../app/controllers/userController")
// const SessionController = require("../app/controllers/sessionController")


// const UserValidator = require("../app/validators/user")
// const SessionValidator = require("../app/validators/session")

// // // // Login/Logout
// // routes.get('/login', isLoggedRedirectToUsers, SessionController.loginForm)
// // routes.post('/login', SessionValidator.login, SessionController.login)
// // routes.post('/logout', SessionController.logout)//sair

// routes.get('/login', SessionController.loginForm)


// // // // reset password / forgot
// routes.get('/forgot-password', SessionController.forgotForm)
// routes.get('/password-reset', SessionController.resetForm)

// //testing
// // routes.post('/forgot-password', SessionValidator.forgot, SessionController.forgot)
// // routes.post('/password-reset', SessionValidator.reset, SessionController.reset)



// // Rotas de perfil de um usuário logado
// routes.get('/admin/profile', profileController.index) // Mostrar o formulário com dados do usuário logado
// // routes.put('/admin/profile', profileController.put)// Editar o usuário logado

// // // Rotas que o administrador irá acessar para gerenciar usuários
// routes.get('/admin/list', userController.list) //Mostrar a lista de usuários cadastrados
// routes.get('/admin/create', userController.create) //Exibe formulário para cadastrar novo usuário
// routes.post('/admin/users', userController.post) //Cadastrar um usuário
// // routes.put('/admin/users', userController.put) // Editar um usuário
// // routes.delete('/admin/users', userController.delete) // Deletar um usuário


// module.exports = routes